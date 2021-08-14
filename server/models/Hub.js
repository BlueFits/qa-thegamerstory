const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HubSchema = new Schema({
    history: [{ type: String, lowercase: true }],
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    image: { type: String, required: true},
    name: { type: String, required: true, lowercase: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hub", HubSchema);