const { globalSearch } = require("../services/search.service");

async function search(req, res) {

    try {
        const { q } = req.query;

        const searchResults = await globalSearch(q || "");

        return res.status(200).json({
            message: "Search completed successfully",
            ...searchResults
        });

    } catch (err) {
        console.error("Search Controller Error:", err);
        return res.status(500).json({
            message: "Failed to perform search"
        });
    }

}

module.exports = {
    search
};