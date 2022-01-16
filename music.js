// 1. Render songs -ok 
//1.1 Render songs for categories
// 2. Scroll top
// 3. Play / Pause / seek  -ok
// 4. CD rotate -ok
// 5. Next / prev -ok
// 6. Random  -ok
// 7. Next / Repeat when ended -ok
// 8. Active song  -ok
// 9. Scroll active song into view -ok
// 10. Play song when click -ok
//11. handle option
//11.1 Download song when click option
//11.2 Handle song love

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_LIST'
const LIST_STORAGE_KEY = "MUSIC_LOVE"

const title = $('.title .title-name')
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const player = $('.player')
const repBtn = $('.btn-repeat')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const playBtn = $('.btn-toggle-play')
const radBtn = $('.btn-random')
const playlist = $('.playlist')
const progress = $('#progress')
const curtime = $('#curtime')
const durtime = $('#durtime')
const volume = $('#volume')
const song = $('.song')
const vietnamese = $('.vietnamese')
const english = $('.english')
const korea = $('.korea')
const china = $('.china')
const love = $('.love')
const addLove = $('.add__love-Playlist')
const option = $('.option')
const optionB = $('.option__bottom')
const box = $('.box')

let newArray = []

const app = {
  currentIndex: 0,
  currentList: 'vietnamese',
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  configLove: JSON.parse(localStorage.getItem(LIST_STORAGE_KEY)) || {},
  songs: {
    vietnamese: [
      {
        name: 'Kẹo Bông Gòn',
        singer: 'H2K, TRUNKY',
        path: './assets/music/vietnamese/Keo Bong Gon - H2k_ TRUNKY.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/d/e/9/1/de91f9c8b08e1fb4b35e2b64e1c2ed15.jpg'
      },
      {
        name: 'Váy Cưới (Lofi Version)',
        singer: 'Trung Tự, Rain, BFF',
        path: './assets/music/vietnamese/VayCuoi-TrungTu-4861460.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/d/f/d/c/dfdc847c99d1f7b549d01528188aa1ed.jpg'
      },
      {
        name: 'Yêu Là Cưới',
        singer: 'Phát Hồ, X2X',
        path: './assets/music/vietnamese/Yeu La Cuoi - Phat Ho.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/4/9/d/a/49da6a1d6cf13a42e77bc3a945d9dd6b.jpg'
      },
      {
        name: 'Màu Nước Mắt',
        singer: 'Nguyễn Trần Trung Quân',
        path: './assets/music/vietnamese/Mau Nuoc Mat - Nguyen Tran Trung Quan.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/8/f/5/0/8f50e5afbf4daa6d062019bc36f3ab1a.jpg'
      },
      {
        name: 'Con Nợ Mẹ',
        singer: 'Trịnh Đình Quang',
        path: './assets/music/vietnamese/Con No Me - Trinh Dinh Quang.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/6/2/62e328be3f61e35c88ab08b4ac8f888a_1418987645.jpg'
      },
      {
        name: '3 1 0 7',
        singer: 'Duongg - Nâu',
        path: './assets/music/vietnamese/3 1 0 7 - W_n_ Duongg_ Nau.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/3/d/c/a/3dcae4d98f98fd4df205a66d240fb1f8.jpg'
      },
      {
        name: 'Ghé Qua',
        singer: 'Dick x Tofu x PC',
        path: './assets/music/vietnamese/Ghe Qua - Dick_ Tofu_ PC.mp3',
        image: 'https://photo-zmp3.zadn.vn/audio_default.png'
      },
      {
        name: 'Về Với Anh Đi',
        singer: 'Andiez',
        path: './assets/music/vietnamese/Ve Voi Anh Di - Andiez.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/avatars/9/e/3/b/9e3bfb0a08a3d09e337957170905fd58.jpg'
      },
      {
        name: 'Lưu Số Em Đi',
        singer: 'Huỳnh Văn, Vũ Phụng Tiên',
        path: './assets/music/vietnamese/Luu So Em Di Dai Meo Remix_ - Huynh Van_.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/7/9/7/f/797fe66f5ed44a33e2ceca3fb63464c8.jpg'
      },
      {
        name: 'Cưa Là Đổ',
        singer: 'Phát Hồ, X2X',
        path: './assets/music/vietnamese/Cua La Do - Phat Ho_ X2X.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/1/7/d/f/17df138d6b0c38c8a07ee502a49573cd.jpg'
      }
    ],
    english: [
      {
        name: 'Mood',
        singer: '24KGoldn, Lann Dior',
        path: './assets/music/us-uk/Mood - 24kGoldn_ Iann Dior.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/0/2/b/2/02b29072eea90031aedeac7b157b3b4f.jpg'
      },
      {
        name: 'STAY',
        singer: 'The Kid LAROI, Justin Bieber',
        path: './assets/music/us-uk/Stay - The Kid LAROI_ Justin Bieber.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/7/6/7/c/767ce49eda227dd737bc17589362f86a.jpg'
      },
      {
        name: 'Cold Water',
        singer: 'Major Lazer, Justin Bieber',
        path: './assets/music/us-uk/Cold Water - Major Lazer_ MO_ Justin Bie.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/9/a/9a7589d8753620fe49f7655f4d89e8cc_1469160584.jpg'
      },
      {
        name: 'Dusk Till Dawn',
        singer: 'ZAYN, Sia',
        path: './assets/music/us-uk/Dusk Till Dawn - Tyler And Ryan.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/5/1/3/3/5133e8c5b69122e5cf04d6bbddfac2d1.jpg'
      },
      {
        name: 'Uptown Funk',
        singer: 'Mark Ronson, Bruno Mars',
        path: './assets/music/us-uk/Uptown Funk - Mark Ronson_ Bruno Mars.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/6/a/8/6/6a865fd1812a5285ce811260e5fbc27e.jpg'
      },
      {
        name: 'Talking To The Moon',
        singer: 'Bruno Mars',
        path: './assets/music/us-uk/Talking To The Moon - Bruno Mars.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/7/f/e/8/7fe893caa5195af42378b63f46220bf2.jpg'
      },
      {
        name: 'Señorita',
        singer: 'Shawn Mendes, Camila Cabello',
        path: './assets/music/us-uk/Senorita - Shawn Mendes_ Camila Cabello.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/a/5/0/7/a50751f2b03c0b777db61121614cf079.jpg'
      },
      {
        name: 'Dance Monkey',
        singer: 'Maialen',
        path: './assets/music/us-uk/Dance Monkey - Tones And I.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/7/c/1/5/7c15dcea365c7fc33f5f2f80ad3a02d3.jpg'
      },
      {
        name: 'That Girl',
        singer: 'Olly Murs',
        path: './assets/music/us-uk/That Girl - Olly Murs.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/5/b/3/f/5b3f8d08259615e15c899e3080d6c6ef.jpg'
      },
      {
        name: 'SugarCrash!',
        singer: 'ElyOtto',
        path: './assets/music/us-uk/SugarCrash_ - ElyOtto.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/d/8/b/1/d8b1cea5fdca3b4fb3d4d4b1bed6ddb9.jpg'
      }
    ],
    korea: [
      {
        name: 'How you Like That',
        singer: 'BLACKPINK',
        path: './assets/music/korean/How You Like That - BlackPink.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/f/1/1/1/f1113df32e09c1c5c6fe7069b0107c13.jpg'
      },
      {
        name: 'Kill This Love',
        singer: 'BLACKPINK',
        path: './assets/music/korean/Kill This Love Live_ - BlackPink.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/9/d/9/2/9d92800be7aeeace4e73d1bf3696bf4d.jpg'
      },
      {
        name: 'DDU-DU DDU0-Du',
        singer: 'BLACKPINK',
        path: './assets/music/korean/Ddu-Du Ddu-Du - BlackPink.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/d/0/2/9/d02919e0aa02332be290af46a90072b8.jpg'
      },
      {
        name: 'Really',
        singer: 'BLACKPINK',
        path: './assets/music/korean/Really - BlackPink.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/5/1/3/3/5133e8c5b69122e5cf04d6bbddfac2d1.jpg'
      },
      {
        name: 'Winter Sleep',
        singer: 'IU',
        path: './assets/music/korean/Winter Sleep - IU.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/9/d/9/2/9d92800be7aeeace4e73d1bf3696bf4d.jpg'
      },
      {
        name: 'Home',
        singer: 'Janet Suhh',
        path: './assets/music/korean/Home - Janet Suhh.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/7/9/1/6/79162d1b6172ab702e7e64482094588b.jpg'
      },
      {
        name: 'ELEVEN',
        singer: 'IVE',
        path: './assets/music/korean/Eleven - IVE.mp3',
        image: 'https://data.chiasenhac.com/data/cover/153/152408.jpg'
      },
      {
        name: 'MONEY',
        singer: 'LISA',
        path: './assets/music/korean/Money - Lisa.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/0/5/b/1/05b109f713d48c0cea3423b8279897b7.jpg'
      },
      {
        name: 'On The Ground',
        singer: 'ROSÉ',
        path: './assets/music/korean/On The Ground - Rose.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/b/1/4/4/b144497aff69a4b8d16687c2bc30b224.jpg'
      },
      {
        name: 'Dynamite',
        singer: 'BTS',
        path: './assets/music/korean/Dynamite - BTS.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/9/0/2/e/902e2aa9ef582670091f1f2beda8a251.jpg'
      }
    ],
    china: [
      {
        name: 'Hỏi Gió (問風)',
        singer: 'Kim Ngư',
        path: './assets/music/china/Hoi Gio - Kim Ngu.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/5/3/3/1/5331a4dfa9709535d1caa5a1db637635.jpg'
      },
      {
        name: 'Thiếu Niên / 少年',
        singer: 'Mộng Nhiên',
        path: './assets/music/china/Thieu Nien - Mong Nhien.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/9/d/9/2/9d92800be7aeeace4e73d1bf3696bf4d.jpg'
      },
      {
        name: 'Tớ Và Cậu / 我和你',
        singer: 'Pikachu Đa Đa',
        path: './assets/music/china/To Va Cau - Pikachu Da Da.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/1/7/5/a/175a7cd3ed590b585628b674a66a8f9a.jpg'
      },
      {
        name: 'Cặp Đôi Đẹp Nhất / 最美情侣',
        singer: 'Bạch Tiểu Bạch',
        path: './assets/music/china/Cap Doi Dep Nhat - Bach Tieu Bach.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/7/3/4/4/7344132a6b743349e0c3c4ddf6c57c26.jpg'
      },
      {
        name: 'Tớ Thích Cậu Nhường Nào, Cậu Sẽ Biết Thôi (我多喜歡你，你會知道)',
        singer: 'Vương Tuấn Kỳ',
        path: './assets/music/china/To Thich Cau Nhuong Nao_ Cau Se Biet Tho.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/covers/0/1/019f2822202c0606fad5994d21e9e1e5_1511153650.jpg'
      },
      {
        name: 'Mỗi Cô Gái Là Một Nàng Công Chúa (每個女孩都是公主)',
        singer: '橘貓燒鯛魚',
        path: './assets/music/china/Moi Co Gai La Mot Nang Cong Chua - Quat.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/b/0/9/c/b09c101f10622d98cbf342f4ff70468e.jpg'
      },
      {
        name: 'Phi Tù / 非酋',
        singer: 'Tiết Minh VIện',
        path: './assets/music/china/Phi Tu - Tiet Minh Vien.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/b/c/f/f/bcff8bc98927543264362805bc463027.jpg'
      },
      {
        name: 'Có Chút Ngọt Ngào / 有点甜',
        singer: 'Uông Tô Lang, By2',
        path: './assets/music/china/Co Chut Ngot Ngao - Uong To Lang_ By2.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/d/4/d4e810bb88ab518385039243ca32c977_1342784345.jpg'
      },
      {
        name: 'Your Smile',
        singer: 'Trần Ý Hàm',
        path: './assets/music/china/Your Smile - Tran Y Ham.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/6/a/9/8/6a989ab4e70a3ea3843371ed896acbed.jpg'
      },
      {
        name: 'Đáp Án Của Bạn / 你的答案',
        singer: 'A Nhũng ',
        path: './assets/music/china/Dap-An-Cua-Ban-A-Nhung.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/c/8/e/8/c8e8668fca2154da97499d83c658a677.jpg'
      }
    ],
    love: []
  },
  setConfig: function (key, value) {
    this.config[key] = value
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
  },
  setConfigLove: function (arrayLove) {
    this.configLove = arrayLove
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(this.configLove))
  },
  render: function () {
    const htmls = this.songs[this.currentList].map((song, index) => {
      return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
                      <div class="thumb" style="background-image: url('${song.image}'); width: 40px; height: 45px;">
                      </div>
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
    playlist.innerHTML = htmls.join('')
  },
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentList][this.currentIndex]
      }
    })
  },
  // handle the events in app
  handleEvents: function () {
    const _this = this
    const cdHeight = cd.offsetHeight
    const playlistHeight = playlist.offsetHeight

    //handle scroll playlist
    playlist.onscroll = function () {
      const scrollTop = playlist.scrollY || playlist.scrollTop

      const newCdHeight = cdHeight - scrollTop
      const newPlaylistHeight = playlistHeight + scrollTop

      cd.style.height = newCdHeight > 0 ? newCdHeight + 'px' : '0'
      playlist.style.height = newPlaylistHeight + 'px'
      cd.style.opacity = newCdHeight / cdHeight
    }

    //handle CD turn / stop
    const cdThumbAnimate = cdThumb.animate([
      { transform: 'rotate(360deg)' }
    ], {
      duration: 10000,
      iterations: Infinity,
    })
    cdThumbAnimate.pause()

    //handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    }

    //when song was be played
    audio.onplay = function () {
      _this.isPlaying = true
      player.classList.add('playing')
      cdThumbAnimate.play()
    }

    //when song was be paused
    audio.onpause = function () {
      _this.isPlaying = false
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }

    //when song progress running
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
      }
    }

    //Handle repeat song when audio ended
    repBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat
      _this.setConfig('isRepeat', _this.isRepeat)
      repBtn.classList.toggle('active', _this.isRepeat)
    }

    //When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong()
      }
      else {
        _this.nextSong()
      }
      _this.setConfig('currentIndex', _this.currentIndex)
      _this.render()
      _this.scrollToActiveSong()
      audio.play()
    }

    //When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong()
      } else {
        _this.prevSong()
      }
      _this.setConfig('currentIndex', _this.currentIndex)
      _this.render()
      _this.scrollToActiveSong()
      audio.play()
    }

    //Handle on / off random song
    radBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom
      _this.setConfig('isRandom', _this.isRandom)
      radBtn.classList.toggle('active', _this.isRandom)
    }

    //Handle next song when audio ended    
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play()
      } else {
        nextBtn.click()
      }
    }

    //handle song when skip
    progress.onchange = function (e) {
      const seekTime = audio.duration / 100 * e.target.value
      audio.currentTime = seekTime
    }

    //song current time
    audio.addEventListener('timeupdate', function () {
      var curtime = this.currentTime
      var min = Math.floor(curtime / 60)
      var sec = Math.floor(curtime % 60)
      document.getElementById('curtime').innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
    })

    //Song duration time
    audio.onloadedmetadata = function () {
      duration = audio.duration
      var min = Math.floor(duration / 60)
      var sec = Math.floor(duration % 60)
      document.getElementById('durtime').innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
    }

    //mute and up volume
    volume.addEventListener('click', function () {
      if (this.classList.contains('fa-volume-up')) {
        this.classList.replace('fa-volume-up', 'fa-volume-mute')
        audio.volume = 0
      } else {
        this.classList.replace('fa-volume-mute', 'fa-volume-up')
        audio.volume = 1
      }
    })

    //listen behavior when click on playlist

    playlist.onclick = function (e) {
      const songAdd = e.target.closest('.song')
      const songNode = e.target.closest('.song:not(.active')
      if (songNode || e.target.closest('.option')) {
        //handle when click on song  
        if (songNode && !e.target.closest('.option')) {
          _this.currentIndex = Number(songNode.dataset.index) //can use songNode.getAttribute.index to instead
          _this.setConfig(_this.currentList, _this.currentIndex)
          _this.loadCurrentSong()
          _this.render()
          audio.play()
        }

        //handle when click on option
        if (e.target.closest('.option')) {
          if (_this.currentList === 'love') {
            //delete song
            optionB.classList.add('active')
            box.classList.add('active')
            addLove.onclick = function () {
              var indexTrace = Number(songAdd.dataset.index)
              _this.songs['love'].splice(indexTrace, 1)
              _this.render()
              _this.setConfigLove(_this.songs['love'])
              showDeleteSuccess()

              optionB.classList.remove('active')
              box.classList.remove('active')
            }
          } else {
            //add song
            optionB.classList.add('active')
            box.classList.add('active')
            addLove.onclick = function () {
              console.log(addLove)
              var indexTrace = Number(songAdd.dataset.index)
              console.log(indexTrace)
              if (_this.currentList === 'vietnamese') {
                newLove = _this.songs['vietnamese'][indexTrace]
              } else if (_this.currentList === 'english') {
                newLove = _this.songs['english'][indexTrace]
              } else if (_this.currentList === 'korea') {
                newLove = _this.songs['korea'][indexTrace]
              } else {
                newLove = _this.songs['china'][indexTrace]
              }
              _this.setConfigLove(newLove)

              if (!_this.songs['love'].includes(newLove)) {
                _this.songs['love'].push(newLove)
                _this.setConfigLove(_this.songs['love'])
                showAddLove()
              } else {
                showAddedLove()
              }
              console.log(_this.songs[love])
              optionB.classList.remove('active')
              box.classList.remove('active')
            }
          }
        }
      }
    }

    box.onclick = function (e) {
      e.target.classList.remove('active')
      optionB.classList.remove('active')
    }


    //handle change song list
    vietnamese.onclick = function () {
      vietnamese.classList.add('active');
      english.classList.remove('active');
      korea.classList.remove('active');
      china.classList.remove('active');
      love.classList.remove('active');

      _this.currentList = 'vietnamese'
      _this.currentIndex = 0
      _this.loadCurrentSong()
      _this.render()
      audio.play()
      playBtn.click()
    }
    english.onclick = function () {
      vietnamese.classList.remove('active');
      english.classList.add('active');
      korea.classList.remove('active');
      china.classList.remove('active');
      love.classList.remove('active');

      _this.currentList = 'english'
      _this.currentIndex = 0
      _this.loadCurrentSong()
      _this.render()
      audio.play()
      playBtn.click()
    }
    korea.onclick = function () {
      vietnamese.classList.remove('active');
      english.classList.remove('active');
      korea.classList.add('active');
      china.classList.remove('active');
      love.classList.remove('active');

      _this.currentList = 'korea'
      _this.currentIndex = 0
      _this.loadCurrentSong()
      _this.render()
      audio.play()
      playBtn.click()
    }
    china.onclick = function () {
      vietnamese.classList.remove('active');
      english.classList.remove('active');
      korea.classList.remove('active');
      china.classList.add('active');
      love.classList.remove('active');

      _this.currentList = 'china'
      _this.currentIndex = 0
      _this.loadCurrentSong()
      _this.render()
      audio.play()
      playBtn.click()
    }
    love.onclick = function () {
        if (_this.songs['love'].length === 0) {
          showLoveEmpty()
        } else {
          addLove.innerText = 'Remove song from favorites'

          vietnamese.classList.remove('active');
          english.classList.remove('active');
          korea.classList.remove('active');
          china.classList.remove('active');
          love.classList.add('active');

          _this.currentList = 'love'
          _this.currentIndex = 0
          _this.loadCurrentSong()
          _this.render()
          audio.play()
          playBtn.click()
        }
      
    }
  },
  //Current Song
  loadCurrentSong: function () {
    title.textContent = this.songs[this.currentList][this.currentIndex].name
    cdThumb.style.backgroundImage = `url('${this.songs[this.currentList][this.currentIndex].image}')`
    audio.src = this.songs[this.currentList][this.currentIndex].path
  },
  loadConfig: function () {
    if (this.config.isRandom) {
      this.isRandom = this.config.isRandom
    } else {
      this.isRandom = false
    }
    if (this.config.isRepeat) {
      this.isRepeat = this.config.isRepeat
    } else {
      this.isRepeat = false
    }
    if (this.config.currentIndex) {
      this.currentIndex = this.config.currentIndex
    } else {
      this.currentIndex = 0
    }
    if (this.configLove.length > 0) {
      this.songs['love'] = this.songs['love'].concat(this.configLove)
      console.log(this.songs['love'])
    }
    console.log(this.configLove.length)
    this.render()

  },
  nextSong: function () {
    this.currentIndex++
    if (this.currentIndex >= this.songs[this.currentList].length) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  prevSong: function () {
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs[this.currentList].length - 1
    }
    this.loadCurrentSong()
  },
  playRandomSong: function () {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs[this.currentList].length)
    } while (newIndex === this.currentIndex)

    this.currentIndex = newIndex
    this.loadCurrentSong()
  },
  scrollToActiveSong: function () {
    setTimeout(function () {
      $('.song.active').scrollIntoView({ behavior: 'smooth', block: "center" })
    }, 500)
  },
  start: function () {
    // localStorage.getItem(LIST_STORAGE_KEY) && this.songs.love.length === 0 ? this.songs.love = JSON.parse(localStorage.getItem(LIST_STORAGE_KEY)) : ''

    //assgin config from config in app
    this.loadConfig();

    //define the properties for object
    this.defineProperties()

    //listen / handle the events (DOM events)
    this.handleEvents()

    //load song infomation first join UI when running app
    this.loadCurrentSong()

    //Render playlist
    this.render()

    //display begin status of button repeat & random
    repBtn.classList.toggle('active', this.isRepeat)
    radBtn.classList.toggle('active', this.isRandom)
  }
}

app.start()



function notify({
  title = '',
  message = '',
  type = 'info',
  duration = 3000
}) {
  const main = document.getElementById('notify')
  if (main) {
    const notify = document.createElement('div')

    //auto Remove Notify
    setTimeout(() => {
      main.removeChild(notify)
    }, duration)

    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-circle',
    }
    const icon = icons[type]
    const delay = (duration / 1000).toFixed(2)

    notify.classList.add('notify', `notify--${type}`)
    notify.style.animation = `slideInTop ease .3s, fadeOut linear 1s ${delay}s forwards`;
    notify.innerHTML = `
         <div class="notify__icon">
             <i class="${icon}"></i>
         </div>
         <div class="notify__body">
             <h3 class="notify__title">${title}</h3>
             <p class="notify__msg">${message}</p>
         </div>
    `
    main.appendChild(notify)
  }
}

function showAddedLove() {
  notify({
    title: 'Mini Audio',
    message: 'This song is already in favorites',
    type: 'warning',
    duaration: 3000
  });
}

function showAddLove() {
  notify({
    title: 'Mini Audio',
    message: 'You have added song in favorites',
    type: 'success',
    duaration: 3000
  });
}

function showLoveEmpty() {
  notify({
    title: 'Mini Audio',
    message: 'You have not add any song in favorites',
    type: 'error',
    duaration: 3000
  });
}

function showDeleteSuccess() {
  notify({
    title: 'Mini Audio',
    message: 'You have deleted song from favorites',
    type: 'success',
    duaration: 3000
  });
}