const profileBtn = document.querySelector('.profile__btn');
const modalCloseBtn = document.querySelector('.modal__times');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');


[profileBtn, modalCloseBtn].forEach(el => el.addEventListener('click',toggleModal));
function toggleModal(){
   [modal, overlay].forEach(el => el.classList.toggle('hidden'))
}




// PROFILE IMAGE INPUT
const fileInput = document.getElementById('profile-img');
fileInput.addEventListener('change', function(){
    const [file] = this.files;
    const url  = URL.createObjectURL(file)
    document.querySelector('.form__cust-input').value = file.name;
    document.querySelector('.form__img').setAttribute('src',url);

})