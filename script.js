console.log("welcome to spotify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songInfoName = document.getElementById('songInfoName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Euphoria", filePath: "songs/My-You.mp3", coverPath: "image/jk14.jpg" },
    { songName: "My-You", filePath: "songs/Euphoria.mp3", coverPath: "image/jk6.jpg" },
    { songName: "Left & Right(feet by JK)", filePath: "songs/DD.mp3", coverPath: "image/CP.jpg" },
    { songName: "Stay Alive", filePath: "songs/Still with you.mp3", coverPath: "image/jk15.jpg" },
    { songName: "Falling(cover)", filePath: "songs/Euphoria.mp3", coverPath: "image/jk17.jpg" },
    { songName: "Still With You", filePath: "songs/Euphoria.mp3", coverPath: "image/jk11.jpg" },
    { songName: "10000 hour(cover)", filePath: "songs/Euphoria.mp3", coverPath: "image/jk20.jpg" },
]

songItems.forEach((element, i) => {
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
})
//listens to the events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})


const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        //console.log(e.target);

        makeAllPlays();
        songIndex = parseInt(e.target.id);
        //console.log(index);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        songInfoName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex=0
    }
    else{
        songIndex +=1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    songInfoName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');


})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex -=1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    songInfoName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');


})