const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");
const nameEl = document.getElementById("name");

const newYears = "1 Jan 2022";
const names = ["Anon", "Anon", "Anon", "Anon", "Anon", "Anon", "Anon", "Anon", "Anon"]
const dates = ["26 Jan", "30 Jan", "4 Apr", "21 Apr", "1 Jun", "16 Jul", "26 Sep", "21 Nov", "14 Dec"]

function next_birthday(){
    let display_name = "Name"
    const currentDate = new Date();
    var lowest_date = null;
    var date_saver = null;
    for (let i=0; i <= dates.length; i++){
        date_saver = new Date(dates[i] + " " + String(currentDate.getUTCFullYear()));
        if (lowest_date == null){
            lowest_date = new Date(newYears);
        }
        if (Math.sign((date_saver - currentDate)/1000) != -1){
            if ((lowest_date-currentDate)/1000 > (date_saver-currentDate)/1000){
                lowest_date = date_saver;
                console.log(lowest_date)
                display_name = names[i] + " am: " + dates[i] + " "+ String(lowest_date.getUTCFullYear());
            }
        }
    }
    nameEl.innerHTML = display_name
    return lowest_date;
}

const next_day = next_birthday();

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();
    
    const totalSeconds = (next_day - currentDate) / 1000;
    
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// initial call
countdown();

setInterval(countdown, 1000);
