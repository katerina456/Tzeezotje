document.addEventListener("DOMContentLoaded", () => {
    initPopups();
    initSlider();
});

function initPopups() {
    let menuBtn = document.querySelector('.mobile-nav');

    menuBtn.addEventListener('click', () => {
        let menu = document.querySelector('.menu-pop-up');
        setPopUp(menu)
    })
    
    
    let closeBtn = document.getElementById('closeMenu');
    
    closeBtn.addEventListener('click', () => {
        let menu = document.querySelector('.menu-pop-up');
        removePopUp(menu);
    })
    
    
    let reserveBtn = document.querySelector('.button');
    
    reserveBtn.addEventListener('click', () => {
        let form = document.querySelector('.reserve-pop-up');
        setPopUp(form)
    })
    
    
    let closeReserve = document.getElementById('closeReserve');
    
    closeReserve.addEventListener('click', () => {
        let form = document.querySelector('.reserve-pop-up');
        removePopUp(form);
    })
    
    
    let form = document.querySelector('.form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    
        let data = new FormData(form);
        let url = 'https://reqres.in/api/users';
        let metod = 'POST';
    
        fetch(url, {
            method: metod,
            body: data
        })
    
        .then(function(response) {
            console.log(response.status )    
    
            if (response.status > 299) {
                getAnswer('Something was wrong');
            } else {
                getAnswer('All right');
            }
        })
    
        .catch(() => {
            console.log('error')
    
            getAnswer('Something was wrong');
        })
    
        clearForm(form);
    })
    
    
    function clearForm(form) {
        let inputs = form.querySelectorAll('.input');
    
        inputs.forEach(input => {
            input.value = '';
        })
    }
    
    function getAnswer(text) {
        let popUp = document.querySelector('.reserve-pop-up');
        let answer = document.querySelector('.answer');
    
        removePopUp(popUp);
        answer.textContent = text;
        setPopUp(answer);
        setTimeout(() => {  
            removePopUp(answer)
        }, 2000);
    }
    
    function setPopUp(popUp) {
        popUp.classList.add('visible');
        setOverlay();
    }
    
    function removePopUp(popUp) {
        popUp.classList.remove('visible');
        removeOverlay();
    }
    
    function setOverlay() {
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        let body = document.querySelector('body');
        body.appendChild(overlay);
    }
    
    function removeOverlay() {
        let body = document.querySelector('body');
        let overlay = document.querySelector('.overlay');
        body.removeChild(overlay);
    }
}



function initSlider() {
    let comments = [
        {
            title: 'Goede service',
            text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore 
                    magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
                    et justo duo dolores et ea rebum. Stet clita kasd gubergren.`,
            autor: 'Tom Black'
        },
        {
            title: 'Lekker eten',
            text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore 
                    magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
                    et justo duo dolores et ea rebum. Stet clita kasd gubergren.`,
            autor: 'Sam White'
        },
        {
            title: 'Toffe ambiance',
            text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore 
                    magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
                    et justo duo dolores et ea rebum. Stet clita kasd gubergren.`,
            autor: 'Paul Brown'
        }
    ]
    
    let arrowRight = document.querySelector('.right');
    
    comments.forEach(comment => {
        let div = document.createElement('div');
        div.classList.add('comment');
        /* div.style.display = 'none' */
    
        let title = document.createElement('h2');
        title.classList.add('h2');
        title.textContent = comment.title;
    
        let text = document.createElement('p');
        text.classList.add('text');
        text.textContent = comment.text;
    
        let autor = document.createElement('p');
        autor.classList.add('autor');
        autor.textContent = comment.autor;
    
        div.appendChild(title);
        div.appendChild(text);
        div.appendChild(autor);
    
        arrowRight.before(div)
    })
    
    let sliderItems = document.querySelectorAll('.comment');
    
    for (let i=0; i < sliderItems.length; i++) {
        sliderItems[i].dataset.index = i
    }
    
    let arrows = document.querySelectorAll('.arrow')
    
    arrows.forEach(arrow => {
        arrow.addEventListener('click', (event) => {
            let index;
            sliderItems.forEach(item => {
                if (item.classList.contains('visible')) {
                    index = +item.dataset.index
                    item.classList.remove('visible')
                }
            })
    
            if (event.target.classList.contains('left')) {
                index --;
                if (index < 0) {
                    index = sliderItems.length - 1;
                }
            } else {
                index ++;
                if (index === sliderItems.length) {
                    index = 0;
                }
            }
    
            sliderItems[index].classList.add('visible') 
        })
    })
}
