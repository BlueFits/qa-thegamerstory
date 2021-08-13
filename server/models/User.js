const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, requried: true },
    email: { type: String, required: true },
    password: { type: String, required: true, trim: true },
    hub: [{ type: Schema.Types.ObjectId, ref: 'Hub' }],
    createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", function(next) {
    const user = this;
    if (!user.isModified || !user.isNew) {
        next();
    } else {
        console.log("user is new");
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                console.log("Error hashing pass for user: " + user.firstName);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model("User", UserSchema);