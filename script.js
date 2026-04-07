(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const brella = document.querySelector('#brella');
    const sun = document.querySelector('#sun');
    const background = document.querySelector('#background');
    let mode = 'dark';
    let rainPosition;
    rain();

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            changeButton();
            background.innerHTML = '';
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            changeButton();
            rain();
            mode = 'dark'
        }
    })

    function changeButton(){
        if (mode=== 'dark') {
            brella.style.transform = 'translateY(100%)';
            sun.style.transform = 'translateY(0)';
        } else {
            sun.style.transform = 'translateX(50%) translateY(-100%)';
            brella.style.transform = 'translateY(0)';
        }
    }

    function rain(){
        
        
        
        // let rainCount = 0;
        rainPosition = [];
        // addRain(rainCount);

        for (let i=0; i < 50; i++) {
            rainPosition[i] = Math.floor(Math.random() * 100);
            background.innerHTML += `<div class='rain${i}'></div>`;
            document.querySelector(`.rain${i}`).style.left = `${rainPosition[i]}%`;
            document.querySelector(`.rain${i}`).style.animationDelay = `calc(${i} * 0.678s)`;
        }

    }
})()