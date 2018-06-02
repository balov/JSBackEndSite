const fs = require('fs')
const path = require('path')
const url = require('url')

function getContentType (url){
    let index = url.indexOf('.')
    if (index > 0){
        let contentType = url.substr(index)
        switch (contentType) {
            case '.html' :
            return 'text/html'
            case '.css' :
            return 'text/css'
            case '.ico' :
            return 'image/x-icon'
            case '.js' :
            return 'application/javascript'
        }
    } else {
        return 'text/plain'
    }
}

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (req.pathname.startsWith('/content/') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`))
        fs.readFile(filePath, (err, data) => {
            if(err){
                console.log(err)
                res.writeHead(404, {
                    'Content-Type' : 'text/plain'
                })
    
                res.write('Resource not found!')
                res.end()
                return
            }
    
            res.writeHead(200, {
                'Content-Type' : getContentType(req.pathname)
            })
    
            res.write(data)
            res.end()
        }) 
    } else {
        return true
    }

}