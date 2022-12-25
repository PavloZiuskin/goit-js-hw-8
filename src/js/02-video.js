import Player from '@vimeo/player';
var _ = require('lodash');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const KEY_SAVE_SECONDS = 'videoplayer-current-time';
// let seconds = 0;

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  _.throttle(function (currentTime) {
    const seconds = currentTime.seconds;
    localStorage.setItem(KEY_SAVE_SECONDS, JSON.stringify(seconds));
  }, 1000)
);

function onGetItemStartSecond() {
  const startGetSecond = localStorage.getItem(KEY_SAVE_SECONDS);
  const startSecond = JSON.parse(startGetSecond);
  return startSecond || 0;
}

player
  .setCurrentTime(onGetItemStartSecond())
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
