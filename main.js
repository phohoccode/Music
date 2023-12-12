const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const nameSong = $(".name-song");
const nameSinger = $(".name-singer");
const progress = $(".progress");
const timeLeft = $(".time-left");
const timeRight = $(".time-right");
const cd = $(".cd");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const btnRepeat = $(".btn-repeat");
const btnPrev = $(".btn-prev");
const btnTogglePlay = $(".btn-toggle-play");
const btnNext = $(".btn-next");
const btnRandom = $(".btn-random");
const playList = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  isRandom: false,
  songs: [
    {
      name: "Chúng Ta Của Hiện Tại",
      singer: "Sơn Tùng MTP",
      path: "assets/music/ChungTaCuaHienTaiThienHiXHighFrequencyRemix-SonTungMTP-6893159.mp3",
      image: "assets/img/Chúng_ta_của_hiện_tại.jpg",
    },
    {
      name: "Chúng Ta Không Thuộc Về Nhau",
      singer: "Sơn Tùng MTP",
      path: "assets/music/ChungTaKhongThuocVeNhau-SonTungMTP-4528181.mp3",
      image: "assets/img/Chúng_ta_không_thuộc_về_nhau.jpeg",
    },
    {
      name: "Cơn Mưa Xa Dần",
      singer: "Sơn Tùng MTP",
      path: "assets/music/ConMuaXaDan-SonTungMTP-8033250.mp3",
      image: "assets/img/con_mua_xa_dan.jpg",
    },
    {
      name: "Hãy Trao Cho Anh",
      singer: "Sơn Tùng MTP",
      path: "assets/music/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3",
      image: "assets/img/Hay-Trao-Cho-Anh-1.jpg",
    },
    {
      name: "Muộn Rồi Mà Sao Còn",
      singer: "Sơn Tùng MTP",
      path: "assets/music/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3",
      image: "assets/img/Muộn_rồi_mà_sao_còn.png",
    },
    {
      name: "Nắng Ấm Ngang Qua",
      singer: "Sơn Tùng MTP",
      path: "assets/music/NangAmNgangQua-SonTungMTP-8033251.mp3",
      image: "assets/img/img-1.jpg",
    },
    {
      name: "Nơi Này Có Anh",
      singer: "Sơn Tùng MTP",
      path: "assets/music/NoiNayCoAnh-SonTungMTP-4772041.mp3",
      image: "assets/img/Nơi_này_có_anh.jpg",
    },
  ],

  render: function () {
    const hmtls = this.songs.map((song, index) => {
      return `
              <div class="song ${
                this.currentIndex === index ? "active" : ""
              }" data-index = ${index}>
                  <div class="thumb">
                      <img src="${song.image}" alt="" />
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fa-light fa-ellipsis"></i>
                  </div>
              </div>
          `;
    });
    $(".playlist").innerHTML = hmtls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      // thời gian của hiệu ứng
      duration: 10000,
      // số lần lặp của hiệu ứng
      iterations: Infinity,
    });
    // mặc định hiệu ứng sẽ dừng
    cdThumbAnimate.pause();
    // xử lý phóng to thu nhỏ cd-thumb
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // xử lý bật / tắt nhạc
    btnTogglePlay.addEventListener("click", function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    });
    audio.addEventListener("play", function () {
      player.classList.add("playing");
      _this.isPlaying = true;
      cdThumbAnimate.play();
    });

    audio.addEventListener("pause", function () {
      player.classList.remove("playing");
      _this.isPlaying = false;
      cdThumbAnimate.pause();
    });

    // load ra độ dài của bài hát
    audio.addEventListener("loadedmetadata", function () {
      timeRight.textContent = _this.formatTime(audio.duration);
    });

    // xử lý khi tiến độ bài hát thay đổi
    audio.addEventListener("timeupdate", function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
        timeLeft.textContent = _this.formatTime(audio.currentTime);
      }
    });

    // xử khi khi tua bài hát
    progress.addEventListener("change", function (e) {
      // audio.duration / 100 có tác dụng thời gian hiện tại thành đơn vị %
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    });

    // xử lý khi next bài hát
    btnNext.addEventListener("click", function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollActiveSong();
    });

    // xử lý khi prev bài hát
    btnPrev.addEventListener("click", function () {
      _this.prevSong();
      audio.play();
      _this.render();
      _this.scrollActiveSong();
    });

    // xử lý khi hết bài hát
    audio.addEventListener("ended", function () {
      if (_this.isRepeat && _this.isRandom) {
        audio.pause();
        alert(
          "Cả 2 phím repeat và random đang được bật cùng lúc ! Tắt 1 trong 2 để tiếp tục phát nhạc."
        );
      } else if (_this.isRandom) {
        _this.randomSong();
        audio.play();
      } else if (_this.isRepeat) {
        audio.play();
      } else {
        _this.nextSong();
        audio.play();
      }
      _this.render();
    });

    // xử lý khi btnRepeat active
    btnRepeat.addEventListener("click", function () {
      _this.isRepeat = !_this.isRepeat;
      btnRepeat.classList.toggle("active", _this.isRepeat);
    });

    // xử lý khi btnRadnom acitve
    btnRandom.addEventListener("click", function () {
      _this.isRandom = !_this.isRandom;
      btnRandom.classList.toggle("active", _this.isRandom);
    });

    // xử lý khi click vào song trong playlist
    playList.addEventListener("click", function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render()
          _this.scrollActiveSong()
          audio.play();
        }
      }
    });
  },

  formatTime: function (time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  randomSong: function () {
    // kiểm tra độ dài của danh sách nhạc
    if (this.songs.length <= 1) {
      return;
    }

    do {
      var newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  scrollActiveSong: function () {
    setTimeout(() => {
      const songElement = $(".song.active");
      songElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 500);
  },

  loadCurrentSong: function () {
    nameSong.textContent = this.currentSong.name;
    nameSinger.textContent = this.currentSong.singer;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  start: function () {
    this.defineProperties();
    this.loadCurrentSong();
    this.handleEvents();
    this.render();
  },
};
app.start();
