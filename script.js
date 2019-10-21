$(function() {
    var playerTrack = $("#player-track"),
        bgArtwork = $('#bg-artwork'),
        bgArtworkUrl, albumName = $('#album-name'),
        trackName = $('#track-name'),
        albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null,
        tFlag = false,
        songs = [
            {
              "img": "./src/img/RakLeinNar2_FINAL.png",
              "audio": "./src/audio/Rak Lein Nar 2 - Khun Htetz Naing - Khun Moung - Khun Wai Yan Soe.mp3",
              "title": "ရက်လဲဉ်းနာꩻ (၂)",
              "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ၊ ခွန်ဝေယံစိုး"
            },
            {
              "img": "./src/img/kham.png",
              "audio": "./src/audio/Kham - Khun Htetz Naing Ft Khun Moung.mp3",
              "title": "ခမ်း",
              "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ"
            },
            {
              "img": "./src/img/nar_yue_phay_bai.png",
              "audio": "./src/audio/Nar Yue Phay Bai.mp3",
              "title": "နာꩻယူႏဖေႏဗဲင်း",
              "artists": "ခွန်ဆောင်းဖေး၊ ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ"
            },
            {
              "img": "./src/img/rak_lein_nar.jpg",
              "audio": "./src/audio/Rak Lein Nar.mp3",
              "title": "ရက်လဲဉ်းနာꩻ",
              "artists": "ခွန်ထက်နိုင်"
            },
            {
              "img": "./src/img/kyay_nat_dyar.jpg",
              "audio": "./src/audio/Kyay Nat Dyar - 2 By Khun Htetz Naing.mp3",
              "title": "ကေႏနပ်ဒျာႏ",
              "artists": "ခွန်ထက်နိုင်"
            },
            {
              "img": "./src/img/rak-ta-phae-sar.jpg",
              "audio": "./src/audio/Rak Ta Phae Sar - NEW.mp3",
              "title": "ရက်တဖဲ့ꩻသား",
              "artists": "ခွန်ထက်နိုင်"
            },
            {
              "img": "./src/img/kham_pa_tao.jpg",
              "audio": "./src/audio/KhamPhaTao_KhunHtetzNaing_ft_NangKhamHayMhan.mp3",
              "title": "ခံႏဖတဝ်း",
              "artists": "ခွန်ထက်နိုင်၊ နင်ႏခမ်းဟေမာန်"
            },
            {
              "img": "./src/img/raw-swa-mu.png",
              "audio": "./src/audio/Rak Swa Mu.mp3",
              "title": "ရက်သွꩻမူႏ",
              "artists": "ခွန်ထက်နိုင်"
            },
            {
              "img": "./src/img/rak-lein-nar2.png",
              "audio": "./src/audio/Rak Lein Nar - 2.mp3",
              "title": "ရက်လဲဉ်းနာꩻ  (၂) Demo",
              "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ၊ ခွန်ဝေယံစိုး"
            },
            {
              "img": "./src/img/lo_lein_swa_ta_phyar.jpg",
              "audio": "./src/audio/Lo Lein Swa Ta Phyar.mp3",
              "title": "လွိုလဲဉ်း\"သွꩻ\"တဖြာꩻ",
              "artists": "ခွန်ဖိုးသား၊ ခွန်ထက်နိုင်"
            },
            {
              "img": "./src/img/nann_leon_ngar.jpg",
              "audio": "./src/audio/Nann Leon Ngar.mp3",
              "title": "နန်းလွဉ်ꩻငါႏ",
              "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ"
            },
            {
              "img": "./src/img/pyan_lae_lar_pay_par.png",
              "audio": "./src/audio/Pyan Lae Lar Pay Par - Han Htet - Wai Yan Soe - Khun Htetz Naing.mp3",
              "title": "ပြန်လှည့်လာပေးပါ",
              "artists": "ဟန်ထက်၊ ခွန်ဝေယံစိုး Ft ခွန်ထက်နိုင်"
            }
          ],
        playPreviousTrackButton = $('#play-previous'),
        playNextTrackButton = $('#play-next'),
        downloadButton = $('#download'),
        currIndex = -1;

    function playPause() {
        setTimeout(function() {
            if (audio.paused) {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'fas fa-pause');
                audio.play();
            } else {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class', 'fas fa-play');
                audio.pause();
            }
        }, 300);
    }

    $.each(songs, function(key, value) {
        var img = 1 + key;

        $('#album-art').append(`<img src="` + songs[key].img + `" class="active" id="_`+img+`">`);

        $('.play-list').append(`<li id="` + img + `"><div class="play">
        <div class="album-thumb pull-left">
            <img src="` + songs[key].img + `">
        </div>
        <div class="songs-info pull-left">
            <div class="song-title">` + songs[key].title + `</div>
            <div class="songs-detail">
                <span class="song-artist">` + songs[key].artists + `</span>
            </div>
        </div>
    </div></li>`);
    });

    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds))
            insTime.text('--:--');
        else
            insTime.text(ctMinutes + ':' + ctSeconds);

        insTime.css({
            'left': seekT,
            'margin-left': '-21px'
        }).fadeIn(0);

    }

    function hideHover() {
        sHover.width(0);
        insTime.text('00:00').css({
            'left': '0px',
            'margin-left': '0px'
        }).fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds))
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes + ':' + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds))
            tTime.text('00:00');
        else
            tTime.text(durMinutes + ':' + durSeconds);

        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


        seekBar.width(playProgress + '%');

        if (playProgress == 100) {
            i.attr('class', 'fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function() {
            if ((nTime == 0) || (bTime - nTime) > 1000)
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        }, 100);
    }

    function selectTrack(flag) {
        if (flag == 0 || flag == 1)
            ++currIndex;
        else
            --currIndex;

        if ((currIndex > -1) && (currIndex < songs.length)) {
            if (flag == 0)
                i.attr('class', 'fa fa-play');
            else {
                albumArt.removeClass('buffering');
                i.attr('class', 'fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currTitle = songs[currIndex].title;
            currArtist = songs[currIndex].artists;
            currArtwork = 1+currIndex;

            audio.src = songs[currIndex].audio;

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
                var promise = audio.play();
                if (promise !== undefined) {
                    promise.then(_ => {
                        // Autoplay started!
                        playerTrack.addClass('active');
                        albumArt.addClass('active');
                        clearInterval(buffInterval);
                        checkBuffering();
                            }).catch(error => {
                                playerTrack.removeClass('active');
                                albumArt.removeClass('active');
                                clearInterval(buffInterval);
                                albumArt.removeClass('buffering');
                                i.attr('class', 'fas fa-play');
                                audio.pause();
                        // Autoplay was prevented.
                        // Show a "Play" button so that user can start playback.
                    });
                }
            }

            albumName.text(currTitle);
            trackName.text(currArtist);
            albumArt.find('img.active').removeClass('active');
            $('#_' + currArtwork).addClass('active');
            $(document).prop('title', '🎵 ' + currTitle + ' - ' + currArtist);
            $('link[rel="shortcut icon"]').attr('href', songs[currIndex].img);
            bgArtworkUrl = songs[currIndex].img;
            bgArtwork.css({
                'background-image': 'url(' + bgArtworkUrl + ')'
            });

        } else {
            if (flag == 0 || flag == 1)
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer() {
        audio = new Audio();
        audio.addEventListener("ended", function() {
            selectTrack(1);
        });
        selectTrack(0);

        audio.loop = false;

        playPauseButton.on('click', playPause);

        sArea.mousemove(function(event) {
            showHover(event);
        });

        sArea.mouseout(hideHover);

        sArea.on('click', playFromClickedPos);

        $(audio).on('timeupdate', updateCurrTime);

        playPreviousTrackButton.on('click', function() {
            selectTrack(-1);
        });
        playNextTrackButton.on('click', function() {
            selectTrack(1);
        });
        downloadButton.on('click', function() {
            window.open(songs[currIndex].audio);
        })
    }

    $('ol.play-list li').click(function(e) {
        currIndex = this.id;
        selectTrack(-1);
    });

    initPlayer();

    $(window).keypress(function(e) {
        if (e.which == 32) {
            playPause();
            return false;
        }
        return true;
    });

    function isHas(data, key) {
        if (data.indexOf(key) != -1) {
          return true;
        }
        return false;
    }

    var url_string = window.location.href;
    var url = new URL(url_string);
    if(isHas(url_string,'song=')){
        console.log('has parameter');
        var songID = url.searchParams.get("song");
        currIndex = songID;
        selectTrack(-1);
    }
});