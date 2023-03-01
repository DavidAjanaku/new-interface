'use strict'
document.addEventListener('DOMContentLoaded',() => {
    const formPartOne = [false,false,false];
    const formPartTwo = [false,false,false,false,false];
    const formPartThree = [false, false];
    const formPartFour = [false];



    const nextBtns = Array.from(document.querySelectorAll(".btn.next"));
    nextBtns.forEach(btn => btn.disabled=true);


    document.getElementById("checkAgreement").addEventListener("change", e => {
        formPartOne[2] = e.target.checked;
        validateBtn(formPartOne,0);
  
    });
   

    document.querySelectorAll(".form__input").forEach(input => {
        input.addEventListener('input', () => {


            if(input.id === "email"){
                if(input.value.trim().length !== 0){
                    let email = input.value;
                    let validated = validateEmail(email);
                    formPartOne[0] = validated || false;

                    if (validated === true){  
                        fetch("sendcode/" + input.value)
                          .then((response) => response.json())
                          .then((data) => {
                              alert(
                                "Verification code has been sent to " +
                                  input.value
                              );
                            data.forEach((value) => {
                                console.log("Sent");
                            });
                          });
                    }
                }
            }
            
            if (input.id === "confirm_password") {
                let password = document.getElementById("password").value;
                if(input.value.trim().length !== 0){
                    formPartOne[1] = (input.value === password) || false;
                }
            }

            if(input.id === "fullname"){
                formPartTwo[0] = (input.value.trim().length !== 0) ? true : false;
            }
            if(input.id === "phone_no"){
                formPartTwo[1] = (input.value.trim().length !== 0) ? true : false;
            }
            if(input.id === "city"){
                formPartTwo[2] = (input.value.trim().length !== 0) ? true : false;
            }
            
            if(input.id === "country"){
                formPartTwo[3] = (input.value.trim().length !== 0) ? true : false;
            }
            if(input.id === "house_add"){
                formPartTwo[4] = (input.value.trim().length !== 0) ? true : false;
            }


            if(input.id === "user_name"){
                formPartThree[0] = (input.value.trim().length !== 0) ? true : false;
            }
            if (input.id === "verification_code") {
              formPartThree[1] = input.value.trim().length !== 0 ? true : false;
            }
            // if(input.id === "re_verification_code"){
            //     let verification_code = document.getElementById("verification_code").value;
            //     if(input.value.trim().length !== 0){
            //         formPartThree[1] = (input.value === verification_code) || false;
            //     }
            // }

            if(input.id === "professional-title"){
                formPartFour[0] = (input.value.trim().length !== 0) ? true : false;
            }







            validateBtn(formPartOne,0);
            validateBtn(formPartTwo,1);
            validateBtn(formPartThree,2);
            validateBtn(formPartFour,3);

        });
    });


    function validateBtn(arryValidator,btnIndex){
        nextBtns[btnIndex].disabled = (!arryValidator.includes(false)) ? false : true;
    }


        
})


function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}






  