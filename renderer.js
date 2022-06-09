require('dotenv').config()
const tmi = require("tmi.js")

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue} = require("firebase/database");
const { write } = require('original-fs');

const firebaseConfig = {

    apiKey: process.env.firebaseapikey,
    authDomain: "tabletop-tasting.firebaseapp.com",
    projectId: "tabletop-tasting",
    storageBucket: "tabletop-tasting.appspot.com",
    messagingSenderId: process.env.firebasesenderid,
    appId: process.env.firebaseappid,
    measurementId: process.env.firebasemeasurementid
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

var options = {
width: 1280,
height: 720,
channel: "daisuketestbot",
allowfullscreen: false,
layout: "video",
muted: true
};
var player = new Twitch.Embed("test", options);

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: 'daisuketestbot',
        password: process.env.OAUTH
    },
    channels: ['daisuketestbot']
});


var interval = setInterval(()=>{
    console.log(player.getPlaybackStats().hlsLatencyBroadcaster)
}, 2000);

client.connect();

client.on('message', (channel, tags, message, self) => {
// Ignore echoed messages.
    if(self) return;
    //Code if I want to run it on a random chat
    // if(flip){
    //   windowManager.sharedData.set("chat887", {name:tags.username, message:message});
    //   flip = !flip
    // }
    // else{
    //   windowManager.sharedData.set("chat502", {name:tags.username, message:message});
    //   flip = !flip
    // }
    var timer = player.getPlaybackStats().hlsLatencyBroadcaster
    var timeout = setTimeout(()=>{
        console.log(message);
    }, (timer+1)*1000);
    
    // let bits = message.split(" ");
    // if(bits.length > 1){
    //     if(bits[0].toLowerCase() === '!a') {
    //     windowManager.sharedData.set("chat887", {name:tags.username, message:bits[1]});
    //     // client.say(channel, `@${tags.username}, Yo what's up`);

    //     }
    //     if(bits[0].toLowerCase() === "!b"){
    //     windowManager.sharedData.set("chat502", {name:tags.username, message:bits[1]});
    //     }
    // }
});





/*
  if (runtest) {
    log('run test');
    player.addEventListener(Twitch.Embed.VIDEO_READY, function() {
      log('Attempt volumne and unmute');
      player.setVolume(0.1);
      player.setMuted(false);
    });
  }
*/

  // function log(txt, other) {
  //   var sp = document.createElement('div');
  //   sp.textContent = new Date().getTime() + ': ' + txt;

  //   var t = other ? 'logb' : 'log';
  //   document.getElementById(t).prepend(sp);
  // }

  // player.addEventListener(Twitch.Embed.VIDEO_READY, function() {
  //   log('The video is ready');
  // })
  // player.addEventListener(Twitch.Embed.VIDEO_PLAY, function() {
  //   log('The video is playing');
  // })

  // document.getElementById('play').addEventListener('click', (e) => {
  //   log('Attempt Play');
  //   player.play();
  // });
  // document.getElementById('pause').addEventListener('click', (e) => {
  //   log('Attempt Pause');
  //   player.pause();
  // });
  // document.getElementById('volume').addEventListener('click', (e) => {
  //   log('Attempt Volume: ' + document.getElementById('volume_value').value);
  //   var val = parseFloat(document.getElementById('volume_value').value);
  //   player.setVolume(val);
  // });
  // document.getElementById('volume_get').addEventListener('click', (e) => {
  //   log('Attempt Get Volume');
  //   log('Volume ' + player.getVolume());
  // });

  // document.getElementById('mute').addEventListener('click', (e) => {
  //   log('Attempt Mute');
  //   player.setMuted(true);
  // });
  // document.getElementById('unmute').addEventListener('click', (e) => {
  //   log('Attempt UnMute');
  //   player.setMuted(false);
  // });
  // document.getElementById('muted').addEventListener('click', (e) => {
  //   log('Attempt Get muted');
  //   log(player.getMuted());
  // });

  // setInterval(() => {
  //   var status = '';

  //   if (player.isPaused()) {
  //     status += 'Paused ';
  //   } else {
  //     status += 'Playing ';
  //   }

  //   if (player.getMuted()) {
  //     status += 'Muted ';
  //   } else {
  //     status += 'UnMuted ';
  //   }
  //   status += 'Vol: ' + player.getVolume();

  //   status += ' ' + player.getQuality();

  //   document.getElementById('status').textContent = status;
  // }, 250);

  // document.getElementById('change').addEventListener('click', (e) => {
  //   var channel = document.getElementById('channel').value;
  //   log('Change channel ' + channel);
  //   player.setChannel(channel);
  // });

  // document.getElementById('quality_get').addEventListener('click', (e) => {
  //   log('Fetch Quality');
  //   console.log(player.getPlaybackStats());
  // });
  // document.getElementById('qualities_get').addEventListener('click', (e) => {
  //   log('Fetch Qualities');

  //   var target = document.getElementById('quality');
  //   target.textContent = '';

  //   var qol = player.getQualities()
  //   for (var x=0;x<qol.length;x++) {
  //     var opt = document.createElement('option');
  //     opt.value = qol[x].group;
  //     opt.textContent = qol[x].name;
  //     target.append(opt);
  //   }
  // });
  // document.getElementById('quality_change').addEventListener('click', (e) => {
  //   var target = document.getElementById('quality').value;
  //   log('Set quality to ' + target);
  //   player.setQuality(target);
  // });

  // var events = [
  //   Twitch.Player.ENDED,
  //   Twitch.Player.PAUSE,
  //   Twitch.Player.PLAY,
  //   Twitch.Player.PLAYBACK_BLOCKED,
  //   Twitch.Player.PLAYING,
  //   Twitch.Player.OFFLINE,
  //   Twitch.Player.ONLINE,
  //   Twitch.Player.READY
  // ]
  // for (var x=0;x<events.length;x++) {
  //   quickBind(events[x]);
  // }
  // function quickBind(evt) {
  //   player.addEventListener(evt, (e) => {
  //     log('Captured ' + evt, true);
  //   });
  // }

const cup502db = ref(db, 'position/cup502');
onValue(cup502db, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});