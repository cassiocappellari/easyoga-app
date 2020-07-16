const fs = require('fs')
const data = require('./data.json')
const {age, skill} = require('./useful')
Intl = require('intl')

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