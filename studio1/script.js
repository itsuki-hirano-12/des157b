(function(){
    'use strict';
    console.log('reading js');

    const body = document.querySelector('body');
    const pour = document.querySelector('#pour');
    const vidEmpty = document.querySelector('#empty');
    const vidFull = document.querySelector('#full');
    const fs = document.querySelector('#fs');
    const pause = document.querySelector('#pause');

    let empty = true;
    let playing = true;

    

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


}());