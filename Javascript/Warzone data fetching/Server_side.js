const express = require('express');
const port = 3000;
const server = express();
const API = require('call-of-duty-api')();
const fileSaver = require('fs');
let loggedIn = false;
let userATM = null;
let JSONData = null;

//,'192.168.178.72'

server.listen(port, () => console.log('LISTENING'));
server.use(express.static('warzone'));
server.use(express.json());

server.post('/api', async (request, response) => {
    console.log('RECIEVED A REQUEST');
    console.log(request.ip)
    console.log(request.body);
    const data = request.body;  
    JSONData = data;
    const warzoneData = await callMethods(data.tag, data.plat);
    response.json(warzoneData);
})

async function login(){
    try {
        await API.login( 
            "USERNAME@WEBPROVIDER.COM", 
            "PASSWORD"); 
        loggedIn = true;
        console.log("LOGGEGD IN");
     } catch(Error) {
        console.log("Error: " + Error)
     }
}


async function getWarzoneData(user = null, platform = null){
    if (!loggedIn){await login();};
    if (user == null || platform == null){return}
    try {
        let data = await API.MWwz(user, platform);;
        dataString = JSON.stringify(data, null, 2);
        return data;
     } catch(Error) {
         //Handle Exception
         console.log("Error: " + Error);
     }
}

async function getPlayedGamesData(user = null, platform = null){
    if (!loggedIn){await login();};
    if (user == null || platform == null){return}
    try{
        let data = await API.MWcombatwz('jalapa#2527', 'battle');
        return data;
    } catch(Error) {
        console.log("Error: " + Error);
    }
}

async function weeklyStats(user=null, platform=null) {
    if (!loggedIn){await login();};
    if (user == null || platform == null){return}
    try {
        let data = await API.MWweeklystats(user, platform);
        console.log(data.wz.mode.br_all.killsPerGame)
        console.log(data.wz.mode.br_all)
    } catch(error) {
        console.log("Error: " + error);
    }
}

async function battleroyaleData(user=null, platform=null) {
    if (!loggedIn){await login();};
    if (user == null || platform == null){return}
    try {
        let data = await API.MWBattleData(user, platform);
    } catch(error) {
        console.log("Error: " + error);
    }
}

async function callMethods(gamertag, platform='battle'){
    const data = await getWarzoneData(gamertag, platform);
    await getPlayedGamesData('USER', 'PLATFORM');
    await weeklyStats(gamertag, platform);
    await battleroyaleData(gamertag, platform);
    return data;
}
