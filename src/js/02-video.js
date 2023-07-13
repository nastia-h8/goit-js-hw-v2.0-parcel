import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = "videoplayer-current-time";

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeUpd, 1000));


function onTimeUpd({seconds}) {
    setItemToLocalStorage(CURRENT_TIME_KEY, JSON.stringify(seconds));
}



const currentTime = JSON.parse(localStorage.getItem(CURRENT_TIME_KEY));

player.setCurrentTime(currentTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});


function setItemToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}