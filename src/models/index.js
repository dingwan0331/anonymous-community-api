import mongoose from "mongoose";
import { postSchema } from "../apps/post/postModel.js";

const Post = new mongoose.model("Post", postSchema);

export { mongoose, Post };
