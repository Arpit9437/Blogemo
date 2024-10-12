import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
},{timestamps:true});

export const Post = mongoose.model("Post", postSchema);