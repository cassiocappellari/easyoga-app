const {age, skill, date} = require('../../lib/useful')
const db = require('../../config/db')
const Teacher = require('../models/Teacher')
Intl = require('intl')

module.exports = {
    index(req, res){
        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {
                return res.render('teachers/index', {teachers, filter})
            }
        }

        Teacher.paginate(params)

        /*if(filter) {
            Teacher.findBy(filter, function(teachers){
                return res.render('teachers/index', {teachers, filter})
            })
        } else {
            Teacher.all(function(teachers){
                return res.render('teachers/index', {teachers})
            })
        }*/

    },
    create(req, res){
        return res.render('teachers/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Teacher.create(req.body, function(teacher) {

            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    show(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send('Teacher not found!')

            teacher.age = age(teacher.birth_date)
            teacher.services = teacher.services.split(',')
            teacher.created_at = date(teacher.created_at).format

            return res.render('teachers/show', {teacher})
        })
    },
    edit(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send('Teacher not found!')

            teacher.birth_date = date(teacher.birth_date).iso

            return res.render(`teachers/edit`, {teacher})
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res){
        Teacher.delete(req.body.id, function(){
            return res.redirect('/teachers')
        })
    }
}