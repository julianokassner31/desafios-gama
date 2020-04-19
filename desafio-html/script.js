function scrollPage(id) {
    window.scrollTo({top: 0});

    var height = document.querySelector('.nav').getBoundingClientRect().height;
    var top = -10 + document.getElementById(id).getBoundingClientRect().top;
    window.scrollTo({top: (top - height), behavior: 'smooth'});

}

function enviarmsg(form) {
    debugger;
    modal = document.getElementById('container-modal');
    modal.style.display = 'flex';
}

function closeModal() {
    modal = document.getElementById('container-modal');
    modal.style.display = 'none'; 
}