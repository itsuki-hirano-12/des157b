(function(){
    'use strict';
    console.log('reading js');

    const boarding = document.querySelector('#boarding');
    const letter = document.querySelector('#letter');
    const target = document.querySelector('#view-target');
    const enter = document.querySelector('#enter');
    const dialouge = document.querySelector('#dialogue');
    const test = document.querySelector('#beginTest');
    const next = document.querySelector('#next');
    const chara = document.querySelector('#chara img');
    const line = document.querySelector('#dialogue p');
    let checkedProf = false;
    let section = 'entry';
    let dialogueNum = 1;
    let dialogues;
    let dialogueID;

    getData();

    async function getData() {
        const list = await fetch('dialogue.json');
        const data = await list.json();
        const values = Object.values(data);
        console.log(values);
        dialogues = values;
    }

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

    next.addEventListener('click', switchDialogue);

    function switchDialogue(){
        line.innerHTML = 'This is all I have right now'

        console.log('switch dialogue');
        dialogueNum++;

        dialogueID = `${section}${dialogueNum}`;

        console.log(dialogueID);

        // chara.src = `images/${dialogues[dialogueID].char}.jpg`;
        // line.innerHTML = dialogues[dialogueID].script;
    }


})();