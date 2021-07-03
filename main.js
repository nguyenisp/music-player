const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const songsList = [
  {
    name: "Đường tôi chở em về",
    file: "duong-toi-cho-em-ve.mp3",
    thumbnail: "duong-toi-cho-em-ve.jpg",
  },
  {
    name: "Happy for you",
    file: "happy-for-u.mp3",
    thumbnail: "happy-for-u.jpg",
  },
  {
    name: "Sài Gòn hôm nay mưa",
    file: "sai-gon-hom-nay-mua.mp3",
    thumbnail: "sai-gon-hom-nay-mua.jpg",
  },
];

let songIndex = 0;

const loadSong = (songsObj) => {
  title.innerHTML = songsObj.name;
  audio.src = `./assets/musics/${songsObj.file}`;
  cover.src = `./assets/images/${songsObj.thumbnail}`;
};

const playSong = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
};

const pauseSong = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
};

const playPrev = () => {
  songIndex--;
  if (songIndex < 0) songIndex = songsList.length - 1;
  loadSong(songsList[songIndex]);
  playSong();
};

const playNext = () => {
  songIndex++;
  if (songIndex > songsList.length - 1) songIndex = 0;
  loadSong(songsList[songIndex]);
  playSong();
};

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", playPrev);
nextBtn.addEventListener("click", playNext);

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  if (progressPercent === 100) playNext();
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});
