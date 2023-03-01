'use strict'


const app = {


    init : () => {
        document.addEventListener('DOMContentLoaded',app.load)
    },

    load : () => {
        let page = document.body.id;
        console.log("App loaded");

        switch(page){
            case 'lancerLogin':
                app.loadLancerLogin();
                break;

        }
    },

    loadLancerLogin : () =>{
        let currentView = 0;
        let currentActive = 1;
        const nextBtn = document.querySelectorAll('.next');
        const prevBtn = document.querySelectorAll('.prev');
        const form = document.querySelector('.form');
        const formParts = Array.from(document.querySelectorAll('.form__part'))
        const points = Array.from(document.querySelectorAll('.progress__point'));
        const progressEnabled = document.querySelector('.progress__enabled');
        const skills_cont = document.querySelector('.form__skills');
        



         (async function(){
             try {
                 const downloadedSkills = await fetch('http://localhost:8000/categories_skills/');

                 const data =  await downloadedSkills.json();

                 const skills = JSON.parse(data.skills); 

                 console.log(skills);


                  const markup = skills.map((skill, idx) => {

                    return `
                        <label class="form__skill skill--${idx+1}">
                            <input type="checkbox" name="skill_box" value="${skill.field.name}">
                            <span>${skill.fields.name}</span>
                        </label>
                    `;
                 }).join(" ");


                skills_cont.innerHTML = null;
                skills_cont.innerHTML = markup;


             } catch (error) {
                 console.log(error);
             }
         })();



            nextBtn.forEach(btn => {
                btn.addEventListener('click',() => {
                    currentView++;
                    if(currentView > formParts.length-1) currentView = formParts.length-1;
                    form.style.transform = `translateX(-${currentView * 20}%)`;

                    // updating progress bar
                    currentActive++;
                    if (currentActive > points.length) {
                        currentActive = points.length;
                    }
                    changeStep();

                })
            });

            prevBtn.forEach(btn => {
                btn.addEventListener('click',() => {
                    currentView--;
                    if(currentView < 0) currentView = 0;
                    form.style.transform = `translateX(-${currentView * 20}%)`;

                     // updating progress bar
                     currentActive--;
                     if (currentActive < 1) {
                         currentActive = 1;
                     }
                     changeStep();
                })
            })

        
            const changeStep = () => {
                points.forEach((cur, index) => {
                    if (index < currentActive) {
                        cur.classList.add('active');
                    }else{
                        cur.classList.remove('active');
                    }

                })
                const actives  = document.querySelectorAll('.progress__point.active');
            
                progressEnabled.style.width = ((actives.length -1) / (points.length -1)) * 100 + '%';
                
            }

            form.querySelector('.form__file-input').addEventListener('change',function(){
                const dummy = document.querySelector('.form__profile-dummy');
                const profilePhoto = document.querySelector('.form__profile-img');
                const chosenFile = this.files[0];
                let fileType = chosenFile.type;
                const allowedFileType = ["image/png", "image/jpg", "image/jpeg"]

                if (allowedFileType.includes(fileType)) {
                    const reader = new FileReader();
                    reader.addEventListener('load',() => {
                        profilePhoto.setAttribute('src',reader.result)
                    });
                    reader.readAsDataURL(chosenFile);
                    dummy.style.display = "none";
                    profilePhoto.style.display = "block";
                }else{
                    alert('File must be an Image of type png, jpg or jpeg');
                }
                
            });
                
            

    }

}

app.init();