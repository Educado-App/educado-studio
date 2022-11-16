const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    name: { type: String },
    icon: { type: String },
})

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel }
