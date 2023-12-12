
const options = document.querySelectorAll('.nav-bottom__btn')
const items = document.querySelectorAll('.item')

options.forEach((option, index) => {
    const item = items[index]
    option.onclick = function() {
        document.querySelector('.item.active').classList.remove('active')
        document.querySelector('.nav-bottom__btn.active').classList.remove('active')
        this.classList.add('active')
        item.classList.add('active')
    }
})