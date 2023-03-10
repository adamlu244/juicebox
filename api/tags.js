const express = require("express");
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next();
});

const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.get("/", async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
    const { tagName } = req.params;

    try {
        const postByTag = await getPostsByTagName(tagName);

        const posts = postByTag.filter(post => {
            if (post.active) {
                return true;
            }

            if (req,user && post.author.id === req.user.id) {
                return true;
            }

            return false;
        })
        res.send({ posts });
    } catch ({ name, message }) {
        next({ name, message });
    }
})

module.exports = tagsRouter;