function Tab(el, option = {}) {
    this.el = el;
    this.ulLi = document.querySelectorAll(`${this.el} ul li`);
    this.add();
}
Tab.prototype.add = function () {
    let box = this.el
    this.ulLi.forEach((item, liindex) => {
        item.addEventListener('mouseover', function () {
            document.querySelector(`${box} ul li.active`).removeAttribute('class');
            this.setAttribute('class', 'active');
            let olLi = document.querySelectorAll(`${box} ol li`);
            olLi.forEach((item, index) => {
                item.removeAttribute('class');
            })
            olLi[liindex].setAttribute('class', 'active');
        })
    })
}