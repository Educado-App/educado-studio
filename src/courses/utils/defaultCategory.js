const { categoryList } = require("../gateways");

DEFAULT_CATEGORY_ID = "639208a0f467689fde25b5fa"
DEFAULT_CATEGORY = {
    id: DEFAULT_CATEGORY_ID,
    name: 'Other',
    icon: {
        path: `${DEFAULT_CATEGORY_ID}/depositphotos_361147706-stock-photo-image-of-a-otterlutrinae-isolated.jpg`,
        type: "image/png",
        size: 17524,
        filename: "depositphotos_361147706-stock-photo-image-of-a-otterlutrinae-isolated.jpg",
    },
    parent: null
}

module.exports = function defaultCategory() {

    // Try and add the default category to the database if not already created
    categoryList.add(defaultCategory)

    return DEFAULT_CATEGORY
}