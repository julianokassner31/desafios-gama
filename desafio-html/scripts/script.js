function scrollPage(id) {
    window.scrollTo({top: 0});

    var height = document.querySelector('.nav').getBoundingClientRect().height;
    var top = -10 + document.getElementById(id).getBoundingClientRect().top;
    window.scrollTo({top: (top - height), behavior: 'smooth'});

}

function enviarmsg(button) {
    var frase = getMsgDefault();
    var modal = document.getElementById('container-modal');
    var contentModal = document.querySelector('.content-modal');
    var nome = button.form.elements.nome.value;

    modal.style.display = 'flex';
    document.body.style['max-width'] = '100%';
    frase = frase.replace('{nome}', nome);
    contentModal.innerText = frase;
}

function closeModal() {
    var modal = document.getElementById('container-modal');
    modal.style.display = 'none';
    document.body.style['max-width'] = '900px';
    document.querySelector('.content-modal').innerText = ''; 
}

function getMsgDefault() {
    return 'Mensagem enviado com sucesso {nome}.\n'+
    'Muito obrigado pelo contato.';
}