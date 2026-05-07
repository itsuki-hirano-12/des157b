(function(){
    'use strict';
    console.log('reading js');

    

    Parse.initialize("92TMCVh69LQ397HuHKq9i8unjBu5eTaHCaHxphsI", "UkIPPA5BOtZ4nau7Fu8MmUg0pPNsE7hk1tssWjrq"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";

    const wordList = document.querySelector('#words');
    const en = document.querySelector('#en');
    const world = document.querySelector('#world');
    const auto = document.querySelector('#auto');
    let autoPlay = true;
    let autoTime;
    const newWord = document.querySelector('#newWord');
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input[type=text]');


    document.addEventListener('click', function(event){
        if (event.target.className === 'hide-form' ||event.target.closest('.hide-form')) {
            newWord.className = 'display-form';    
        } else if (event.target.id === 'close' || event.target.closest('#close')) {
            newWord.className = 'hide-form';
        }
    });





    document.addEventListener("DOMContentLoaded", (event) => {
        gsap.registerPlugin(SplitText);
        // gsap code here!

        auto.addEventListener('click', function(){
            autoPlay = true;
            world.removeAttribute('class');
            en.removeAttribute('class');
            auto.className = 'active';
            clearTimeout(autoTime);
            displayWords();
        });

        en.addEventListener('click', function(){
            wordList.className = 'eng';
            world.removeAttribute('class');
            auto.removeAttribute('class');
            en.className = 'active';
            autoPlay = false;
            clearTimeout(autoTime);
            displayWords();
        });

        world.addEventListener('click', function(){
            wordList.className = 'anyLang';
            auto.removeAttribute('class');
            en.removeAttribute('class');
            world.className = 'active';
            autoPlay = false;
            clearTimeout(autoTime);
            displayWords();
        });

        form.addEventListener('submit', function(event){
            event.preventDefault();
            addWord();
        });

        async function addWord() {
            const newWord = {};

            for(let i=0; i<inputs.length; i++) {
                let key = inputs[i].getAttribute('name');
                let value = inputs[i].value;
                newWord[key] = value;
                // console.log(key);
                // console.log(value);
            }

            // console.log(newWord.translation);

            if (newWord.newword != '' && newWord.translation != '') {
                const newWordData = new Parse.Object('Words');
                newWordData.set('word', newWord.newword);
                newWordData.set('translate', newWord.translation);

                try {
                    const result = await newWordData.save();
                    resetFormFields();
                    newWord.className = 'hide-form';
                    clearTimeout(autoTime);
                    displayWords();
                } catch (error) {
                    console.error('Sorry we were unable to add your word!', error);
                }
            } else {
                newWord.className = 'hide-form';
            }
        }

        function resetFormFields() {
            document.querySelector('#new-word').value = '';
            document.querySelector('#translation').value = '';
        }

        async function displayWords() {
            wordList.innerHTML = '';

            const words = Parse.Object.extend('Words');
            const query = new Parse.Query(words);

            const results = await query.descending("createdAt").find();

            results.forEach(function(eachWord) {
                const id = eachWord.id;
                const word = eachWord.get('word');
                const translate = eachWord.get('translate');

                // console.log(translate);

                const listItem = document.createElement('div');
                listItem.setAttribute('id', `r-${id}`);
                listItem.setAttribute('class', 'word')
                
                if (wordList.className === 'anyLang') {
                    listItem.innerHTML = word;
                } else {
                    listItem.innerHTML = translate;
                }

                // console.log(listItem);

                wordList.append(listItem);

                var textwall = new Macy({
                    container: '#words',
                    trueOrder: false,
                    debug: true,
                    columns: 5,
                    margin: {
                        y: 16,
                        x: '2%',
                    }                
                });        
            });

            const allWords = document.querySelectorAll('.word');

            allWords.forEach(function(eachWord) {
                // split elements with the class "split" into words and characters
                let split = SplitText.create(eachWord, { type: "chars" });

                // now animate the characters in a staggered fashion
                gsap.from(split.chars, {
                    duration: 1, 
                    y: "random(-100,100)",
                    rotation: "random(-90, 90)",
                    ease: "power4.Out",
                    autoAlpha: 0, 
                    stagger: {
                        amount: 0.3,
                        from: 'end'
                    },

                    onComplete: () => split.revert() // <-- restores original innerHTML
                });
            })

            // Boolean check needs happen before AND after Timeout for it to not cause an error
            if (autoPlay) {
                // setTimeout(function(){
                //     if (autoPlay) {
                //         if (wordList.className === 'anyLang') {
                //             wordList.className = 'eng';
                //             displayWords();
                //         } else {
                //             wordList.className = 'anyLang';
                //             displayWords();
                //         }
                //     }
                // }, 5000);

                autoTime = setTimeout(function(){
                    if (wordList.className === 'anyLang') {
                        wordList.className = 'eng';
                        displayWords();
                    } else {
                        wordList.className = 'anyLang';
                        displayWords();
                    }
                }, 5000);
            }
        }

        displayWords();   
    });


})();