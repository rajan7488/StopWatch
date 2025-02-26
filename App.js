let stopWatch=document.querySelector('h2');
let start=document.querySelector('.btn-class-1');
let stop=document.querySelector('.btn-class-3');
let reset=document.querySelector('.btn-class-4');
let lap=document.querySelector('.btn-class-2');

console.log(stopWatch)

let timer;
let milliSeconds=0,seconds=0,minutes=0,hours=0;
let previousLapTime = 0;
let lapCounter = 0;
let running=false;

//start button functionlity...
start.addEventListener('click',(e)=>{
    console.log("click")
    if(!running){
        timer=setInterval(updateTime,10);
        start.innerText='Start';
    }
    lap.disabled=false;
    start.style.display='none';
    stop.style.display='inline';
    reset.style.display='inline';
    lap.style.display='inline';

});

// stop button functionality...
stop.addEventListener('click',()=>{
    running=false;
    start.style.display='inline';
    start.innerText='Resume';
    clearInterval(timer);
    lap.disabled=true;
});

// Reset button functionality...
reset.addEventListener('click',(e)=>{
    running=false;
    clearInterval(timer);
    start.innerText='Start';
    milliSeconds=0,seconds=0,minutes=0,hours=0;
    previousLapTime = 0;
    lapCounter = 0;
    document.getElementById('lapTable').innerText='';
    document.getElementById('lapsContainer').style.display = 'none';
    lap.disabled=false;
    stopWatch.innerText='00:00:00:00';
    start.style.display='inline';
    stop.style.display='none';
    reset.style.display='none';
    lap.style.display='none';

});

// Record Lap functionality...
lap.addEventListener('click',()=>{
    if (lapCounter === 0) {
        document.getElementById('lapsContainer').style.display = 'block';
    }
    lapCounter++;
    let totalLapTime = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliSeconds;
    let lapTime = totalLapTime - previousLapTime;
    previousLapTime = totalLapTime;

    let lapMilliseconds = lapTime % 1000;
    let lapSeconds = Math.floor((lapTime / 1000) % 60);
    let lapMinutes = Math.floor((lapTime / 60000) % 60);
    let lapHours = Math.floor(lapTime / 3600000);

    let formattedLapTime = (lapHours < 10 ? '0' : '') + lapHours + ':' +
        (lapMinutes < 10 ? '0' : '') + lapMinutes + ':' +
        (lapSeconds < 10 ? '0' : '') + lapSeconds + '.' +
        (lapMilliseconds < 100 ? '0' : '') + (lapMilliseconds < 10 ? '0' : '') + lapMilliseconds;
        let totalFormattedTime=stopWatch.innerText;
        let lapRow = `<tr><td>Lap ${lapCounter}</td><td>${formattedLapTime}</td><td>${totalFormattedTime}</td></tr>`;
        document.getElementById('lapTable').innerHTML += lapRow;
});


function updateTime(){
    milliSeconds+=10;
    if(milliSeconds===1000){
        milliSeconds=0;
        seconds++;
    }
    if(seconds===60){
        seconds=0;
        minutes++;
    }
    if(minutes===60){
        minutes=0;
        hours++;
    }
    stopWatch.innerText=
    (hours<10?'0':'')+hours+':'+
    (minutes<10?'0':'')+minutes+':'+
    (seconds<10?'0':'')+seconds+':'+
    (milliSeconds < 100 ? '0' : '') + (milliSeconds < 10 ? '0' : '') + milliSeconds;

}