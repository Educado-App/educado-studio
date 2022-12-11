const mongoose = require("mongoose");

const { ImageField } = require("../../helpers/mongoose/fields/file");
const { Schema } = mongoose;

const categorySchema = new Schema({
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    name: { type: String },
    icon: ImageField(),
})

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel }
