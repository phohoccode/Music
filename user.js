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

// xử lý khi người dùng reload trang hoặc nhấn phím f5
window.addEventListener('beforeunload', function (e) {
    // Hủy bỏ sự kiện mặc định (hiển thị hộp thoại xác nhận)
    e.preventDefault();
});



