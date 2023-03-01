// GETTING LIST OF BANKS


// FETCHING BANKS

const banksDataList = document.querySelector('#banks');
const bank = document.querySelector('.bank');
let bankOptions = [];


fetch('https://lancerspointdemo.herokuapp.com/get-banks/')
.then(resp => resp.json())
.then(({banks}) => {
    bankOptions = [...banks];
    banksDataList.innerHTML = null;
    let options = ``;
    console.log(banks);
    for(const {name, code} of banks){
        options += `<option value="${name}"  data-code= ${code}>`;
    
        // console.log(options);
    }
    banksDataList.innerHTML = options;
})
.catch(err => console.error(err.message));













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

//     fetch('https://lancerspointdemo.herokuapp.com/resolve-bank-pay  ',{
//         method : 'POST',
//         headers: {
//          accept: 'application/json'},
//         body: JSON.stringify(formData)
//     }).then(function(response){
//         console.log(response.text);
//         return response.text();
//     }).then(function(text){
//         console.log(response.text);

//     }).catch(function(error){
//         console.log(error);
//     })
// })


let accountName;


let nameValidation = document.querySelector('.user_name');


const myForm = document.getElementById('myForm');
let code = 0;


bank.addEventListener('change', function () {
    const [found] = bankOptions.filter(el => el.name === this.value);
    code = found.code;
});

        openModalBtn.addEventListener("click", openModal);



myForm.addEventListener('submit', function(e){
    e.preventDefault();

  

    const amount =  +document.getElementById('Amount').value;
    const acc_no =Number (document.getElementById('AccountNumber').value);
    const formData = {
        amount,
        bank_code: code,
        acc_no,
        bank_name: bank.value,
       
    }





// GETTING THE NAMES USING DOM

const account_amount = document.querySelector('.account_amount').innerHTML = amount;



const bankBranch = document.querySelector('.account_bank').innerHTML = bank.value

const BankAccountNumber = document.querySelector('.account_number').innerHTML = acc_no;
    


    console.log(formData);
    console.log(formData.bank_code);





    // POSTING THE DETAILS INPUTED DROM THE USER


    // const formData = new FormData(this);

    fetch('https://lancerspointdemo.herokuapp.com/resolve-bank-pay/',{
        method : 'POST',
        headers: {
         accept: 'application/json'},
        body: JSON.stringify(formData)
    }).then((res) => res.json()).then((data)=> {

        console.log(data);
        const getValues = Object.values(data.response.account_name); 

        console.log(getValues.join(""));
      accountName  = getValues.join("");
      console.log(accountName);
      data.sen

        nameValidation.innerHTML = accountName;
            
        openModalBtn.addEventListener("click", openModal);



     
     }).catch(function(error){
             console.log(`Authorization failed : `+ error.message)
     })

    })

// nameValidation.innerHTML  =accountName;









// CONFIRMING THE DETAILS SENT TO THE API BEFORE WITHDRAWING


    const successful = document.querySelector('.successful');
    
    
    successful.addEventListener('click', function(e){

        e.preventDefault()
        console.log('sucess');
        const account_name = nameValidation.textContent;

        const amount =  +document.getElementById('Amount').value;
        const account_number =Number (document.getElementById('AccountNumber').value);
        const formData = {
            amount,
            account_name,
            account_number,
            bank_code: code,
            confirm: true
        
    
           
        }

        console.log(nameValidation.textContent);


        fetch('https://lancerspointdemo.herokuapp.com/resolve-bank-pay/',{
            method : 'POST',
            headers: {
             accept: 'application/json'},
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then((data)=> {
            console.log(data);

            console.log(formData);
            console.log('sucessful');
    
        })
      })


      