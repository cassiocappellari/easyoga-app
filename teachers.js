const fs = require('fs')
const data = require('./data.json')

exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for(let key of keys) {
        if(req.body[key] == '') {
            return res.send('Please, fill all the fields!')
        }
    }

    let {avatar_url, name, dateOfBirth, education, gender, services} = req.body

    dateOfBirth = Date.parse(dateOfBirth)
    const createdAt = Date.now()
    const id = data.teachers.length + 1

    data.teachers.push({
        id,
        avatar_url,
        name,
        dateOfBirth,
        education,
        gender,
        services,
        createdAt
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write file error!')
        
        return res.redirect('/teachers')
    })
    
    // res.send(req.body)

}