module.exports = {
    age(timestamp) {

        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        const day = today.getDate() - birthDate.getDate()
    
        if(month < 0 || month == 0 && day < 0) {
            age--
        }
    
        return age
    },
    skill(value) {

        let skill = ''

        if(value == 'Beginner') {
            skill = 'Beginner (0 to 2 years +)'
        } else if(value == 'Intermediate') {
            skill = 'Intermediate (2 to 6 years +)'
        } else if(value == 'Advanced') {
            skill = 'Advanced (6 to 20 years +)'
        } else {
            skill = 'Buddha (20 years +)'
        }

        return skill
    },
    date(timestamp) {

        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDate: `${day}/${month}`
        }
    }
}