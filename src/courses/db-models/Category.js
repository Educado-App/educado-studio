const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String },
    icon: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    modifiedAt: { type: Date },
})

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel }
