const url = require('url')
const http = require('http')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const Category = require('../models/Category')

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
function categoryController(req, res){
    req.pathname = req.pathname || url.parse(req.parse).pathname

    if (req.pathname === '/category/add' && req.method === 'GET'){
        fs.readFile('./views/category/add.html', (err, data) => {
            if(err){
                console.log(err)
                return
            }
            res.write(data)
            res.end()
        })
    } else if (req.pathname === '/category/add' && req.method === 'POST'){
        let queryData = ''
        req.on('data', (data) => {
            queryData += data
        })

        req.on('end', () => {
            let category = qs.parse(queryData)
            Category.create(category).then(() => {
                res.writeHead(302, {
                    Location: '/'
            })
            res.end()
            })
        })
    } else {
        return true
    }
}

module.exports = categoryController