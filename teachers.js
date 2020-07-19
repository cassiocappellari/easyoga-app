const fs = require('fs')
const data = require('./data.json')
const {age, skill, date} = require('./useful')
Intl = require('intl')

exports.index =  function(req, res) {

    return res.render('teachers/index', {teachers: data.teachers})
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for(let key of keys) {
        if(req.body[key] == '') {
            return res.send('Please, fill all the fields!')
        }
    }

    let {avatar_url, name, dateOfBirth, skills, gender, services} = req.body

    dateOfBirth = Date.parse(dateOfBirth)
    const createdAt = Date.now()
    const id = data.teachers.length + 1

    data.teachers.push({
        id,
        avatar_url,
        name,
        dateOfBirth,
        skills,
        gender,
        services,
        createdAt
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write file error!')
        
        return res.redirect('/teachers')
    })
}

exports.show = function(req, res) {

    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeacher) {
        return res.send('Teacher not found! :(')
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.dateOfBirth),
        skill: skill(foundTeacher.skills),
        services: foundTeacher.services.split(','),
        createdAt: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.createdAt),
    }

    return res.render('teachers/show', {teacher})
}

exports.edit = function(req, res) {
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id
    })

    if(!foundTeacher) {
        return res.send('Teacher not found! :(')
    }

    const teacher = {
        ...foundTeacher,
        dateOfBirth: date(foundTeacher.dateOfBirth),
        services: foundTeacher.services.split(',')
    }

    return res.render('teachers/edit', {teacher})
}

exports.put = function(req, res) {
    const {id} = req.body

    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) {
        return res.send('Teacher not found!')
    }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        dateOfBirth: Date.parse(req.body.dateOfBirth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) {
            return res.send('Error!')
        }

        return res.redirect(`/teachers/${id}`)
    })

}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) {
            return res.send('Error!')
        }
    })

    return res.redirect('/teachers')
}