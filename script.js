onload = function() {
    if ('speechSynthesis' in window) with(speechSynthesis) {


        var playEle = document.querySelector('#play');
        var pauseEle = document.querySelector('#pause');
        var stopEle = document.querySelector('#stop');
        var flag = false;


        playEle.addEventListener('click', onClickPlay);
        pauseEle.addEventListener('click', onClickPause);
        stopEle.addEventListener('click', onClickStop);

        function onClickPlay() {
            if(!flag){
                flag = true;
                utterance = new SpeechSynthesisUtterance(document.querySelector('article').textContent);
                //utterance.lang = 'en-US';
                //utterance.voice = getVoices()[0];
                
                var synth = window.speechSynthesis;
                var voices = synth.getVoices();

                for(i = 0; i < voices.length ; i++) {
                    if(voices[i].name === 'Google UK English Male') {
                      utterance.voice = voices[i];
                    }
                }
                utterance.lang = 'en-US';

                utterance.onend = function(){
                    flag = false; playEle.className = pauseEle.className = ''; stopEle.className = 'stopped';
                };
                playEle.className = 'played';
                stopEle.className = '';
                speak(utterance);
            }
             if (paused) { /* unpause/resume narration */
                playEle.className = 'played';
                pauseEle.className = '';
                resume();
            } 
        }

        function onClickPause() {
            if(speaking && !paused){ /* pause narration */
                pauseEle.className = 'paused';
                playEle.className = '';
                pause();
            }
        }

        function onClickStop() {
            if(speaking){ /* stop narration */
                /* for safari */
                stopEle.className = 'stopped';
                playEle.className = pauseEle.className = '';
                flag = false;
                cancel();

            }
        }

    }

    else { /* speech synthesis not supported */
        msg = document.createElement('h5');
        msg.textContent = "Detected no support for Speech Synthesis";
        msg.style.textAlign = 'center';
        msg.style.backgroundColor = 'red';
        msg.style.color = 'white';
        msg.style.marginTop = msg.style.marginBottom = 0;
        document.body.insertBefore(msg, document.querySelector('div'));
    }

}
