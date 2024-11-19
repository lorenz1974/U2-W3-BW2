// ***********************************************************************//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

const playFunction = (songId) => {
    if (isPlaying) {
        document.getElementById('playControl').classList.remove('d-none');
        document.getElementById('pauseControl').classList.add('d-none');
        isPlaying = false;
        _D(1, `isPlaying : ${isPlaying}`)

        currentSong.pause();
    } else {
        document.getElementById('playControl').classList.add('d-none');
        document.getElementById('pauseControl').classList.remove('d-none');
        isPlaying = true;
        _D(1, `isPlaying : ${isPlaying}`)

        currentSong.play();
    }
}

//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

let shuffleStatus = false;
let repeatStatus = false;
let isPlaying = false;
let currentSong = new Audio('./test/player.mp3');


//
// ***********************************************************************
//
// MAIN ROUTINE
//
// ***********************************************************************
//

//document.addEventListener('DOMContentLoaded', () => {

setTimeout(() => {

    // COntrollo del volume
    const volumeControl = document.getElementById('volumeControl');
    volumeControl.addEventListener("input", () => {
        const volumeValue = volumeControl.value;
        const volume0 = document.getElementById('volume-0');
        const volume25 = document.getElementById('volume-25');
        const volume50 = document.getElementById('volume-50');
        const volume75 = document.getElementById('volume-75');

        if (volumeValue <= .05) {
            volume0.classList.remove('d-none');
            [volume25, volume50, volume75].forEach(vol => vol.classList.add('d-none'));
            _D(1, `volumeValue: ${volumeValue}`)

        } else if (volumeValue <= .35) {
            volume25.classList.remove('d-none');
            [volume0, volume50, volume75].forEach(vol => vol.classList.add('d-none'));
            _D(1, `volumeValue: ${volumeValue}`)

        } else if (volumeValue <= .75) {
            volume50.classList.remove('d-none');
            [volume0, volume25, volume75].forEach(vol => vol.classList.add('d-none'));
            _D(1, `volumeValue: ${volumeValue}`)
        } else {
            volume75.classList.remove('d-none');
            [volume0, volume25, volume50].forEach(vol => vol.classList.add('d-none'));
            _D(1, `volumeValue: ${volumeValue}`)
        }

        currentSong.volume = volumeValue;
    });


    // Evento sullo Shuffle
    const shuffleControl = document.getElementById('shuffleControl');
    shuffleControl.addEventListener('click', () => {
        if (shuffleControl.classList.contains('active')) {
            shuffleControl.classList.remove('active');
            shuffleStatus = false;
            _D(1, `shuffleStatus: ${shuffleStatus}`)
        } else {
            shuffleControl.classList.add('active');
            shuffleStatus = true;
            _D(1, `shuffleStatus: ${shuffleStatus}`)
        }
    })

    // Evento sullo Repeat
    const repeatControl = document.getElementById('repeatControl');
    repeatControl.addEventListener('click', () => {
        if (repeatControl.classList.contains('active')) {
            repeatControl.classList.remove('active');
            repeatStatus = false;
            _D(1, `repeatStatus: ${repeatControl}`)
        } else {
            repeatControl.classList.add('active');
            repeatStatus = true;
            _D(1, `repeatStatus: ${repeatControl}`)
        }
    });

    // Evento sul PLAY
    const playControlContainer = document.getElementById('playControlContainer');
    playControlContainer.addEventListener('click', () => {
        playFunction()
    });

}, 500);

//});