import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    comments: [
        {
            comment: {
                type: String,
                required: true,
            },
            userId: {
                type: String,
                required: true,
            },
        }   
    ]

})  

mongoose.model("Post", postSchema);