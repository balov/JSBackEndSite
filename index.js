const http = require('http')
const port = 3000
//it searchs for index.js file by default
const handlers = require('./handlers')

http.createServer((req, res) => {
    for (let handler of handlers){
        if(!handler(req, res)){
            break
        }
    }
}).listen(port)
