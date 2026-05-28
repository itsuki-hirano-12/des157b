(function(){
    'use strict';
    console.log('reading js');

    const boarding = document.querySelector('#boarding');
    const letter = document.querySelector('#letter');
    const target = document.querySelector('#view-target');
    const enter = document.querySelector('#enter');
    const dialouge = document.querySelector('#dialogue');
    const test = document.querySelector('#beginTest');
    let checkedProf = false;

    test.addEventListener('click', function(){
        document.querySelector('#usertest').className = 'off';
    })
    
    document.querySelector('#start').addEventListener('click', function(){
        boarding.className = 'off';
        letter.removeAttribute('class');
    });

    document.querySelector('#t-prof').addEventListener('click', function(){
        target.removeAttribute('class');
    });

    document.querySelector('#close').addEventListener('click', function(){
        target.className = 'off';
        checkedProf = true;
        enter.className = 'btn';
        enter.style.color = '#e8f0fc'
    });

    enter.addEventListener('click', function(){
        if (checkedProf) {
            letter.className = 'off';
            dialouge.removeAttribute('class');
        }
    });


})();