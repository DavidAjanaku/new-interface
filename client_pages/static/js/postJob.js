'use strict';

const form = document.querySelector('.JPform');

let dataReview = null;
let skills = [];



form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(dataReview);
    console.log('submitted');
    this.submit();
});


/*
MODAL
*/
// SECTION 1 EVENTS
{
    const selectorOuter = document.querySelector('.selector--outer');
    const overLay = document.querySelector('.selector__overlay');
    const closeModal = document.querySelector('.selector__close');

    const selectedValue = selectorOuter.firstElementChild;




    const exitModal = () => {

        const selectedRadio = document.querySelector('.selector__radio[name="jobCategory"]:checked');
        const skillContainer = document.querySelector('.customCheck-group');

        let html = `<div class="customCheck %size%" id="customCheck-%idx%"><input type="checkbox" class="customCheck__input" name="skillSelect" id="check-%idx%" value="%skill%" hidden><label for="check-%idx%" class="customCheck__label"><span>%skill%</span></label></div>`;

        selectedValue.textContent = selectedRadio.value;
        fetch(`${location.origin}/get_skills/${selectedRadio.value}/`)
            .then(res => res.json())
            .then(({ skills }) => {
                skillContainer.innerHTML = null;
                skills = JSON.parse(skills).map(({ fields }) => fields.name);
                skills.forEach((skill, index) => {
                    populateView(html, index, skill);
                });
            });

        function populateView(htmlText, index, skill) {
            let isLongString = (skill.length > 10) && skill.indexOf(' ') >= 0;
            let newHtml = htmlText.replaceAll("%idx%", index);

            newHtml = newHtml.replaceAll("%skill%", skill);
            newHtml = isLongString ? newHtml.replace("%size%", "grid-long") : newHtml.replace("%size%", "grid-default");
            skillContainer.insertAdjacentHTML("beforeend", newHtml);
        }


        overLay.classList.add('hidden');

    };

    const openModal = function () {
        overLay.classList.remove('hidden');
    };




    selectorOuter.addEventListener('click', openModal);
    closeModal.addEventListener('click', exitModal);
}








// TOGGLING FORM SECTIONS

{
    let currentActive = 0;
    let index = 0;
    const progress = Array.from(document.querySelectorAll('.tip'));
    const sections = Array.from(document.querySelectorAll('.JPform__part'));
    const nextButtons = document.querySelectorAll('.JPform__btn--next');
    const prevButtons = document.querySelectorAll('.JPform__btn--prev');
    const editBtns = document.querySelectorAll('.revBox__editBtn');
    const postNavItems = document.querySelectorAll('.job-post__item');
    const navClicks = [editBtns, postNavItems];

    const nextSection = function () {
        changeView('next');
    }

    const prevSection = function () {
        changeView('prev');
    }

    const gotoSection = num => {
        sections.forEach(section => {
            section.classList.remove('JPform__part--active');
        })

        sections[num].classList.add('JPform__part--active');
        changeTip(num);
    }

    const changeView = direction => {
        const active = document.querySelector('.JPform__part.JPform__part--active');
        currentActive = sections.indexOf(active);
        active.classList.remove('JPform__part--active');

        if (direction === 'next') {
            (currentActive !== sections.length - 1) && currentActive++;

        } else if (direction === 'prev') {
            currentActive--;
        }

        sections[currentActive].classList.add('JPform__part--active');
        changeTip(currentActive);

    }

    const changeTip = index => {
        const active = document.querySelector('.tip.tip--active');
        currentActive = progress.indexOf(active);
        active.classList.remove('tip--active');

        progress.forEach((tip, idx) => {
            if (idx < index) {
                tip.classList.add('tip--done');
            } else if (idx > index) {
                tip.classList.remove('tip--done');
            }
        })

        progress[index].classList.add('tip--active');

    }


    navClicks.forEach(item => {
        item.forEach(editBtn => {
            editBtn.addEventListener('click', () => {
                const { navigate } = editBtn?.dataset;
                if (undefined !== navigate) {
                    gotoSection(Number(navigate))
                }
            })
        })
    })



    nextButtons.forEach(button => button.addEventListener('click', nextSection));
    prevButtons.forEach(button => button.addEventListener('click', prevSection));



}


