'use strict'
document.addEventListener("DOMContentLoaded", () => {
    console.log("Working");
    let check = [false,false,false,false,false,false, false, false, false];
    document.getElementById("checkAgreement").addEventListener("change", e => {
        check[2] = e.target.checked;
        const allNext = Array.from(document.querySelectorAll(".btn.next"));
        allNext[0].disabled = check[2] ? false : true;

    });
    document.getElementById("checkEmail").addEventListener("change", (e) => {
      check[3] = e.target.checked;
    });
    document.querySelectorAll(".inp").forEach(input => {
        input.addEventListener('input', () => {

            if(input.id === "email"){
                if(input.value.trim().length !== 0){
                    let email = input.value;
                    check[0] = validateEmail(email) || false;
                    if (check[0]){
                       fetch("sendcode/" + input.value)
                         .then((response) => response.json())
                         .then(data => {
                           alert("Verification code has been sent to "+input.value)
                           data.forEach(value =>{
                             sessionStorage.setItem("code", value.code);
                           })
                         });
                    }
                }
            }
            
            if (input.id === "confirm_password") {
                let password = document.getElementById("password").value;
              if(input.value.trim().length !== 0){
                check[1] = (input.value === password) || false;
              }
            }
            if (input.id === "re_verification_code") {
              let password = document.getElementById("verification_code").value;
              if (input.value.trim().length !== 0) {
                check[2] = input.value === password || false;
                if(check[2] === true){
                  let thecode =  sessionStorage.getItem("code");
                  if (thecode === input.value){
                    alert("Verification Complete");
                  }
                }
              }
            }
            if (input.id === "checkAgreement") {
              if(input.checked !== true){
                  window.alert("Please agree to the terms and conditions to continue")
              }
            }

        

        });
    });
});

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function confirmAgree() {
  const result = document.getElementById("checkAgreement");
  result.checked || alert("You have to agree"); 
}