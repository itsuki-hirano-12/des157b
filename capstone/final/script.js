(function(){
    'use strict';
    console.log('reading js');

    let checkedProf = false;
    let section = 'entry';
    let saveSection = 'octo';
    let chosenOption = 0;
    let dialogueNum = 0;
    let dialogues;
    let dialogueID = 'entry0';
    let theDialogue;
    let d1active = true;
    let d2active = true;
    // let sectionNum = 1;
    let ageActive = false;
    let genderActive = false;
    let locationActive = false;
    let notesActive = false;
    let highlights = false;
    let username;
    let animation = true;
    // let animationComplete = false;

    const profiles = {
        octo: {
            name: 'Octo',
            age: '???',
            gender: '???',
            location: '???',
            notes: []
        },
        saury: {
            name: 'Saury',
            age: '???',
            gender: '???',
            location: '???',
            notes: []
        },
        starfish: {
            name: 'Starfish',
            age: '???',
            gender: '???',
            location: '???',
            notes: []
        },
        bream: {
            name: 'Bream',
            age: '???',
            gender: '???',
            location: '???',
            notes: []
        }
    }

    const analysis = {
        end0: {
            en: "<span>I</span> only joined the company recently so I can't say too much about how impactful the change was, but <span>not having to worry about language differences is really nice.</span>",
            jp: "<span>私</span>は入社したばかりなのでどう変わったかは話せないですけれど、<span>言語の壁を気にしなくていいのは便利ですわね。</span>"
        },
        end1: {
            en: "I have friends I met when I was studying abroad. My English isn't too good because <span>I</span> was only there for a few months.",
            jp: "海外留学してた頃に出会った友達がいるから。数ヶ月しかいなかったから<span>俺</span>の英語はそんなに上手くないんだよね。"
        },
        end2: {
            en: "Well you won't have a bad time in Tokyo, <span>there's anything here.</span>",
            jp: "東京に来るといいよ、ここなら<span>なんでもあるさかい。</span>"
        }
    }

    let activeClues = ['octo'];
    let clueOnDisplay = 0;
    let clueID;

    getData();

    async function getData() {
        const list = await fetch('dialogue.json');
        const data = await list.json();
        const values = Object.values(data);
        console.log(values);
        dialogues = values;
    }

    document.addEventListener("DOMContentLoaded", (event) => {
    // gsap code here!
        gsap.registerPlugin(SplitText);

        const boarding = document.querySelector('#boarding');
        const letter = document.querySelector('#letter');
        const target = document.querySelector('#view-target');
        const enter = document.querySelector('#enter');
        const dialogue = document.querySelector('#dialogue');
        const next = document.querySelector('#next');
        const chara = document.querySelector('#chara img');
        const line = document.querySelector('#speech p');
        const interaction = document.querySelector('#interaction');
        const options = document.querySelector('#options');
        const dialogue1 = document.querySelector('#dialogue1');
        const dialogue2 = document.querySelector('#dialogue2');
        const fullChara = document.querySelector('#full-chara');
        const profImage = document.querySelector('#profImage');
        const profName = document.querySelector('#profName');
        const profAge = document.querySelector('#profAge');
        const profGender = document.querySelector('#profGender');
        const profLoc = document.querySelector('#profLoc');
        const profNotes = document.querySelector('#profNotes');
        const clues = document.querySelector('#viewClues');
        const analysis1 = document.querySelector('#analysis1');
        const analysis2 = document.querySelector('#analysis2');
        // let optionsActive = false;
        let split;

            document.querySelector('form').addEventListener('submit', function(event){
            const name = document.querySelector('#name');
            event.preventDefault();
            // console.log(name.value);
            username = name.value;
            boarding.className = 'off';
            document.querySelector('#letter p').innerHTML = `Hello Detective ${username},<br><br>We received intel about a potential terrorism that could disrupt global networks. We are in search of a few people with important information that might be able to help us stop this. We need you to dive into Pangaea and help identify one of these people. We have a list of Pangaea users we believe to be our target, and we want you to talk to these users and match their identity with our target.`
            letter.removeAttribute('class');
            gsap.from('#letter p', {opacity:0, y: 500, duration:0.8});
            gsap.from('#avatar', {opacity:0, y: 500, duration:0.8, delay:0.7});
        })

        document.querySelector('#t-prof').addEventListener('click', function(){
            target.removeAttribute('class');
            gsap.from('#view-target', {opacity:0, duration:0.8});
        });

        document.querySelector('#close').addEventListener('click', function(){
            gsap.fromTo('#view-target', {opacity:1}, {opacity:0, duration:0.8});

            setTimeout(function(){
                target.className = 'off';
                checkedProf = true;
                enter.className = 'btn';
                enter.style.color = '#e8f0fc';
            },800);
            
        });

        enter.addEventListener('click', function(){
            if (checkedProf) {
                document.querySelector('body').style.backgroundColor = '#366bb4';
                letter.className = 'off';
                line.style.opacity = 0;

                setTimeout(function(){
                    dialogue.removeAttribute('class');
                    gsap.from('#dialogue', {opacity:0, y:500, duration:0.8});
                    setTimeout(function(){
                        line.style.opacity = 1;
                        animateText();
                    }, 800);
                },1500);
                
            }
        });

        next.addEventListener('click', switchDialogue);

        function switchDialogue(){
            // console.log('next');

            // line.innerHTML = 'This is all I have right now'

            // console.log('switch dialogue');
            afterAnimation();
            
            sceneControl(dialogueID);

            checkClue(dialogueID);
            
            displayControl(dialogueID);
            

            for (let i=0; i<dialogues.length; i++) {
                // console.log(i);
                // console.log(dialogues[i].id)
                if (dialogues[i].id === dialogueID) {
                    theDialogue = i; 
                    // console.log(dialogues[theDialogue].id); 
                }
            }

            // console.log(dialogueID);
            // console.log(dialogues[dialogueNum].script);
            // console.log(dialogues[theDialogue].script);

            if ((dialogueID === 'octo0' || dialogueID === 'saury0' || dialogueID === 'starfish0' || dialogueID === 'bream0') && chosenOption === 1) {
                // console.log('hello?')
                line.innerHTML = "Let's try asking them something else";
            } else {
                line.innerHTML = dialogues[theDialogue].script;
            }

            console.log(dialogues[theDialogue].script);
            
            if (animation) {
                animateText();
            }
            

            chara.src = `images/${dialogues[theDialogue].char}.jpg`;
            document.querySelector('#charaName').innerHTML = dialogues[theDialogue].char;
            if (dialogues[theDialogue].char === 'jelly') {
                document.querySelector('#charaName').innerHTML = username;
            }
            
        }

        function animateText() {
            // animationComplete = false;

            split = SplitText.create(line, {type: "words"});

            gsap.from(split.words, {
                duration: 0.5,
                y:0,
                autoAlpha: 0,
                stagger: 0.05,
                onComplete: () => afterAnimation(),
            });
        }

        function afterAnimation() {
            split.revert();
            console.log('animation done');
            // animationComplete = true;

            // if (d1active || d2active) {
            //     options.remove
            // }
        }

        const sceneControl = (id) => {
            if (id === 'entry1') {
                section = 'octo';
                // section = saveSection;
                dialogueNum = 0;
            } else if (dialogueNum === 3 && chosenOption === 1) {
                // console.log('this is working')
                dialogueNum = 0;
                next.className = 'off';
                options.removeAttribute('class');
                // optionsActive = true;
                section = saveSection;
            } else if (dialogueNum === 3 && chosenOption === 2) {
                chosenOption = 0;
                dialogueNum = 0;
                switchScene();
            } else if (id === 'bridge6') {
                section = 'end';
                dialogueNum = 0;
            } else {
                dialogueNum++;
                // console.log('switching dialogue');
            }

            dialogueID = `${section}${dialogueNum}`;
            // console.log(dialogueID);
        }

        const displayControl = (id) => {
            if (id === 'octo0') {
                interaction.removeAttribute('class');
                options.removeAttribute('class');
                // optionsActive = true;
                if (chosenOption === 0) {
                    animateCharaSwitch();
                }
                next.className = 'off';
                console.log(activeClues);
                updateProf(saveSection);
            } else if (id === 'saury1') {
                profImage.src = `images/saury.jpg`;
                fullChara.src = `images/saury.svg`;
                
                activeClues.push('saury');
                console.log(activeClues);
                switchChara();
                if (chosenOption === 0) {
                    animateCharaSwitch();
                }
            } else if (id === 'starfish1') {
                profImage.src = 'images/starfish.jpg';
                fullChara.src = 'images/starfish.svg';
                activeClues.push('starfish');
                console.log(activeClues);
                switchChara();
                if (chosenOption === 0) {
                    animateCharaSwitch();
                }
            } else if (id === 'bream1') {
                profImage.src = 'images/bream.jpg';
                fullChara.src = 'images/bream.svg';
                activeClues.push('bream');
                console.log(activeClues);
                switchChara();
                if (chosenOption === 0) {
                    animateCharaSwitch();
                }
            } else if (id === 'bridge0' ) {
                gsap.fromTo('#interaction', {opacity:1}, {opacity:0, duration:0.8});
                setTimeout(function(){
                    interaction.className = 'off';
                }, 800);
            } else if (id === 'bridge1' || id === 'end3') {
                highlights = true;
                updateClues('octo');
                clues.className = 'under';
                document.querySelector('#closeClues').className = 'off';
                interaction.className = 'off';
                gsap.from('#viewClues', {opacity:0, duration:1});
            } else if (id === 'end0') {
                interaction.style.opacity = '1';
                interaction.removeAttribute('class');
                clues.className = 'off';
                fullChara.className = 'off';
                analysis1.className = 'analysisBox';
                analysis2.className = 'analysisBox';
                saveSection = 'octo';
                highlights = false;
                updateProf(saveSection);
                profImage.src = 'images/octo.jpg';
                animateCharaSwitch();
            } else if (id === 'end1') {
                saveSection = 'starfish';
                profImage.src = 'images/starfish.jpg';
                updateProf(saveSection);
                animateCharaSwitch();
            } else if (id === 'end2') {
                saveSection = 'bream';
                profImage.src = 'images/bream.jpg';
                updateProf(saveSection);
                animateCharaSwitch();
            } else if (id === 'end5') {
                endSeq();
            }

            if (section === 'end' && dialogueNum < 3) {
                analysis1.innerHTML = `<p>English: ${analysis[id].en}</p>`;
                analysis2.innerHTML = `<p>Original: ${analysis[id].jp}</p>`;
            }
        }

        function animateCharaSwitch() {
            gsap.from('#chara-container', {opacity:0, x:-500, duration: 0.8});
            gsap.from('#interaction .prof', {opacity: 0, x: 500, duration:0.8});
        }

        function switchChara() {
            options.removeAttribute('class');
            // optionsActive = true;

            next.className = 'off';
            d1active = true;
            d2active = true;
            dialogue1.className = 'active';
            dialogue2.className = 'active';
            updateProf(saveSection);
        }

        
        function switchScene() {
            console.log('move on to next character');

            switch (saveSection) {
                case 'octo': 
                    section = 'saury';
                    break;
                case 'saury':
                    section = 'starfish';
                    break;
                case 'starfish':
                    section = 'bream';
                    break;
                case 'bream':
                    section = 'bridge';
                    break;
            }

            saveSection = section;
            // console.log(section);
        }

        dialogue1.addEventListener('click', function(){
            afterAnimation()

            if (d1active) {
                saveSection = section;
                section = `${saveSection}one`;
                chosenOption++;

                next.className = 'btn';
                options.className = 'off';
                // optionsActive = false;

                d1active = false;
                dialogue1.className = 'inactive';

                dialogueNum = -1;
                animation = false;
                switchDialogue();

                chara.src = 'images/jelly.jpg';
                document.querySelector('#charaName').innerHTML = username;

                line.innerHTML = "I'm new to this place, can I ask what you use Pangaea for?";
                animateText();
                animation = true;
            } 
        });

        dialogue2.addEventListener('click', function(){
            afterAnimation()

            if (d2active) {
                saveSection = section;
                section = `${saveSection}two`;
                chosenOption++;

                next.className = 'btn';
                options.className = 'off';
                // optionsActive = false;

                d2active = false;
                dialogue2.className = 'inactive';

                dialogueNum = -1;
                animation = false;
                switchDialogue();

                chara.src = 'images/jelly.jpg';
                document.querySelector('#charaName').innerHTML = username;


                line.innerHTML = "I've been wanting to travel to Japan, do you have any place to recommend?";
                animateText();
                animation = true;
            }       
        });

        const updateProf = (section) => {
            // switch (section) {
            //     case 'octo': sectionNum = 0; break;
            //     case 'saury': sectionNum = 1; break;
            //     case 'starfish': sectionNum = 2; break;
            //     case 'bream': sectionNum = 3; break;
            // }
            
            // console.log(profiles[section]);

            profName.innerHTML = profiles[section].name;
            profAge.innerHTML = `Age: ${profiles[section].age}`;
            profGender.innerHTML = `Gender: ${profiles[section].gender}`;
            profLoc.innerHTML = `Location: ${profiles[section].location}`;

            profNotes.innerHTML = '';
            profiles[section].notes.forEach(function(eachNote){
                profNotes.innerHTML += `<li>${eachNote}</li>`;
            })
        }

        const checkClue = (id) => {
            profGender.removeAttribute('class');
            profLoc.removeAttribute('class');
            profAge.removeAttribute('class');
            // console.log(id);

            switch (id) {
                case 'octoone1':
                    profAge.className = 'highlightY';
                    // updateProf(saveSection);
                    next.className = 'off';
                    ageActive = true;
                    break;
                case 'octoone3':
                    profNotes.innerHTML += "<li class='highlightY'>???</li>";
                    // updateProf(saveSection);
                    next.className = 'off';
                    notesActive = true;
                    break;
                case 'octotwo3':
                    profLoc.className = 'highlightY';
                    // updateProf(saveSection);
                    next.className  = 'off';
                    locationActive = true;
                    break;
                case 'sauryone3':
                    profAge.className = 'highlightY';
                    next.className = 'off';
                    ageActive = true;
                    break;
                case 'saurytwo1':
                    profLoc.className = 'highlightY';
                    next.className = 'off';
                    locationActive = true;
                    break;
                case 'starfishone3':
                    profNotes.innerHTML += "<li class='highlightY'>???</li>";
                    next.className = 'off';
                    notesActive = true;
                    break;
                case 'starfishtwo3':
                    profLoc.className = 'highlightY';
                    // updateProf(saveSection);
                    next.className  = 'off';
                    locationActive = true;
                    break;
                case 'breamone3':
                    profAge.className = 'highlightY';
                    next.className = 'off';
                    ageActive = true;
                    break;
                case 'breamtwo3':
                    profLoc.className = 'highlightY';
                    next.className = 'off';
                    locationActive = true;
                    break;
                case 'end0':
                case 'end1':
                    profGender.className = 'highlightY';
                    next.className = 'off';
                    genderActive = true;
                    break;
                case 'end2':
                    profLoc.className = 'highlightY';
                    next.className = 'off';
                    locationActive = true;
                    break;
            }
        }

        profAge.addEventListener('click', function(){
            if (ageActive) {
                afterAnimation()

                switch (dialogueID) {
                    case 'octoone1':
                        // console.log(profiles.octo.age);
                        profiles.octo.age = 'is at a working age';
                        // console.log(profiles.octo.age);
                        break;
                    case 'sauryone3':
                        profiles.saury.age = 'still in school';
                        break;
                    case 'breamone3':
                        profiles.bream.age = 'is at a working age';
                        profiles.bream.notes.push('<strong>Seems to have graduated school in the past few years since Pangaea was released</strong>');
                        break;
                }

                // console.log(profiles[saveSection]);
                updateProf(saveSection);
                next.className = 'btn';
                ageActive = false;
            }
        });

        profLoc.addEventListener('click', function(){
            if (locationActive) {
                afterAnimation()

                switch(dialogueID) {
                    case 'octotwo3':
                        profiles.octo.location = 'cannot narrow down';
                        profiles.octo.notes.push('Not a Kyoto resident, but has relatives there');
                        // console.log('this is working');
                        break;
                    case 'saurytwo1':
                        profiles.saury.location = 'Tokyo';
                        break;
                    case 'starfishtwo3':
                        profiles.starfish.location = 'cannot narrow down';
                        profiles.starfish.notes.push('Has made a trip to Okinawa once');
                        profiles.starfish.age = 'is at a working age';
                        break;
                    case 'breamtwo3':
                        profiles.bream.location = 'Tokyo';
                        profiles.bream.notes.push('Currently located in Tokyo, birthplace unsure');
                        break;
                    case 'end2':
                        profiles.bream.notes.push('<em>Originally from western region of Japan</em>');
                        break;
                }

                updateProf(saveSection);
                profLoc.removeAttribute('class');
                next.className = 'btn';
                locationActive = false;
            }
            
        });

        profGender.addEventListener('click', function(){
            if (genderActive) {
                afterAnimation()

                switch(dialogueID) {
                    case 'end0':
                        profiles.octo.gender = 'Female';
                        break;
                    case 'end1':
                        profiles.starfish.gender = 'Male';
                        break;
                }

                updateProf(saveSection);
                profGender.removeAttribute('class');
                genderActive = false;
                next.className = 'btn';
            }
        });

        profNotes.addEventListener('click', function(){
            if (notesActive) {
                afterAnimation()

                switch(dialogueID) {
                    case 'octoone3':
                        profiles.octo.notes.push('<strong>Could be a recent college graduate</strong>');
                        break;
                    case 'starfishone3':
                        profiles.starfish.notes.push('<strong>Has studied abroad in the past</strong>');
                        break;
                }

                updateProf(saveSection);
                document.querySelectorAll('#profNotes li').forEach(function(eachNote){
                    eachNote.removeAttribute('class');
                })
                // profNotes.forEach(function(note){
                //     note.removeAttribute('class');
                // });
                notesActive = false;
                next.className = 'btn';
                console.log('this is working');
            }
        });

        document.querySelector('#check').addEventListener('click', function(){
            clues.className = 'over';
            gsap.from('#viewClues', {opacity:0, duration:0.5});
            document.querySelector('#closeClues').className = 'btn';

            clueID = activeClues[clueOnDisplay];
            // console.log(clueID);
            updateClues(clueID);
        });

        document.querySelector('#left').addEventListener('click', function(){
            if (clueOnDisplay === 0) {
                clueOnDisplay = activeClues.length - 1;
            } else {
                clueOnDisplay--;
            }
            clueID = activeClues[clueOnDisplay];
            updateClues(clueID);
        });

        document.querySelector('#right').addEventListener('click',function(){
            if (clueOnDisplay === (activeClues.length -1)) {
                clueOnDisplay = 0;
            } else {
                clueOnDisplay++;
            }
            clueID = activeClues[clueOnDisplay];
            updateClues(clueID);
        });

        const updateClues = (id) => {
            document.querySelector('#clueName').innerHTML = profiles[id].name;
            // console.log(profiles[id].name);
            document.querySelector('#clueAge').innerHTML = `Age: ${profiles[id].age}`;
            document.querySelector('#clueGender').innerHTML = `Gender: ${profiles[id].gender}`;
            document.querySelector('#clueLocation').innerHTML = `Location: ${profiles[id].location}`;
            const clueNotes = document.querySelector('#clueNotes');
            clueNotes.innerHTML = '';
            profiles[id].notes.forEach(function(eachNote){
                clueNotes.innerHTML += `<li>${eachNote}</li>`;
            });
            document.querySelector('#clueImage').src = `images/${id}.jpg`;

            document.querySelector('#clueAge').removeAttribute('class');
            document.querySelector('#clueLocation').removeAttribute('class');
            document.querySelector('#clueGender').removeAttribute('class');

            if (highlights) {
                

                switch (id) {
                    case 'octo':
                        document.querySelector('#clueAge').className = 'highlightG';
                        // clueNotes.className = 'highlightG';
                        break;
                    case 'saury':
                        document.querySelector('#clueAge').className = 'highlightR';
                        document.querySelector('#clueLocation').className = 'highlightG';
                        break;
                    case 'starfish':
                        document.querySelector('#clueAge').className = 'highlightG';
                        break;
                    case 'bream':
                        document.querySelector('#clueAge').className = 'highlightG';
                        break;
                }

                document.querySelectorAll('strong').forEach(function(eachNote){
                    eachNote.style.backgroundColor = 'rgb(182, 239, 97)';
                });

                if (section === 'end') {
                    switch (id) {
                        case 'octo':
                            document.querySelector('#clueGender').className = 'highlightR';
                            break;
                        case 'starfish':
                            document.querySelector('#clueGender').className = 'highlightG';
                            break;
                        case 'bream':
                            document.querySelector('#clueLocation').className = 'highlightR';
                            // document.querySelector('em').style.backgroundColor = 'rgb(234, 86, 86)';
                            break;
                    }
                }
            }
        }

        document.querySelector('#closeClues').addEventListener('click', function(){
            clues.className = 'off';
        });
        

        function endSeq() {
            dialogue.className = 'off';
            clues.className = 'off';
            const ending = document.querySelector('#ending');
            document.querySelector('body').style.backgroundColor = '#696969';

            ending.removeAttribute('class');

            setTimeout(function(){
                ending.className = 'off';
                

                letter.removeAttribute('class');
                letter.innerHTML = `<p>Hello Detective ${username},<br><br>Thanks to your inputs, we were able to prevent the potential terrorism from causing any harm. With technology giving us better tools for global communication, we're glad that you were able to look at what's hidden behind simple translations to communicate with a deeper understanding of language.</p>`
                letter.innerHTML += '<div id=lbtn><div id="restart" class="btn">The end</div></div>';

                gsap.from('#letter p', {opacity:0, y:500, duration:0.8});

                document.querySelector('#restart').addEventListener('click', function(){
                    location.reload();
                });
            } ,2000);
        }
    });
    
    // document.querySelector('#start').addEventListener('click', function(){
    //     boarding.className = 'off';
    //     letter.removeAttribute('class');
    // });
})();