// SECTION 2 EVENTS
{

    const descArea = document.querySelector('#desc-area');
    descArea.addEventListener('input', () => {
        let descAreaLength = descArea.value.length;
        document.querySelector('#counter').textContent = `${descAreaLength}/5000 characters (minimum 50)`;
    })

}




// SECTION 6 EVENTS
{
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const payPerHour = document.querySelectorAll('.pay-per-hour');
    const payFixedPrice = document.querySelector('.pay-fixed-price');
    paymentMethods.forEach(paymentMethod => {
        paymentMethod.addEventListener('change', () => {
            let ID = paymentMethod.id;
            switch (ID) {
                case "cr15":
                    payPerHour.forEach(PPH => { PPH.classList.remove('hidden') });
                    payFixedPrice.classList.add('hidden');
                    break;
                case "cr16":
                    payPerHour.forEach(PPH => { PPH.classList.add('hidden') });
                    payFixedPrice.classList.remove('hidden');
                    break;
            }

        })
    })
}



// SECTION REVIEW EVENTS
{

    const areFieldsValid = (...El) => {
        return El.every(text => text?.length > 0 || false);
    }

    // let title, jobCategory, description, projType, expertise, jobVisibility, 
    // lancersNeeded, paymentType, lancerExpertise, projLife;

    const btns = document.querySelectorAll('.JPform__btn--next');
    const allReviewDesc = document.querySelectorAll('.revBox__desc');

    btns[btns.length - 1].addEventListener('click', () => {

        const title = document.querySelector('.jp_name').value;

        const jobCategory = document.querySelector('.selector--outer').firstElementChild.textContent;

        const description = document.querySelector('.jp_desc').value;

        const projType = document.querySelector('input[name="projectType"]:checked')?.value;

        const projStage = document.querySelector('input[name="projectStage"]:checked')?.value;

        const skills = Array.from(
            document.querySelectorAll('input[name="skillSelect"]:checked'))
            .map(cur => cur.value);

        const jobVisibility = document.querySelector('input[name="jobVisibility"]:checked')?.value;

        const freeLancersNeeded = document.querySelector('input[name="freelancerNumber"]:checked')?.value;

        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

        const lancerExperience = document.querySelector('input[name="freelancerExperience"]:checked')?.value;

        const projectLife = document.querySelector('input[name="timeExpectation"]:checked')?.value;

        //POST BTN DISABLE OR ENABLE

        const postBtn = document.querySelector('.JPform__btn--post');
        postBtn.disabled = !(areFieldsValid(
            title,
            jobCategory,
            description,
            projType,
            projStage,
            jobVisibility,
            freeLancersNeeded,
            paymentMethod,
            lancerExperience,
            projectLife
        ) && skills.length > 0);



        dataReview = {
            project: {
                title: {
                    name: title,
                    category: jobCategory
                },
                description: description,
                type: projType,
                stage: projStage,
                timeExpectation: projectLife,
                visibility: {
                    visibleTo: jobVisibility,
                }
            },
            lancer: {
                experience: lancerExperience,
                skills: skills,
                number: freeLancersNeeded

            },
            paymentMethod: {
                type: paymentMethod
            }
        }

        allReviewDesc[0].textContent = dataReview.project.title.name;
        allReviewDesc[1].textContent = dataReview.project.title.category;
        allReviewDesc[2].textContent = dataReview.project.description;
        allReviewDesc[3].textContent = dataReview.project.type;
        allReviewDesc[4].textContent = dataReview.project.stage;


        while (allReviewDesc[5].firstChild) {
            allReviewDesc[5].removeChild(allReviewDesc[5].firstChild);
        }

        dataReview.lancer.skills.forEach(skill => {
            allReviewDesc[5].insertAdjacentHTML("afterbegin", `<li>${skill}</li>`);
        });


        allReviewDesc[6].textContent = dataReview.project.visibility.visibleTo;
        allReviewDesc[7].textContent = dataReview.lancer.number;
        allReviewDesc[8].textContent = dataReview.paymentMethod.type;
        allReviewDesc[9].textContent = dataReview.lancer.experience;
        allReviewDesc[10].textContent = dataReview.project.timeExpectation;
    })



    //    console.log(dataReview);
}