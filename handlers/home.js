const path = require('path')
const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports.index = (req, res) => {      
            //Get products from Db and insert them in the view            
            let queryData = req.query
            Product.find().populate('category').then((products) => {
                if(queryData.query){
                    products = products.filter(p => p.name.toString().toLowerCase().includes(queryData.query.toString().toLocaleLowerCase()))
                }
                let data = {
                    products: products
                }

                if(queryData.error){
                    data.error = queryData.error
                }
                if(queryData.success){
                    data.success = queryData.success
                }
                res.render('home/index', data)           
            })                              
}
