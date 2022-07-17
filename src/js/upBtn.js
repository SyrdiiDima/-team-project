const upBtn = document.querySelector('[data-upbtn]');

upBtn.addEventListener('click', scrollTop);
window.addEventListener('scroll', hideUpBtn(upBtn))


function scrollTop() {
    window.scrollTo({top: 0, behavior: 'smooth'})
}

function hideUpBtn(element) {
    return function hide() {
        if (window.pageYOffset < document.documentElement.clientHeight) {
        element.classList.add('visuallyhidden'); 
        // console.log(window.pageYOffset);
        // console.log(document.documentElement.clientHeight);
    }
    else {
        element.classList.remove('visuallyhidden');
        // console.log(window.pageYOffset);
        // console.log(document.documentElement.clientHeight);
    }
    }
    
}

