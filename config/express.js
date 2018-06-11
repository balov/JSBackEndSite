const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')


module.exports = (app, config) => {
    //Configure middleware for parsing form data
    app.use(bodyParser.urlencoded({extended: true}))

    //Configure public folder
    app.use((req, res, next) => {
        if(req.url.startsWith('/content')){
            req.url = req.url.replace('/content', '')
        }
        next()
    }, express.static(
        path.normalize(
            path.join(config.rootPath, 'content')
        )
    ))

    app.engine('.hbs', handlebars({
        extname: '.hbs',
        layoutsDir: 'views/layouts',
        defaultLayout: 'main'
      }))

    app.set('view engine', '.hbs')

    app.set('view options', {layout: 'Layout'})
      
}