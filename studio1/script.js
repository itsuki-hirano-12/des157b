(function(){
    'use strict';
    console.log('reading js');

    const body = document.querySelector('body');
    const pour = document.querySelector('#pour');
    const vidEmpty = document.querySelector('#empty');
    const vidFull = document.querySelector('#full');
    const fs = document.querySelector('#fs');
    const pause = document.querySelector('#pause');
    const text1 = document.querySelector('#text1');
    const text2 = document.querySelector('#text2');
    const text3 = document.querySelector('#text3');
    const text4 = document.querySelector('#text4');

    let empty = true;
    let playing = true;

    const intervalID = setInterval(checkTime, 500);

    const texts = {
        item: [text1, text2, text3, text4],
        emptyTime: [8, 10, 12, 15, 24],
        fullTime: [14, 16, 18, 20, 26]
    }

    function checkTime() {
        for (let i=0; i<texts.item.length; i++) {
            if (empty) {
                if (texts.emptyTime[i] > vidEmpty.currentTime || texts.emptyTime[4] < vidEmpty.currentTime) {
                    texts.item[i].className = 'hide';
                    texts.item[i].style.transform = 'translateX(-100%) scale(1)';
                } else if (texts.emptyTime[i] < vidEmpty.currentTime && texts.emptyTime[i+1] > vidEmpty.currentTime) {
                    texts.item[i].className = 'onScreen';
                    texts.item[i].style.transform = 'translateX(0)';
                } else if (texts.emptyTime[i+3] < vidEmpty.currentTime && i < 1) {
                    texts.item[i].style.transform = 'translateY(-330%) scale(0.8)';
                } else if (texts.emptyTime[i+2] < vidEmpty.currentTime && i < 2) {
                    texts.item[i].style.transform = 'translateY(-250%) scale(0.8)';
                } else if (texts.emptyTime[i+1] < vidEmpty.currentTime && i < 3) {
                    texts.item[i].style.transform = 'translateY(-150%) scale(0.9)';
                } 
                // else {
                //     texts.item[i].className = 'hidden'; 
                // }
            } else {
                if (texts.fullTime[i] > vidFull.currentTime || texts.emptyTime[4] < vidFull.currentTime) {
                    texts.item[i].className = 'hide';
                    texts.item[i].style.transform = 'translateX(-100%) scale(1)';
                } else if (texts.fullTime[i] < vidFull.currentTime && texts.fullTime[i+1] > vidFull.currentTime) {
                    texts.item[i].className = 'onScreen';
                    texts.item[i].style.transform = 'translateX(0)';
                } else if (texts.fullTime[i+3] < vidFull.currentTime && i < 1) {
                    texts.item[i].style.transform = 'translateY(-330%) scale(0.8)';
                } else if (texts.fullTime[i+2] < vidFull.currentTime && i < 2) {
                    texts.item[i].style.transform = 'translateY(-250%) scale(0.8)';
                } else if (texts.fullTime[i+1] < vidFull.currentTime && i < 3) {
                    texts.item[i].style.transform = 'translateY(-150%) scale(0.9)';
                } 
            }
        }
    }
    
    pour.addEventListener('click', function(){
        if (empty) {
            vidEmpty.className = 'hidden';
            vidFull.className = 'showing';
            vidFull.currentTime = 0;
            empty = false;
            pour.innerHTML = '<i class="fa-solid fa-arrow-rotate-right"></i>'
             
            vidFull.play();
        } else {
            vidEmpty.className = 'showing';
            vidFull.className = 'hidden';
            vidEmpty.currentTime = 0;
            empty = true;
            pour.innerHTML = '<i class="fa-solid fa-droplet"></i>';

            vidEmpty.play();
        }

        playing = true;
    });

    fs.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            body.className = 'full';
            fs.innerHTML = '<i class="fa-solid fa-down-left-and-up-right-to-center"></i>';
        } else {
            document.exitFullscreen();
            body.className = 'small';
            fs.innerHTML = '<i class="fa-solid fa-up-right-and-down-left-from-center"></i>'
        }
    });

    pause.addEventListener('click', function(){
        if (playing) {
            if (empty) {
                vidEmpty.pause();
            } else {
                vidFull.pause();
            }
            playing  = false;
            pause.innerHTML = '<i class="fa-solid fa-play"></i>'
        } else {
            if (empty) {
                vidEmpty.play();
            } else {
                vidFull.play();
            }
            playing = true;
            pause.innerHTML = '<i class="fa-solid fa-pause"></i>'
        }
    });

    document.addEventListener('keydown', function(event){
        // this doesn't work
        if (event.key === 'Escape') {
            event.preventDefault();
            
            body.className = 'small';
            fs.innerHTML = '<i class="fa-solid fa-up-right-and-down-left-from-center"></i>';
            document.exitFullscreen();
        }
    })


}());