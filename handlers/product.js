const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const formidable = require('formidable')
const shortid = require('shortid')
const Product = require('../models/Product')
const Category = require('../models/Category')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if(req.pathname === '/product/add' && req.method === 'GET'){
        let filePath = path.normalize(path.join(__dirname, '../views/products/add.html'))
        fs.readFile(filePath, (err, data) => {
            if(err){
                console.log(err)
                res.writeHead(404, {
                    'Content-Type' : 'text/plain'
                })
    
                res.write('404 not found!')
                res.end()
                return
            }
       
            Category.find().then((categories) => {
                let replacement = '<select class="input-field" name="category">'
                for(let category of categories){
                    replacement += `$<option value="${category._id}">${category.name}</option>`
                }
                replacement += '</select>'

                let html = data.toString().replace('{categories}', replacement)

                res.writeHead(200, {
                    'Content-Type' : 'text/html'
                })
                res.write(html)
                res.end()
            })
        })   
    } else if(req.pathname === '/product/add' && req.method === 'POST'){       
        let form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
            if(err){
                console.log(err)
                return
            }
            let file = files.image
            let tempPath = file.path 
            let fileName = shortid.generate()

            fs.readFile(tempPath, (err, data) => {
                if(err){
                    console.log(err)
                    return
                }
                let newFilePath = './content/images/' + fileName
                fs.writeFile(newFilePath, data, {encoding: 'ascii'}, (err) => {
                    if(err){
                        console.log(err)
                        return
                    }

                    let product = {
                        name: fields.name,
                        description: fields.description,
                        price: fields.price,
                        image: '/content/images/' + fileName,
                        category: ObjectId(fields.category)
                    }
                    Product.create(product).then(insertedProduct => {
                        Category.findById(product.category).then(cat => {
                            cat.products.push(insertedProduct._id)
                            cat.save()
                            res.writeHead(302, {
                                Location: '/'
                        })
                        res.end()
                        })              
                    })   
                })               
            })           
        })                
    } else {
        return true
    }
}