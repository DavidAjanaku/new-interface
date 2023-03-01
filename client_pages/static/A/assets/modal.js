const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");


const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");



  };


  closeModalBtn.addEventListener('click', function(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  })
