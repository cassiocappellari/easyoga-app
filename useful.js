module.exports = {
    age: function(timestamp) {

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
    skill: function(value) {

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
    }
}