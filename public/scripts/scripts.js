const currentPage = location.pathname
const menuItens = document.querySelectorAll('header .links a')

for (let item of menuItens) {
    if(currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

formDelete.addEventListener('submit', function(event){
    const deleteOption = confirm('Are you sure?')
    if(!deleteOption) {
        event.preventDefault()
    }
})