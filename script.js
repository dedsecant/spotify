console.log("welcome to spotify");

//intialize the variable
let songindex=0; //current song being played
let audioElement = new Audio('songs/1.mp3');    //you put a song inside songs folder , use songs/1.mp3 to access
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems =  Array.from(document.getElementsByClassName('songitem'));



let songs=[
    {songName : "Uzumaki naruto", filePath : "songs/1.mp3", coverPath : "covers/1cover.jpg"},
    {songName : "Chainsaw man - Kick Back", filePath : "songs/2.mp3", coverPath : "covers/cm.png"},
    {songName : "Attack On titan - Warriors", filePath : "songs/aot.mp3", coverPath : "covers/aot.jpg"},
    {songName : "Full Metal Alchemist - Period", filePath : "songs/fma.mp3", coverPath : "covers/fma.jpg"},
    {songName : "Hero Academia - You Say Run", filePath : "songs/bnha.mp3", coverPath : "covers/bnha.jpg"},
    {songName : "Demon Slayer - Gurenge", filePath : "songs/ds.mp3", coverPath : "covers/ds.jpg"},
]

songItems.forEach((element, i)=>{
    // console.log(element, i);     reference for each songs!!
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})


// audioElement.play();
//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//listen to events
//for the functioning of the seekbar some maths is done here,timeupdate counts time per sec as song being played
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);  //value in percentage
    console.log(progress);
    myProgressBar.value=progress;
})

// say you wanna drag the seekpointer in the seekbar forward or backward
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;     //value in int
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);     //e - is watever being clicked the play circle
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText=songs[songindex].songName;
        
        audioElement.src = songs[songindex].filePath;   // Use the index directly without adding 1
        
        //if you want u could change the names of the songs to 1.mp3, 2.mp3, 3.mp3 so on
        // then for the above code line replace it with
        //audioElement.src = `songs/${index+1}.mp3`;
        
        audioElement.currentTime = 0;   // everytime you play a new song, the current time of the song is 0
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=5)
    {
        songindex=0;
    }
    else
    {
        songindex+=1
    }
    


    audioElement.src = songs[songindex].filePath;   
    masterSongName.innerText=songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0)
    {
        songindex=5;
    }
    else
    {
        songindex-=1
    }
   


    audioElement.src = songs[songindex].filePath;   
    masterSongName.innerText=songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})