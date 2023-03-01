console.log("working")
const hrefArr = location.href.trim().split("/").filter(slug => slug !== '');
const slug = hrefArr[hrefArr.length - 1];
const parent = document.querySelector('.row');


fetch(`${location.origin}/client/get_job/${slug}/`)
    .then(res => res.json())
    .then(res => {
        const [{ fields: data }] = JSON.parse(res.job);
        render(data);
    });


const render = (data) => {
    const HTML = `
    <div class="contract-detail">
        <header class="contract-detail__header">
            <h1 class="contract-detail__title">${data.title}</h1>
            <figure class="contract-detail__published">
                <svg class="contract-detail__icon-small">
                    <use xlink:href="{% static 'images/sprite.svg#icon-price-ribbon' %}"></use>
                </svg>
                <span>${data.status}</span>
            </figure>
        </header>
    
        <div class="contract-detail__top">
            <div class="contract-detail__project">
                <div>
                    <h3>About</h3>
                    <p>${data.description}</p>
                </div>
    
                <div>
                    <h3>Created</h3>
                    <time>${calculateDate(data.created)}</time>
                </div>
            </div>
            <div class="contract-detail__job">
                <div class="contract-detail__group">
                    <h3>Job type</h3>
                    <small>${data.job_type}</small>
                </div>
                <div class="contract-detail__group">
                    <h3>Job visibility</h3>
                    <small>${data.jobVisibility}</small>
                </div>
            </div>
        </div>
    
        <div class="contract-detail__mid">
            <figure class="contract-detail__box contract-detail__box--1">
                <figure>
                    <svg class="contract-detail__icon">
                        <use xlink:href="{% static 'images/sprite.svg#icon-stopwatch' %}"></use>
                    </svg>
                </figure>
    
                <div>
                    <h3>Posted</h3>
                    <p>${calculateDate(data.time_posted)}</p>
                </div>
                <div>
                    <h3>Time frame</h3>
                    <p>${data.time_frame || 'none'}</p>
                </div>
                <div>
                    <h3>Requirement</h3>
                    <p>${data.time_requirements}</p>
                </div>
    
            </figure>
            <figure class="contract-detail__box contract-detail__box--2">
                <figure>
                    <svg class="contract-detail__icon">
                        <use xlink:href="{% static 'images/sprite.svg#icon-price-ribbon' %}"></use>
                    </svg>
                </figure>
    
                <div>
                    <h3>Experience</h3>
                    <p>${data.lancerExperience}</p>
                </div>
                <div>
                    <h3>Lancer Visibility</h3>
                    <p>${data.lancerVisibility}</p>
                </div>
    
    
            </figure>
            <figure class="contract-detail__box contract-detail__box--3">
                <figure>
                    <svg class="contract-detail__icon">
                        <use xlink:href="{% static 'images/sprite.svg#icon-credit' %}"></use>
                    </svg>
                </figure>
    
                <div>
                    <h3>Payment method</h3>
                    <p>${data.paymentMethod}</p>
                </div>
                <div>
                    <h3>Fixed price</h3>
                    <p>${data.fixed_budget}</p>
                </div>
    
    
            </figure>
        </div>
    
        <div class="contract-detail__bottom">
            <h2 class="u-margin-bottom-small">Project</h2>
            <div class="contract-detail__project">
                <div>
                    <h3>Files required</h3>
                    <p>${data.proj_files || "none"}</p>
                </div>
                <div>
                    <h3>API needed</h3>
                    <p>${data.api_needed}</p>
                </div>
                <div>
                    <h3>Project stage</h3>
                    <p>${data.proj_stage}</p>
                </div>
            </div>
    
            <div class="confirm-box">
                <a href="{% url 'client:contracts' %}" class="contract-detail__confirm">
                    confirm
                </a>
            </div>
        </div>
    </div>
`;

    const newDOM = document.createRange().createContextualFragment(HTML);
    const newDOM_Elements = Array.from(newDOM.querySelectorAll("*"));
    const oldDOM_Elements = Array.from(parent.querySelectorAll("*"));

    newDOM_Elements.forEach((newEl, index) => {
        const oldEl = oldDOM_Elements[index];
        if(!newEl.isEqualNode(oldEl) && newEl.firstChild?.nodeValue?.trim() !== ''){
            oldEl.textContent = newEl.textContent;
        }
    })
}

export const calculateDate = (dateText) => {
    const date = new Date(dateText);
    const today = new Date();
    const dateDiff = today - date;
    const days = Math.ceil(dateDiff / (1000 * 60 * 60 * 24)) - 1;

    console.log(days);

    if (days === 0) {
        return "Today";
    } else if (days === 1) {
        return "Yesterday"
    } else if (days === 7) {
        return `1 week ago`;
    } else if (days > 7) {
        return `${days} days ago`;
    } else {
        return date.toLocaleDateString();
    }

}

