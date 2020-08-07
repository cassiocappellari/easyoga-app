const {age, skill, date} = require('../../lib/useful')
const db = require('../../config/db')
Intl = require('intl')

module.exports = {
    index(req, res){
        db.query(`SELECT * FROM teachers ORDER BY name ASC`, function(err, results) {
            if(err) throw `Database error! ${err}`

            return res.render('teachers/index', {teachers: results.rows})
        })
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

        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth_date,
                skill_level,
                gender,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            req.body.avatar_url,
            req.body.name,
            date(req.body.birth_date).iso,
            skill(req.body.skill_level),
            req.body.gender,
            req.body.services,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            return res.redirect(`/teachers/${results.rows[0].id}`)
        })
    },
    show(req, res){
        return
    },
    edit(req, res){
        return
    },
    put(req, res){
        return
    },
    delete(req, res){
        return
    }
}