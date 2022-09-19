const mongoose = require("mongoose");
const { postSchema } = require("../apps/post/postModel");

const Post = new mongoose.model("Post", postSchema);

module.exports = { mongoose, Post };
