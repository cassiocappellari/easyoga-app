const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    return res.redirect('teachers')
})

routes.get('/teachers', function(req, res) {
    return res.render('teachers/index')
})

routes.get('/members', function(req, res) {
    return res.send('members')
})

module.exports = routes