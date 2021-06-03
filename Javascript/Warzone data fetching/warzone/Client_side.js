// INPUT
const gamertagInput = document.getElementById('name');
// TEXT 
const gamertagDisplay = document.getElementById('gamertag');
const level = document.getElementById('level');
const kdText = document.getElementById('kd');
const kills = document.getElementById('kills');
const deaths = document.getElementById('deaths');
const downs = document.getElementById('downs');
const revives = document.getElementById('revives');
const top25 = document.getElementById('top25');
const top10 = document.getElementById('top10');
const top5 = document.getElementById('top5');
const wins = document.getElementById('win'); 
const playedGames = document.getElementById('gamesPlayed');
const timeWasted = document.getElementById('time');
// BUTTONS
const button = document.getElementById('button');
const battleButton = document.getElementById('Battle');
const psnButton = document.getElementById('PSN');
// DATA VALUES
let gamertag = null;
let platform = null;
let battle = false;
let psn = false;
let actv = false;

async function sendData(gamertag=null){
    let platform = null;
    if (battle){
        platform = 'battle';
    } else if (psn) {
        platform = 'psn';
    } else if (platform==null){
        platform = 'acti'
    }
    else{
        throw 'DINDNT SELECT A PLATFORM';
    }
    const data = {tag : gamertag, plat : platform};
    const options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data) 
    }
    const response = await fetch('/api', options);
    const datas = await response.json();
    return datas;
}   

button.onclick = async function () {
    if (!battle & !psn){throw 'DINDNT SELECT A PLATFORM';} 
    gamertag = gamertagInput.value;
    if (gamertag == "" || gamertag == null){ throw 'NO PLAYER GIVEN';}
    const data = await sendData(gamertag);
    placeNumbers(data);
}

gamertagInput.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        button.click();
       }
})

battleButton.onclick = function (){
    battle = true;
    psn = false;
    console.log(battle , psn);
}

psnButton.onclick = function (){
    battle = false;
    psn = true;
    console.log(battle , psn);
}

function calculateKD(data) {
    let kd = Number(parseFloat(data.lifetime.mode.br.properties.kdRatio));
    let kd_string = kd.toFixed(2);
    kd = Number(kd_string);
    return kd;
}

function placeNumbers(data) {
    let username = String(data.username);
    gamertagDisplay.innerHTML = username.toUpperCase();
    let prestigeValue = data.prestige;
    if (prestigeValue == 3){
        level.innerHTML = 100 + parseInt(data.level);
    } else if (prestigeValue == 2){
        level.innerHTML = 50 + parseInt(data.level);
    } else {
        level.innerHTML = data.level;
    }
    kdText.innerHTML = calculateKD(data);
    kills.innerHTML = data.lifetime.mode.br.properties.kills;
    deaths.innerHTML = data.lifetime.mode.br.properties.deaths;
    downs.innerHTML = data.lifetime.mode.br.properties.downs;
    revives.innerHTML = data.lifetime.mode.br.properties.revives;
    top25.innerHTML = data.lifetime.mode.br.properties.topTwentyFive;
    top10.innerHTML = data.lifetime.mode.br.properties.topTen;
    top5.innerHTML = data.lifetime.mode.br.properties.topFive;
    wins.innerHTML = data.lifetime.mode.br.properties.wins;
    playedGames.innerHTML = data.lifetime.mode.br.properties.gamesPlayed;
    let playedTime = parseFloat(data.lifetime.mode.br.properties.timePlayed);
    const days = Math.floor(playedTime / 3600 / 24);
    const hours = Math.floor(playedTime / 3600) % 24;
    const mins = Math.floor(playedTime / 60) % 60;
    timeWasted.innerHTML = days + "D " + hours + "h " + mins + "min";
}