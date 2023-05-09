const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listSongs = $('.song-list');
const cd = $('.cd-thumb');
const heading = $('.song-name');
const singer = $('.singer-name');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.play-pause');
const player = $('.player');
const process = $('.process');
const nextBtn = $('.next');
const prevBtn = $('.back');
const totalTime = $('.total-time');
const currentTime = $('.current-time');
const randomBtn = $('.random.control-btn');
const repeatBtn = $('.loop.control-btn');



const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Là Anh',
            singer: 'Phạm Lịch',
            path: './asset/songs/song1.mp3',
            image: './asset/img/song1.jpg'
        },
        {
            name: 'Mật Ngọt',
            singer: 'Dunghoangpham',
            path: './asset/songs/song2.mp3',
            image: './asset/img/song2.jpg'
        },
        {
            name: 'Một Ngày Chẳng Nắng',
            singer: 'Pháo',
            path: './asset/songs/song3.mp3',
            image: './asset/img/song3.jpg'
        },
        {
            name: 'Chỉ Cần Thấy Môi Anh Cười',
            singer: 'WONI, Vy Dương',
            path: './asset/songs/song4.mp3',
            image: './asset/img/song4.jpg'
        },
        {
            name: 'Đưa Em Về Nhàa',
            singer: 'GREY D, Chillies',
            path: './asset/songs/song5.mp3',
            image: './asset/img/song5.jpg'
        },
        {
            name: 'Em Có Biết(AM Remix)',
            singer: 'H2K',
            path: './asset/songs/song6.mp3',
            image: './asset/img/song6.jpg'
        },
        {
            name: 'Vũ Trụ Có Anh',
            singer: 'Phương Mỹ Chi, DTAP, Pháo',
            path: './asset/songs/song7.mp3',
            image: './asset/img/song7.jpg'
        },
        {
            name: 'Hong Bé Ơi',
            singer: 'Cain, LCKing, Antoneus Maximus',
            path: './asset/songs/song8.mp3',
            image: './asset/img/song8.jpg'
        },
        {
            name: 'Nhường Hạnh Phúc Cho Anh',
            singer: 'Ngọc Kayla',
            path: './asset/songs/song9.mp3',
            image: './asset/img/song9.jpg'
        },
        {
            name: 'Trách Duyên Trách Phận',
            singer: 'Đỗ Thành Duy, NH4T Media Music',
            path: './asset/songs/song10.mp3',
            image: './asset/img/song10.jpg'
        },
        {
            name: 'Nhất Trên Đời',
            singer: 'VAnh, BMZ',
            path: './asset/songs/song11.mp3',
            image: './asset/img/song11.jpg'
        },
        {
            name: 'Thích Hay Là Yêu Còn Chưa Biết',
            singer: 'LONA, Ricky Star',
            path: './asset/songs/song12.mp3',
            image: './asset/img/song12.jpg'
        },
        {
            name: 'Cupid (Sped Up)',
            singer: 'FIFTY FIFTY',
            path: './asset/songs/song13.mp3',
            image: './asset/img/song13.jpg'
        }
    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <li class="song-container" data-index="${index}">
                <div class="song-item-img">
                    <img src="${song.image}" alt="">
                </div>
                <div class="song-item-desc">
                    <p class="song-item-name">${song.name}</p>
                    <p class="song-item-singer">${song.singer}</p>
                </div>
                <div class="isPlaying">
                    <i class="fa-solid fa-compact-disc"></i>
                </div>
                <div class="song-item-more">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </li>
            `
        })

        listSongs.innerHTML = htmls.join('');
    },
    handleEvents: function() {
        const _this = this;
        const sCD = $$('.isPlaying');

        // Xử lý phóng to thủ nhỏ cd
        const cdHeight = cd.offsetHeight;
        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const newCdHeight = cdHeight - scrollTop;

            cd.style.height = newCdHeight > 0 ? newCdHeight + 'px' : 0;
            cd.style.opacity = newCdHeight / cdHeight;
        }

        // Xử lý CD quay và dừng

        const cdAnimate = cd.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        });

        cdAnimate.pause();

        const sCDAnimate = Array.from(sCD).map((cd) => {
            return cd.animate([
                { transform: 'rotate(360deg)'}
            ], {
                duration: 10000,
                iterations: Infinity
            });
        })

        sCDAnimate.forEach((s) => {
            s.pause();
        })

        // Xử lý khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi song được phát
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            // Chạy cd của song đang phát
            cdAnimate.play();
            sCDAnimate[_this.currentIndex].play();
        };

        // Khi song được pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            // Dừng cd của sonng đang phát
            cdAnimate.pause();
            sCDAnimate[_this.currentIndex].pause();
        };

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if (this.duration && this.duration > 0) {
                const currentMinute = Math.floor(this.duration / 60);
                const currentSecond = Math.floor(this.duration % 60);
                if (currentSecond < 10)
                    totalTime.innerHTML = `${currentMinute}:0${currentSecond}`;
                else
                totalTime.innerHTML = `${currentMinute}:${currentSecond}`;
            }
            setInterval(() => {
                if (this.currentTime) {
                    const processPercent = Math.floor(this.currentTime / this.duration * 100);
                    process.value = processPercent;
                    const currentMinute = Math.floor(this.currentTime / 60);
                    const currentSecond = Math.floor(this.currentTime % 60);
                    if (currentSecond < 10)
                        currentTime.innerHTML = `${currentMinute}:0${currentSecond}`;
                    else
                    currentTime.innerHTML = `${currentMinute}:${currentSecond}`;
                }
            }, 1000);
        }

        // Xử lý khi tua
        process.onchange = function(e) {
            audio.currentTime = audio.duration / 100 * e.target.value;
        }

        // Xử lý khi ấn next
        nextBtn.onclick = function() {
            if (_this.isRandom)
                _this.randomSong();
            else
                _this.nextSong();
            audio.play();
            _this.scrollToActiveSong();
        }

        // Xử lý khi ấn prev
        prevBtn.onclick = function() {
            if (_this.isRandom)
                _this.randomSong();
            else
                _this.prevSong();
            audio.play();
            _this.scrollToActiveSong();
        }

        // Xử lý khi bật tắt random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // Xử lý khi bật tắt repeat
        repeatBtn.onclick = function() {
            _this.isRepeat =!_this.isRepeat;
            this.classList.toggle('active', _this.isRepeat);
        }


        // Xử lý khi ended song
        audio.onended = function() {
            if (_this.isRepeat)
                audio.play();
            else
                nextBtn.click();
        }

        // Phát bài hát khi click
        listSongs.onclick = function(e) {
            const songNodeNoActive = e.target.closest('.song-container:not(.active)');
            const songNode = e.target.closest('.song-container');
            const moreNode = e.target.closest('.song-item-more');
            // Xử lý click vào bài hát
            if (songNodeNoActive && !moreNode) {
                _this.currentIndex = Number(songNodeNoActive.getAttribute('data-index'));
                _this.loadCurrentSong();
                audio.play();
            }

            // Xử lý khi click vào nút more
            if (songNode && moreNode) {
                console.log(songNode.getAttribute('data-index'));
            }
        }

    },
    defindProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    loadCurrentSong: function() {
        
        heading.textContent = this.currentSong.name;
        singer.textContent  = this.currentSong.singer;
        cdThumb.src = `${this.currentSong.image}`;
        audio.src = this.currentSong.path;
        
        this.setSongPlaying(this.currentSong.name);
    },
    setSongPlaying: function(songName) {
        const songsList = $$('.song-container');
        Array.from(songsList).forEach(element => {
            const currentName = element.children[1].children[0].innerHTML;
            if (currentName === songName) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1)
            this.currentIndex = 0;
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0)
            this.currentIndex = this.songs.length - 1;
        this.loadCurrentSong();
    },
    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function() {
        if (this.currentIndex <= 4) {
            setTimeout(function() {
                $('.song-container.active').scrollIntoView({
                    behavior:'smooth',
                    block:'end',
                })
            },200)
        } else {
        setTimeout(function() {
            $('.song-container.active').scrollIntoView({
                behavior:'smooth',
                block:'nearest',
            })
        },200)
        }
    },
    start: function() {
        // Định nghĩa các thuộc tính cho obj
        this.defindProperties();

        //Render Playlist
        this.render();

        //Lắng nghe và xử lý các sự kiện
        this.handleEvents();

        // Tải bài thông tin bài hát đầu tiên vào UI
        this.loadCurrentSong();
    }
};

app.start();