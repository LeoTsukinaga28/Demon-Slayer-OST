let audioElement = new Audio("songs/1.mp3")
let songIndex = 0
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let masterSongName = document.getElementById('masterSongName');
let container = document.getElementById('konten')
let body = document.getElementById('body')


let songs = [
    {songName: "Gurenge - LISA", filePath: "songs/1.mp3", coverPath: "img/1c.png"},
    {songName: "Kamado Tanjiro no Uta - Nami Nakagawa", filePath: "songs/2.mp3", coverPath: "img/2c.png"},
    {songName: "Homura - LISA ", filePath: "songs/3.mp3", coverPath: "img/3c.png"},
    {songName: "Zankyou Sanka - Aimer", filePath: "songs/4.mp3", coverPath: "img/4c.png"},
    {songName: "Kizuna no Kiseki - MAN WITH A MISSION x Milet", filePath: "songs/5.mp3", coverPath: "img/5c.png"},
    {songName: "Koi Kogare - MAN WITH A MISSION x Milet", filePath: "songs/6.mp3", coverPath: "img/6c.png"},
    {songName: "Kamado Nezuko no Uta - Nami Nakagawa", filePath: "songs/7.mp3", coverPath: "img/7c.png"},
    {songName: "Mugen - MY FIRST STORY x HYDE", filePath: "songs/8.mp3", coverPath: "img/8c.png"},
    {songName: "Tokoshie - MY FIRST STORY x HYDE", filePath: "songs/9.mp3", coverPath: "img/9c.png"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    
})


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.remove('fa-pause-circle')
        document.getElementById(`${songIndex}`).classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('ended', ()=> {
    songIndex += 1
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.play()
    masterSongName.innerText = songs[songIndex].songName;
    container.style.backgroundImage = `url('img/${songIndex+1}.png')`
    body.style.backgroundImage = `url('blur/${songIndex+1}.png')`
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
    document.getElementById(`${songIndex-1}`).classList.remove('fa-pause-circle')
    document.getElementById(`${songIndex-1}`).classList.add('fa-play-circle')
})

audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        container.style.backgroundImage = `url('img/${songIndex+1}.png')`
        body.style.backgroundImage = `url('blur/${songIndex+1}.png')`
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    )
})

document.getElementById('next').addEventListener('click', (e)=>{
    if(songIndex>=8){
        document.getElementById(`${songIndex}`).classList.remove('fa-pause-circle')
        document.getElementById(`${songIndex}`).classList.add('fa-play-circle')
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    container.style.backgroundImage = `url('img/${songIndex+1}.png')`
    body.style.backgroundImage = `url('blur/${songIndex+1}.png')`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
    document.getElementById(`${songIndex-1}`).classList.remove('fa-pause-circle')
    document.getElementById(`${songIndex-1}`).classList.add('fa-play-circle')
})

document.getElementById('previous').addEventListener('click', ()=> {
    if(songIndex<=0){
        document.getElementById(`${songIndex}`).classList.remove('fa-pause-circle')
        document.getElementById(`${songIndex}`).classList.add('fa-play-circle')
        songIndex = 8
    } else {
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    container.style.backgroundImage = `url('img/${songIndex+1}.png')`
    body.style.backgroundImage = `url('blur/${songIndex+1}.png')`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
    document.getElementById(`${songIndex+1}`).classList.remove('fa-pause-circle')
    document.getElementById(`${songIndex+1}`).classList.add('fa-play-circle')

})


