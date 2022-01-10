// 1. Render songs -ok
// 2. Scroll top
// 3. Play / Pause / seek  
// 4. CD rotate
// 5. Next / prev
// 6. Random 
// 7. Next / Repeat when ended
// 8. Active song  
// 9. Scroll active song into view
// 10. Play song when click
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const singer = $('.title')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const playlist = $$('.playlist');

const app = {
  currentIndex: 0,
  isplaying: false,
  songs: [

    {
      name: 'Nevada',
      singer: 'Vicetone',
      path: './assets/music/nevada.mp3',
      image: './assets/img/nevadaVN.webp'
    },
    {
      name: 'SummerTime',
      singer: 'K-391',
      path: './assets/music/summertime.mp3',
      image: './assets/img/summerTime.webp'
    },
    {
      name: 'Monody',
      singer: 'TheFatRat',
      path: './assets/music/monody.mp3',
      image: './assets/img/monody.webp'
    },
    {
      name: 'Reality',
      singer: 'Lost Frequencies',
      path: './assets/music/reality.mp3',
      image: './assets/img/reality.webp'
    },
    {
      name: 'Nơi Này Có Anh',
      singer: 'Sơn Tùng-MTP',
      path: './assets/music/noiNayCoAnh.mp3',
      image: './assets/img/noiNayCoAnh.webp'
    },
    {
      name: 'Thì Thôi',
      singer: 'Ready',
      path: './assets/music/thiThoi.mp3',
      image: './assets/img/thiThoi.webp'
    },
    {
      name: 'Suýt Nữa Thì',
      singer: 'Andiez',
      path: './assets/music/suytNuaThi.mp3',
      image: './assets/img/suytNuaThi.webp'
    },
    {
      name: 'Chờ Anh Nhé',
      singer: 'Hoàng Dũng',
      path: './assets/music/choAnhNhe.mp3',
      image: './assets/img/choAnhNhe.webp'
    }
  ],
  render: function () {
    const htmls = this.songs.map(song => {
      return `<div class="song">
                      <div class="thumb"
                      style="background: url('${song.image}'); width: 40px; height: 45px;"></div>
                      <div class="body">
                          <h3 class="title-music">${song.name}</h3>
                          <p class="singer">${song.singer}</p>
                      </div>
                      <div class="option">
                          <i class="fa fa-ellipsis-h"></i>
                      </div>
                  </div>
              `
    })
    $('.playlist').innerHTML = htmls.join('\n')
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex]
      }
    })
  },
  // Xu ly cac su kien trong app nay
  handleEvents: function () {
    const _this = this
    //handle when click play
    playBtn.onclick = function () { 
      if(_this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    }

    //when song was be played
    audio.onplay = function() {
      _this.isPlaying = true
      player.classList.add('playing')
    }

    //when song was be paused
    audio.onpause = function() {
      _this.isPlaying = false
      player.classList.remove('playing')
    }
  },
  loadcurrentSong: function() {
      singer.textContent = this.currentSong.name
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path

  },
  start: function () {
    //define the properties for object
    this.defineProperties()

    //listen / handle the events (DOM events)
    this.handleEvents()

    //load song infomation first join UI when running app
    this.loadcurrentSong()

    //Render playlist
    this.render()
  }
}
app.start()

