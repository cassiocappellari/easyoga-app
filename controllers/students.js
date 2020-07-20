const fs = require('fs')
const data = require('../data.json')
const {age, skill, date} = require('../useful')
Intl = require('intl')

exports.index =  function(req, res) {

    return res.render('students/index', {students: data.students})
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
    const id = data.students.length + 1

    data.students.push({
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
        
        return res.redirect('/students')
    })
}

exports.show = function(req, res) {

    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if(!foundStudent) {
        return res.send('Student not found! :(')
    }

    const student = {
        ...foundStudent,
        age: age(foundStudent.dateOfBirth),
        skill: skill(foundStudent.skills),
        services: foundStudent.services.split(','),
        createdAt: new Intl.DateTimeFormat('pt-BR').format(foundStudent.createdAt),
    }

    return res.render('students/show', {student})
}

exports.edit = function(req, res) {
    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return id == student.id
    })

    if(!foundStudent) {
        return res.send('Student not found! :(')
    }

    const student = {
        ...foundStudent,
        dateOfBirth: date(foundStudent.dateOfBirth),
        services: foundStudent.services.split(',')
    }

    return res.render('students/edit', {student})
}

exports.put = function(req, res) {
    const {id} = req.body

    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if(id == student.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundStudent) {
        return res.send('Student not found!')
    }

    const student = {
        ...foundStudent,
        ...req.body,
        dateOfBirth: Date.parse(req.body.dateOfBirth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) {
            return res.send('Error!')
        }

        return res.redirect(`/students/${id}`)
    })

}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) {
            return res.send('Error!')
        }
    })

    return res.redirect('/students')
}

exports.create = function(req, res) {
    return res.render('students/create')
}