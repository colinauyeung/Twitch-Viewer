require('dotenv').config()
const tmi = require("tmi.js")

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue} = require("firebase/database");
const { write } = require('original-fs');
const linkPreviewGenerator = require("link-preview-generator");

async function getlinkpreview(link){
    let bits = link.split(":");
    if(bits.length < 1){
        return null;
    }
    if(bits[0] === "http" || bits[0] == "https"){
        const previewData = await linkPreviewGenerator(link);
        var box = document.createElement("div");
        box.className = "previewbox";
        var image = document.createElement("img");
        image.src = previewData.img;
        image.className = "previewimg";
        var text = document.createElement("div");
        text.className = "previewtext";
        var title = document.createElement("h3");
        title.className = "previewtitle";
        title.innerHTML = previewData.title;
        var description = document.createElement("p");
        description.className = "previewdescription";
        description.innerHTML = previewData.description;

        text.appendChild(title);
        text.appendChild(description);
        box.appendChild(image);
        box.appendChild(text);
        return box;
    }
    return null;
    

}

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

var latency = 0;
var latvals = []

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
    // var timer = player.getPlaybackStats().hlsLatencyBroadcaster
    // var timeout = setTimeout(()=>{
    //     console.log(message);
    // }, (timer+1)*1000);
    
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

    let bits = message.split(" ");
    if(bits.length > 1){
      if(bits[0].toLowerCase() === '!a') {
        let newValue = {name:tags.username, message:bits[1]};
        console.log(newValue)
        //broken, need to function async
        var timestamp = Date.now();
        // eval(`console.log('${newValue.message}')`)
        eval(`getlinkpreview('${newValue.message}')`
        + ".then(function(preview){"
        +   "if(preview != null){"
        +       `let diff = Date.now() - ${timestamp};`
        +       "setTimeout(()=>{"
        +           "let text = document.getElementById(\"text887\");"
        +           "text.insertBefore(preview, text.firstChild);"
        +           "if(text.childNodes.length > 5){"
        +               "text.removeChild(text.lastChild);"
        +           "}"
        +       `}, ((${latency}+0.75)*1000)-diff)}});`)
            // +    "}}});")
        // getlinkpreview(newValue.message)
        // .then(function(preview){
        //     if(preview != null){
        //         let diff = Date.now() - timestamp;
        //         setTimeout(() =>{
        //             let text = document.getElementById("text887");
        //             text.appendChild(preview);
        //             if(text.childNodes.length > 5){
        //                 text.removeChild(text.firstChild);
        //             }
        //         }, ((latency+0.75)*1000)-diff)
        //     }
        // });
  
        // client.say(channel, `@${tags.username}, Yo what's up`);
  
      }
      if(bits[0].toLowerCase() === "!b"){
        windowManager.sharedData.set("chat502", {name:tags.username, message:bits[1]});
      }
    }
});

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}




var inter = setInterval(()=>{
    var time = player.getPlaybackStats().hlsLatencyBroadcaster
    if(time === 0){
        return;
    }
    latvals.push(time);
    if(latvals.length > 30){
        latvals.shift();
    }
    let avg = 0;
    latvals.forEach((value, index)=>{
        avg = avg + value;
    })
    avg = avg/latvals.length;
    latency = avg;
    // console.log(avg);
}, 500)

const cup502db = ref(db, 'position/cup502');
onValue(cup502db, (snapshot) => {
  const data = snapshot.val();
  var ball = document.getElementById("cup502");
  let x = data.x - 25;
  let y = data.y - 25;
  console.log(data)
  var timer = player.getPlaybackStats().hlsLatencyBroadcaster
  var timeout = setTimeout(()=>{
    setTranslate(x, y, ball);
  }, (latency+0.75)*1000);
  
//   console.log(data);
});

const cup887db = ref(db, 'position/cup887');
onValue(cup887db, (snapshot) => {
  const data = snapshot.val();
  var ball2 = document.getElementById("cup887");
  let x = data.x - 25;
  let y = data.y - 25 - (50*1);
  console.log(data)
  var timer = player.getPlaybackStats().hlsLatencyBroadcaster
  var timeout = setTimeout(()=>{
    setTranslate(x, y, ball2);
  }, (latency+0.75)*1000);
  
//   console.log(data);
});