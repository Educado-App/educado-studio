const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    name: { type: String },
    icon: { type: String },
    modifiedAt: { type: Date },
})

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel }
