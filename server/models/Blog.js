const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({
    blogType: { type: String, required: true, enum: ["char", "blog"]},
    headerTitle: { type: String, required: true },
    headerSub: { type: String, required: true },
    headerImage: { type: String, required: false },
    blogTitle: { type: String, required: true },
    blogContent: [{ type: Schema.Types.ObjectId, ref: 'BlogContent' }],
    historyTitle: { type: String, required: false },
    thumbnailImage: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", Blog);