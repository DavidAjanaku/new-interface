// const myForm = document.getElementById('myForm');

// console.log(myForm);

// myForm.addEventListener('submit', function(e){
//     e.preventDefault();

//     const formData = {
//         amount: myForm.querySelector('#Amount').value,
//         bank_code: myForm.querySelector('#BankName').value,
       
//         acc_no: myForm.querySelector('#AccountNumber').value
      
      
//     }

//     console.log(formData);


//     // const formData = new FormData(this);

//     fetch('https://lancerspointdemo.herokuapp.com/resolve-bank-pay/',{
//         method : 'POST',
//         headers: {
//          accept: 'application/json'},
//         body: JSON.stringify(formData)
//     }).then(res => res.json()).then(data => console.log(res)).catch(err => console.log(err))
// // })