const http = require('http')
const port = 3000
//it searchs for index.js file by default
const handlers = require('./handlers')

let envirenment = process.env.NODE_ENV || 'development'
const config = require('./config/config')
const database = require('./config/database.config')
database(config[envirenment])

http.createServer((req, res) => {
    for (let handler of handlers){
        if(!handler(req, res)){
            break
        }
    }
}).listen(port)
