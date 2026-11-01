const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendEmail } = require('../services/email.service')



async function userRegister(req, res) {
    const { name, email, password, role, phone, hospital } = req.body;

        const userAlreadyExists = await userModel.findOne({
            email: email,
        })
        if(userAlreadyExists){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            hospital
        })
        
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: createUser._id,
                name: createUser.name,
                email: createUser.email,
                role: createUser.role,
                hospital: createUser.hospital,
                phone: createUser.phone
            }
        })
}

async function loginUser(req,res){
    const { email, password, role, keepSignedIn } = req.body;

    const user = await userModel.findOne({
        email: email
    })
    if(!user){
        return res.status(400).json({
            message: "Unauthorized access"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Unauthorized access"
        })
    }

    // If the client specified a role, verify it matches the account
    if (role && user.role !== role) {
        return res.status(403).json({
            message: `This account is registered as a ${user.role}, not a ${role}. Please select the correct tab.`
        })
    }

    // keepSignedIn → 30-day persistent session; otherwise session cookie (1 day JWT)
    const tokenExpiry = keepSignedIn ? "30d" : "1d";
    const cookieMaxAge = keepSignedIn ? 30 * 24 * 60 * 60 * 1000 : undefined;

    const token  = jwt.sign({
        id: user._id,
        role: user.role,
    },process.env.JWT_SECRET,
    { expiresIn: tokenExpiry })

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        ...(cookieMaxAge ? { maxAge: cookieMaxAge } : {}),   // no maxAge = session cookie
    })
    
    res.status(200).json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            hospital: user.hospital
        }
    })
}

async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully"
    })
}

async function getProfile(req,res){
    res.status(200).json({
        user: req.user
    })
}

// ─── Forgot Password ───────────────────────────────────────────────────────
async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        console.log("[forgotPassword] Request received for email:", email);

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        // Always return the same message to prevent user enumeration
        const GENERIC_RESPONSE = {
            message: "If an account exists with this email, a password reset link has been sent."
        };

        const user = await userModel.findOne({ email });
        if (!user) {
            console.log("[forgotPassword] No user found for email:", email);
            return res.status(200).json(GENERIC_RESPONSE);
        }

        console.log("[forgotPassword] User found:", user.email, "| role:", user.role);

        // Generate a secure random plain token
        const plainToken = crypto.randomBytes(32).toString('hex');

        // Hash before storing — never store the plain token in MongoDB
        const hashedToken = crypto
            .createHash('sha256')
            .update(plainToken)
            .digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        await user.save();
        console.log("[forgotPassword] Token saved to DB. Sending email to:", user.email);

        // Email the ORIGINAL (unhashed) token as part of the reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${plainToken}`;
        console.log("[forgotPassword] Reset URL:", resetUrl);

        const html = `
            <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;">
                <h2 style="color:#1e3a5f;">TeleVital — Password Reset</h2>
                <p>You requested a password reset. Click the button below to set a new password.</p>
                <p style="margin:24px 0;">
                    <a href="${resetUrl}"
                       style="background:#1e3a5f;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
                        Reset Password
                    </a>
                </p>
                <p style="font-size:13px;color:#666;">This link expires in <strong>15 minutes</strong>.</p>
                <p style="font-size:13px;color:#666;">If you did not request this, you can safely ignore this email.</p>
                <hr style="margin-top:32px;border:none;border-top:1px solid #eee;"/>
                <p style="font-size:12px;color:#999;">TeleVital · Mission-critical healthcare</p>
            </div>
        `;

        await sendEmail({
            to: user.email,
            subject: "TeleVital — Password Reset Link",
            html,
        });

        console.log("[forgotPassword] Email sent successfully to:", user.email);
        return res.status(200).json(GENERIC_RESPONSE);
    } catch (err) {
        console.error("[forgotPassword] ERROR:", err.message);
        return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
}


// ─── Reset Password ────────────────────────────────────────────────────────
async function resetPassword(req, res) {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "Token and new password are required." });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters." });
        }

        // Hash the received plain token to compare against the stored hash
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await userModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: new Date() }, // must not be expired
        });

        if (!user) {
            return res.status(400).json({ message: "Reset link is invalid or has expired." });
        }

        // Hash new password using bcrypt — same as registration
        user.password = await bcrypt.hash(password, 10);

        // Invalidate the token immediately after use
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        return res.status(200).json({ message: "Password reset successful. You can now sign in." });
    } catch (err) {
        console.error("resetPassword error:", err.message);
        return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
}



module.exports = {
    userRegister,
    loginUser,
    logoutUser,
    getProfile,
    forgotPassword,
    resetPassword,
}