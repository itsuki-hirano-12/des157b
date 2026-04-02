(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const brella = document.querySelector('#brella');
    const sun = document.querySelector('#sun');
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            changeButton();
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            changeButton();
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
})()