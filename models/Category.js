const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
    name : {type: mongoose.Schema.Types.String, required : true, unique: true},
    //One to many with Products
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category