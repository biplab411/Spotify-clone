console.log("Welcome to Spotify")

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Har Kisi Ko- Arijit Singh", filePath: "songs/1.mp3", duration: "04:35", coverPath: "covers/1.jpg" },
    { songName: "Tere Sang Yaara - Atif Aslam", filePath: "songs/2.mp3", duration: "05:36", coverPath: "covers/2.jpg" },
    { songName: "Zaroori Tha - Rahat Fateh Ali", filePath: "songs/3.mp3", duration: "06:02", coverPath: "covers/3.jpg" },
    { songName: "Itni Si Baat Hain - Arijit Singh", filePath: "songs/4.mp3", duration: "04:30", coverPath: "covers/4.jpg" },
    { songName: "Bol Do Na Zara - Arman Mallik", filePath: "songs/5.mp3", duration: "04:50", coverPath: "covers/5.jpg" },
    { songName: "Jeena_Jeena - Atif Aslam", filePath: "songs/6.mp3", duration: "05:25", coverPath: "covers/6.jpg" },
    { songName: "Khamoshiyan - Arijit Singh", filePath: "songs/7.mp3", duration: "07:60", coverPath: "covers/7.jpg" },
    { songName: "Kabira - Rekha Bhardwaj", filePath: "songs/8.mp3", duration: "03:55", coverPath: "covers/8.jpg" },
    { songName: "Tum Hi Ho - Arijit_Sigh", filePath: "songs/9.mp3", duration: "04:56", coverPath: "covers/9.jpg" },
    { songName: "Zindagi- Jubin Nautiyal", filePath: "songs/10.mp3", duration: "05:12", coverPath: "covers/10.jpg" }
]

const firstSongName = document.getElementById('masterSongName');
firstSongName.innerText = songs[0].songName;


songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('duration')[0].innerText = songs[i].duration;
});

// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        const id = document.getElementById(songIndex.toString());
        id.classList.remove('fa-circle-play');
        id.classList.add('fa-circle-pause');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
                makeAllPlays();
                songIndex = parseInt(e.target.id);
                if (audioElement.paused || audioElement.currentTime <= 0) {
                    e.target.classList.remove('fa-circle-play');
                    e.target.classList.add('fa-circle-pause');
                    audioElement.src = `songs/${songIndex + 1}.mp3`;
                    masterSongName.innerText = songs[songIndex].songName;
        //            audioElement.currentTime = 0;
                    audioElement.play();
                    gif.style.opacity = 1;
                    masterPlay.classList.remove('fa-circle-play');
                    masterPlay.classList.add('fa-circle-pause');
                }
                else {
                    audioElement.pause();
                    e.target.classList.remove('fa-circle-pause');
                    e.target.classList.add('fa-circle-play');
                    masterPlay.classList.remove('fa-circle-pause');
                    masterPlay.classList.add('fa-circle-play');
                    gif.style.opacity = 0;
                }

        


    })
})

document.getElementById('next').addEventListener('click', () => {
    makeAllPlays();
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    const id = document.getElementById(songIndex.toString());
    id.classList.remove('fa-circle-play');
    id.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', () => {
    makeAllPlays();
    if (songIndex <= 0) {
        songIndex = 9
    }
    else {
        songIndex -= 1;
    }
    const id = document.getElementById(songIndex.toString());
    id.classList.remove('fa-circle-play');
    id.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
