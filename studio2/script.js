(function(){
    'use strict';
    console.log('reading js');

    let display = 0;
    const next = document.querySelector('#next');
    const back = document.querySelector('#back');
    let globalData;

    async function getData() {
        const day = await fetch('data/distance.json');
        const data = await day.json();
        const values = Object.values(data);
        console.log(values);
        globalData = values;
    }

    getData();

    document.addEventListener('click', function(event){
        if (event.target.id === 'next') {
            display ++;
            console.log(display);
            if (display === 7) {
                next.className = 'hidden';
            }
            
            back.className = 'buttonOn';
        }

        if (event.target.id === 'back') {
            display --;
            console.log(display);
            if (display === 0) {
                back.className = 'hidden';
            }
            
            next.className = 'buttonOn';
        }

        changeText(globalData);
        moveMap(display);
        moveBar(display);
    });

    function changeText(data) {
        const time = document.querySelector('h1');
        const action = document.querySelector('#action');
        const dist = document.querySelector('#distance');
        const total = document.querySelector('#total p');

        time.innerHTML = data[display].time;
        action.innerHTML = `I ${data[display].action}`;
        dist.innerHTML =  `Distance Traveled: ${data[display].distance} Miles`;
        total.innerHTML = `Total Distance Traveled: ${data[display].total} Miles`;
    }

    function moveMap(display) {
        const map = document.querySelector('#map');
        const routes = document.querySelector('#routes');

        map.className = `map${display}`;

        switch (display) {
            case 1: routes.innerHTML = '<img src="images/route1.svg" alt="first route" id="firstMotion">'
                break;
            case 3: routes.innerHTML = '<img src="images/route2.svg" alt="second route" id="secondMotion">'
                break;
            case 5: routes.innerHTML = '<img src="images/route3.svg" alt="third route" id="thirdMotion">'
                break;
            case 6: routes.innerHTML = '<img src="images/route4.svg" alt="fourth route" id="fourthMotion">'
                break;
            case 7: routes.innerHTML = '<img src="images/final.svg" alt="final summary" id="routeSummary">'
                break;
            default: routes.innerHTML = ''
        }
    }

    function moveBar(display) {
        const route1 = document.querySelector('#route1');
        const misc = document.querySelector('#misc');
        const route2 = document.querySelector('#route2');
        const route3 = document.querySelector('#route3');
        const route4 = document.querySelector('#route4');
        const invis = document.querySelector('#invis');

        if (display === 1) {
            route1.style.flex = '1.8';
            invis.style.flex = 'calc(8.6 - 1.8)'
            misc.style.flex = '0';
        } else if (display === 2) {
            misc.style.flex = '0.2';
            invis.style.flex = 'calc(8.6 - 2)';
            route2.style.flex = '0'
        } else if (display === 3) {
            route2.style.flex = '1.8';
            invis.style.flex = 'calc(8.6 - 3.8)';
        } else if (display === 4) {
            route3.style.flex = '0';
            invis.style.flex = 'calc(8.6 - 3.8)';
        } else if (display === 5) {
            route3.style.flex = '1.1';
            invis.style.flex = 'calc(8.6 - 4.9)';
            route4.style.flex = '0'
        } else if (display === 6) {
            route4.style.flex = '3.7';
            invis.style.flex = '0';
        } else if (display === 0) {
            route1.style.flex = '0';
        }
    }
})();