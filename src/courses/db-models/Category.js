const mongoose = require("mongoose");
const { Link } = require("../../helpers/fields");
const { Schema } = mongoose;

const categorySchema = new Schema({
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    name: { type: String },
    icon: { type: String, get: Link },
}, {
    toJSON: { getters: true, setters: true },
    toObject: { getters: true, setters: true }
})

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel }
