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
const CATEGORY_STORAGE_KEY = "MUSIC_CATEGORY"

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

let newArray = []


const app = {
  currentIndex: 0,
  currentList: 'vietnamese',
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: {
    vietnamese: [
      {
        name: 'Kẹo Bông Gòn',
        singer: 'H2K, TRUNKY',
        path: 'https://zingmp3.vn/bai-hat/Keo-Bong-Gon-H2K-TRUNKY/ZWEW9WI8.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/d/e/9/1/de91f9c8b08e1fb4b35e2b64e1c2ed15.jpg'
      },
      {
        name: 'Váy Cưới (Lofi Version)',
        singer: 'Trung Tự, Rain, BFF',
        path: 'https://zingmp3.vn/bai-hat/Vay-Cuoi-Lofi-Version-Trung-Tu-Rain-BFF/ZUC7EFIW.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/d/f/d/c/dfdc847c99d1f7b549d01528188aa1ed.jpg'
      },
      {
        name: 'Yêu Là Cưới',
        singer: 'Phát Hồ, X2X',
        path: 'https://zingmp3.vn/bai-hat/Yeu-La-Cuoi-Phat-Ho-X2X/ZU6IEI66.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/4/9/d/a/49da6a1d6cf13a42e77bc3a945d9dd6b.jpg'
      },
      {
        name: 'Màu Nước Mắt',
        singer: 'Nguyễn Trần Trung Quân',
        path: 'https://zingmp3.vn/bai-hat/Mau-Nuoc-Mat-Nguyen-Tran-Trung-Quan/ZW9F08DB.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/8/f/5/0/8f50e5afbf4daa6d062019bc36f3ab1a.jpg'
      },
      {
        name: 'Con Nợ Mẹ',
        singer: 'Trịnh Đình Quang',
        path: 'https://zingmp3.vn/bai-hat/Con-No-Me-Trinh-Dinh-Quang/ZW6FIBAI.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/6/2/62e328be3f61e35c88ab08b4ac8f888a_1418987645.jpg'
      },
      {
        name: '3 1 0 7',
        singer: 'Duongg - Nâu',
        path: 'https://zingmp3.vn/bai-hat/3-1-0-7-Duongg-Nau/ZWAFWFI0.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/3/d/c/a/3dcae4d98f98fd4df205a66d240fb1f8.jpg'
      },
      {
        name: 'Ghé Qua',
        singer: 'Dick x Tofu x PC',
        path: 'https://zingmp3.vn/bai-hat/Ghe-Qua-Dick-x-Tofu-x-PC/ZW8WCI9F.html',
        image: 'https://photo-zmp3.zadn.vn/audio_default.png'
      },
      {
        name: 'Về Với Anh Đi',
        singer: 'Andiez',
        path: 'https://zingmp3.vn/bai-hat/Ve-Voi-Anh-Di-Andiez/ZW9DZBWF.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/avatars/9/e/3/b/9e3bfb0a08a3d09e337957170905fd58.jpg'
      },
      {
        name: 'Lưu Số Em Đi',
        singer: 'Huỳnh Văn, Vũ Phụng Tiên',
        path: 'https://zingmp3.vn/bai-hat/Luu-So-Em-Di-Huynh-Van-Vu-Phung-Tien/ZUCO7WW0.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/7/9/7/f/797fe66f5ed44a33e2ceca3fb63464c8.jpg'
      },
      {
        name: 'Cưa Là Đổ',
        singer: 'Phát Hồ, X2X',
        path: 'https://zingmp3.vn/bai-hat/Cua-La-Do-Phat-Ho-X2X/ZU9WOC9E.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/1/7/d/f/17df138d6b0c38c8a07ee502a49573cd.jpg'
      }
    ],
    english: [
      {
        name: 'Mood',
        singer: '24KGoldn, Lann Dior',
        path: 'https://zingmp3.vn/bai-hat/Mood-24KGoldn-Iann-Dior/ZWBE8DU6.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/0/2/b/2/02b29072eea90031aedeac7b157b3b4f.jpg'
      },
      {
        name: 'STAY',
        singer: 'The Kid LAROI, Justin Bieber',
        path: 'https://zingmp3.vn/bai-hat/STAY-The-Kid-LAROI-Justin-Bieber/ZUWIB0AW.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/7/6/7/c/767ce49eda227dd737bc17589362f86a.jpg'
      },
      {
        name: 'Cold Water',
        singer: 'Major Lazer, Justin Bieber',
        path: 'https://zingmp3.vn/bai-hat/Cold-Water-Major-Lazer-Justin-Bieber-M/ZW7UE7IF.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/9/a/9a7589d8753620fe49f7655f4d89e8cc_1469160584.jpg'
      },
      {
        name: 'Dusk Till Dawn',
        singer: 'ZAYN, Sia',
        path: 'https://zingmp3.vn/bai-hat/Dusk-Till-Dawn-ZAYN-Sia/ZW8I78UO.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/5/1/3/3/5133e8c5b69122e5cf04d6bbddfac2d1.jpg'
      },
      {
        name: 'Uptown Funk',
        singer: 'Mark Ronson, Bruno Mars',
        path: 'https://zingmp3.vn/bai-hat/Uptown-Funk-Mark-Ronson-Bruno-Mars/ZW6EA7O7.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/6/a/8/6/6a865fd1812a5285ce811260e5fbc27e.jpg'
      },
      {
        name: 'Dancing With Your Ghost',
        singer: 'Sasha Alex Sloan',
        path: 'https://zingmp3.vn/bai-hat/Dancing-With-Your-Ghost-Sasha-Alex-Sloan/ZWADDU8B.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/7/f/e/8/7fe893caa5195af42378b63f46220bf2.jpg'
      },
      {
        name: 'Señorita',
        singer: 'Shawn Mendes, Camila Cabello',
        path: 'https://zingmp3.vn/bai-hat/Senorita-Shawn-Mendes-Camila-Cabello/ZWAFDUW0.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/a/5/0/7/a50751f2b03c0b777db61121614cf079.jpg'
      },
      {
        name: 'Dance Monkey',
        singer: 'Maialen',
        path: 'https://zingmp3.vn/bai-hat/Dance-Monkey-Maialen/ZU07FZDA.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/7/c/1/5/7c15dcea365c7fc33f5f2f80ad3a02d3.jpg'
      },
      {
        name: 'That Girl (CORSAK Remix)',
        singer: 'Olly Murs, Liu Yu Ning, CORSAK',
        path: 'https://zingmp3.vn/bai-hat/That-Girl-CORSAK-Remix-Olly-Murs-Liu-Yu-Ning-CORSAK/ZWAD8AA8.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/5/b/3/f/5b3f8d08259615e15c899e3080d6c6ef.jpg'
      },
      {
        name: 'SugarCrash!',
        singer: 'ElyOtto',
        path: 'https://zingmp3.vn/bai-hat/SugarCrash-ElyOtto/ZOAOAO68.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/d/8/b/1/d8b1cea5fdca3b4fb3d4d4b1bed6ddb9.jpg'
      }
    ],
    korea: [
      {
        name: 'How you Like That',
        singer: 'BLACKPINK',
        path: 'https://zingmp3.vn/bai-hat/How-You-Like-That-BLACKPINK/ZWBU778A.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/f/1/1/1/f1113df32e09c1c5c6fe7069b0107c13.jpg'
      },
      {
        name: 'Kill This Love',
        singer: 'BLACKPINK',
        path: 'https://zingmp3.vn/bai-hat/Kill-This-Love-BLACKPINK/ZWACDBZ6.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/9/d/9/2/9d92800be7aeeace4e73d1bf3696bf4d.jpg'
      },
      {
        name: 'DDU-DU DDU0-Du',
        singer: 'BLACKPINK',
        path: 'https://zingmp3.vn/bai-hat/DDU-DU-DDU-DU-BLACKPINK/ZW9C9AZ0.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/d/0/2/9/d02919e0aa02332be290af46a90072b8.jpg'
      },
      {
        name: 'Really',
        singer: 'BLACKPINK',
        path: 'https://zingmp3.vn/bai-hat/Really-BLACKPINK/ZW9C9AZU.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/5/1/3/3/5133e8c5b69122e5cf04d6bbddfac2d1.jpg'
      },
      {
        name: 'Winter Sleep',
        singer: 'IU',
        path: 'https://zingmp3.vn/bai-hat/Winter-Sleep-IU/ZZ00WOBE.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/9/d/9/2/9d92800be7aeeace4e73d1bf3696bf4d.jpg'
      },
      {
        name: 'BOOMBAYA',
        singer: 'BLACKPINK',
        path: 'https://zingmp3.vn/bai-hat/BOOMBAYAH-BLACKPINK/ZU060UBA.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/7/9/1/6/79162d1b6172ab702e7e64482094588b.jpg'
      },
      {
        name: 'ELEVEN',
        singer: 'IVE',
        path: 'https://zingmp3.vn/bai-hat/ELEVEN-IVE/ZUDUFBOB.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/2/2/0/0/22009f0b42a8c2c33849c41697078eae.jpg'
      },
      {
        name: 'MONEY',
        singer: 'LISA',
        path: 'https://zingmp3.vn/bai-hat/MONEY-LISA/ZU6ZE7FU.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/0/5/b/1/05b109f713d48c0cea3423b8279897b7.jpg'
      },
      {
        name: 'On The Ground',
        singer: 'ROSÉ',
        path: 'https://zingmp3.vn/bai-hat/On-The-Ground-ROSE/ZO9F7BEZ.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/b/1/4/4/b144497aff69a4b8d16687c2bc30b224.jpg'
      },
      {
        name: 'Dynamite',
        singer: 'BTS',
        path: 'https://zingmp3.vn/bai-hat/Dynamite-BTS/ZOEBBBEW.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/9/0/2/e/902e2aa9ef582670091f1f2beda8a251.jpg'
      }
    ],
    china: [
      {
        name: 'Hỏi Gió (問風)',
        singer: 'Kim Ngư',
        path: 'https://zingmp3.vn/bai-hat/Hoi-Gio-Kim-Ngu/ZZ0UO0U8.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/5/3/3/1/5331a4dfa9709535d1caa5a1db637635.jpg'
      },
      {
        name: 'Thiếu Niên / 少年',
        singer: 'Mộng Nhiên',
        path: 'https://zingmp3.vn/bai-hat/Thieu-Nien-Mong-Nhien/ZWBOW0O6.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/9/d/9/2/9d92800be7aeeace4e73d1bf3696bf4d.jpg'
      },
      {
        name: 'Tớ Và Cậu / 我和你',
        singer: 'Pikachu Đa Đa',
        path: 'https://zingmp3.vn/bai-hat/To-Va-Cau-Pikachu-Da-Da/ZWBOED9C.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/1/7/5/a/175a7cd3ed590b585628b674a66a8f9a.jpg'
      },
      {
        name: 'Cặp Đôi Đẹp Nhất / 最美情侣',
        singer: 'Bạch Tiểu Bạch',
        path: 'https://zingmp3.vn/bai-hat/Cap-Doi-Dep-Nhat-Bach-Tieu-Bach/ZW9D69WO.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/7/3/4/4/7344132a6b743349e0c3c4ddf6c57c26.jpg'
      },
      {
        name: 'Tớ Thích Cậu Nhường Nào, Cậu Sẽ Biết Thôi',
        singer: 'Various Artists',
        path: 'https://zingmp3.vn/bai-hat/To-Thich-Cau-Nhuong-Nao-Cau-Se-Biet-Thoi-Various-Artists/ZW8W7OFD.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/covers/0/1/019f2822202c0606fad5994d21e9e1e5_1511153650.jpg'
      },
      {
        name: 'Mỗi Cô Gái Là Một Nàng Công Chúa',
        singer: '橘貓燒鯛魚',
        path: 'https://zingmp3.vn/bai-hat/Moi-Co-Gai-La-Mot-Nang-Cong-Chua/ZUCUFIFZ.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/b/0/9/c/b09c101f10622d98cbf342f4ff70468e.jpg'
      },
      {
        name: 'Phi Tù / 非酋',
        singer: 'Tiết Minh VIện',
        path: 'https://zingmp3.vn/bai-hat/Phi-Tu-tiet-minh-vien/ZW9EODFZ.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/b/c/f/f/bcff8bc98927543264362805bc463027.jpg'
      },
      {
        name: 'Có Chút Ngọt Ngào / 有点甜',
        singer: 'Uông Tô Lang, By2',
        path: 'https://zingmp3.vn/bai-hat/Co-Chut-Ngot-Ngao-Uong-To-Lang-By2/ZW6I6FCD.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/d/4/d4e810bb88ab518385039243ca32c977_1342784345.jpg'
      },
      {
        name: 'Your Smile',
        singer: 'Trần Ý Hàm',
        path: 'https://zingmp3.vn/bai-hat/Your-Smile-Tran-Y-Ham/ZWEIUAWW.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/6/a/9/8/6a989ab4e70a3ea3843371ed896acbed.jpg'
      },
      {
        name: 'Đáp Án Của Bạn / 你的答案',
        singer: 'A Nhũng ',
        path: 'https://zingmp3.vn/bai-hat/Dap-An-Cua-Ban-A-Nhung/ZWB0OWIZ.html',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/c/8/e/8/c8e8668fca2154da97499d83c658a677.jpg'
      }
    ],
    love: []
  },
  setConfig: function(key, value) {
    this.config[key] = value
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))

  },
  render: function () {
    const htmls = this.songs[this.currentList].map((song, index) => {  
      return `
                <div class="song ${index === this.currenIndex ? 'active' : ''} data-index =${index}">
                      <div class="thumb" style="background: url('${song.image}'); width: 40px; height: 45px;">
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
        return this.songs[this.currentList][this.currenIndex]
      }
    })
  },
  // Xu ly cac su kien trong app nay
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
        { transform: 'rotate(360deg)'}
    ],  { 
          duration: 10000,
          iterations: Infinity,
    })
    cdThumbAnimate.pause()
    //handle when click play
    playBtn.onclick = function () { 
      if(_this.isPlaying) {
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
    nextBtn.onclick = function() {
      if(_this.isRandom) {
        _this.playRandomSong()
      }
      else {
        _this.nextSong()
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    //When prev song
    prevBtn.onclick = function() {
      if(_this.isRandom) {
        _this.playRandomSong()
      } else {
        _this.prevSong()
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    //Handle on / off random song
    radBtn.onclick = function(e) {
      _this.isRandom = !_this.isRandom
      _this.setConfig('isRandom', _this.isRandom)
      radBtn.classList.toggle('active', _this.isRandom)
    }

    //Handle next song when audio ended    
    audio.onended = function() {
      if(_this.isRepeat) {
        audio.play()
      } else {
        nextBtn.click()
      }
    }

    //handle song when skip
    progress.onchange = function(e) {
      const seekTime = audio.duration / 100 * e.target.value
      audio.currentTime = seekTime
    }

    //song current time
    audio.addEventListener('timeupdate', function() {
      var curtime = this.currentTime
      var min = Math.floor(curtime / 60)
      var sec = Math.floor(curtime % 60)
      document.getElementById('curtime').innerText = (min<10?'0'+min : min)+ ':' +(sec<10?'0'+sec : sec)
    })

    //Song duration time
    audio.onloadedmetadata = function () {
      duration = audio.duration
      var min = Math.floor(duration / 60)
      var sec = Math.floor(duration % 60)
      document.getElementById('durtime').innerText = (min<10?'0'+ min : min) +':'+ (sec<10?'0'+ sec : sec)
    }

    //mute and up volume
    volume.addEventListener('click', function() {
      if(this.classList.contains('fa-volume-up')) {
          this.classList.replace('fa-volume-up', 'fa-volume-mute')
          audio.volume = 0
      } else {
          this.classList.replace('fa-volume-mute', 'fa-volume-up')
          audio.volume = 1
      }
    })

    //listen behavior when click on playlist
    playlist.onclick = function (e) {
    const songNode = e.target.closest('.song:not(.active')
      if (songNode || e.target.closest('.option')) {
        //handle when click on song  
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index)
          _this.loadCurrentSong()
          _this.render()
          audio.play()
        }

        //handle when click on option
        if (e.target.closest('.option')) {

        }
      }
    }
  },
  
  //Current Song
  loadCurrentSong: function () {
      title.textContent= this.songs[this.currentList][this.currentIndex].name
      cdThumb.style.backgroundImage = `url('${this.songs[this.currentList][this.currentIndex].image}')`
      audio.src = this.songs[this.currentList][this.currentIndex].path
   },
  loadConfig: function () {
    this.isRandom = this.config.isRandom
    this.isRepeat = this.config.isRepeat
  },
  nextSong: function () {
    this.currentIndex++
    if(this.currentIndex >= this.songs[this.currentList].length) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  prevSong: function () {
    this.currentIndex--
    if(this.currentIndex < 0) {
      this.currentIndex =  this.songs[this.currentList].length - 1
    }
    this.loadCurrentSong()
  },
  playRandomSong: function () {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs[this.currentList].length)
    } while(newIndex === this.currentIndex)
    
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },
  scrollToActiveSong: function () {
    setTimeout(function () {
      $('.song.active').scrollIntoView()
    }, 500)
  },
  start: function () {
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

