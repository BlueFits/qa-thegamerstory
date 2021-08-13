const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogContent = new Schema({
    type: { type: String, required: true, enum: ["image", "text", "video"] },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BlogContent", BlogContent);