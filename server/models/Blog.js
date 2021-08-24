const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({
    blogType: { type: String, required: true, enum: ["char", "blog"], default: "blog"},
    headerTitle: { type: String, default: "" },
    headerSub: { type: String, default: "" },
    headerImage: { type: String, default: "" },
    blogTitle: { type: String, default: "" },
    blogContent: [{ type: Schema.Types.ObjectId, ref: 'BlogContent' }],
    historyTitle: { type: String, required: false },
    thumbnailImage: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    isPrivate: { type: Boolean, default: true },
});

module.exports = mongoose.model("Blog", Blog);