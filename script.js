$(function () {
    //OnlineTag
    var imgOnline = 'https://rawcdn.githack.com/KhunHtetzNaing/htetz-naing/6c223402796c95b94502b2f49473cc6fe300d28c/src/img/',
        audioOnline = 'https://rawcdn.githack.com/KhunHtetzNaing/htetz-naing/6c223402796c95b94502b2f49473cc6fe300d28c/src/audio/',
        videoOnline = 'https://glcdn.githack.com/KhunHtetzNaing/firstrepo/raw/master/';

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
        songs = generateSong(),
        playPreviousTrackButton = $('#play-previous'),
        playNextTrackButton = $('#play-next'),
        downloadButton = $('#download'),
        currIndex = -1;

    function playPause() {
        setTimeout(function () {
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

    $.each(songs, function (key) {
        var img = 1 + key;

        $('#album-art').append(`<img src="` + songs[key].img + `" class="active" id="_` + img + `">`);

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
        buffInterval = setInterval(function () {
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
            currArtwork = 1 + currIndex;
            currYoutube = songs[currIndex].youtube;

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

            //Change Title
            $(document).prop('title', '🎵 ' + currTitle + ' - ' + currArtist);

            //Change Favicon
            $('link[rel="shortcut icon"]').attr('href', songs[currIndex].img);

            //Change Facebook/Twitter Title
            $('meta[property="og:title"]').attr('content', currTitle);
            $('meta[property="twitter:title"]').attr('content', currTitle);

            //Change Facebook/Twitter Description
            $('meta[property="og:description"]').attr('content', currArtist);
            $('meta[property="twitter:description"]').attr('content', currArtist);

            //Change Facebook/Twitter Image
            $('meta[property="og:image"]').attr('content', songs[currIndex].img);
            $('meta[property="twitter:image"]').attr('content', songs[currIndex].img);

            //Change Facebook/Twitter URL
            $('meta[property="og:url"]').attr('content', window.location.href);
            $('meta[property="twitter:url"]').attr('content', window.location.href);

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
        changeUrlNoReload('?id=' + currYoutube+'.html');
    }

    function initPlayer() {
        audio = new Audio();
        audio.addEventListener("ended", function () {
            selectTrack(1);
        });

        audio.loop = false;

        playPauseButton.on('click', playPause);

        sArea.mousemove(function (event) {
            showHover(event);
        });

        sArea.mouseout(hideHover);

        sArea.on('click', playFromClickedPos);

        $(audio).on('timeupdate', updateCurrTime);

        playPreviousTrackButton.on('click', function () {
            selectTrack(-1);
        });
        playNextTrackButton.on('click', function () {
            selectTrack(1);
        });
        downloadButton.on('click', function () {
            downloadDialog(currIndex);
        })
    }

    $('ol.play-list li').click(function (e) {
        currIndex = this.id;
        selectTrack(-1);
    });

    initPlayer();

    //Control from keyboard
    $(window).keypress(function (e) {
        if (e.which == 32) {
            //Play Pause
            playPause();
            return false;
        }
        return true;
    });

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            // up arrow
        }
        else if (e.keyCode == '40') {
            // down arrow
        }
        else if (e.keyCode == '37') {
            // left arrow
            selectTrack(-1);
        }
        else if (e.keyCode == '39') {
            // right arrow
            selectTrack(1);
        }

    }

    //End control from keyboard

    function downloadDialog(e) {
        Swal.fire({
            title: 'ဒေါင်းချင်တာကိုနှိပ်ပါ!',
            icon: 'info',
            html:
                '<div class="embed-container"><iframe src="https://www.youtube.com/embed//' + songs[e].youtube + '" frameborder="0" allowfullscreen></iframe></div>',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: true,
            confirmButtonText:
                'MP3',
            cancelButtonText:
                'MP4'
        }).then((result) => {
            if (result.value) {
                //MP3 Download
                downloadMe(songs[e].audio);
                downloadDialog(e);
            } else if (result.dismiss == 'cancel') {
                //MP4 Download
                downloadMe(songs[e].video);
                downloadDialog(e);
            }
        })
    }

    function downloadMe(href) {
        var anchor = document.createElement('a');
        anchor.href = href;
        anchor.download = decodeURI(href.substring(href.lastIndexOf('/') + 1));
        anchor.target = '_blank';
        document.body.appendChild(anchor);
        anchor.click();
    }

    function isHas(data, key) {
        if (data.indexOf(key) != -1) {
            return true;
        }
        return false;
    }

    function isHasParameter(){
        var path = window.location.pathname;
        if(path.indexOf('/') != -1){
	        path = path.replace(/\//g, '');
        }
        if(path!=''){
            return path;
        }else{
            return null;
        }
    }

    var songName = isHasParameter();
    if(songName!=null){
        currIndex = 1+getSongIdByName(songName.replace(".html",""));
        selectTrack(currIndex);
    }else{
        selectTrack(0);
    }

    function isOnline() {
        return window.location.protocol != 'file:';
    }

    function generateSong() {
        var imgProtocol = (isOnline() == true) ? imgOnline : './src/img/',
            audioProtocol = (isOnline() == true) ? audioOnline : './src/audio/',
            videoProtocol = (isOnline() == true) ? videoOnline : './src/video/';
        var temp = [
            {
                "img": imgProtocol + "YamSayNar.jpg",
                "audio": audioProtocol + "Yam Say Nar - Htetz Naing X Tun Lwin.mp3",
                "title": "ယံသေနာႏ",
                "artists": "ခွန်ထွန်းလွင်၊ ခွန်ထက်နိုင်",
                "youtube": "piQ4-BaRqmM",
                "video": videoProtocol + "YamSayNar - Khun Htetz Naing X Khun Tun Lwin.mp4"
            },
            {
                "img": imgProtocol + "tam-pho.jpg",
                "audio": audioProtocol + "Tam Pho - Khun Lao Rak X Khun Htetz Naing X Khun Moung.mp3",
                "title": "တန်ႏဖိုꩻ",
                "artists": "ခွန်လဝ်းရက်၊ ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ",
                "youtube": "R_qEAThSh3I",
                "video": videoProtocol + "TamPho - Khun Lao Rak X Khun Htetz Naing X Khun Moung.mp4"
            },
            {
                "img": imgProtocol + "AChaiSutNeZatRan.jpg",
                "audio": audioProtocol + "A Chai Sut Ne Zat Ran - Khun Htetz Naing X Nang Cherry Win.mp3",
                "title": "အဆုဲင်ꩻသွတ်နီဇာတ်ရဲဉ်ႏ",
                "artists": "ခွန်ထက်နိုင်၊ နင်ႏချယ်ရီဝင်း",
                "youtube": "HLWLzR48cxA",
                "video": videoProtocol + "AChaiSwutNeeZatRan - Khun Htetz Naing X Nang Cherry Win.mp4"
            },
            {
                "img": imgProtocol + "RakLeinNar2_FINAL.png",
                "audio": audioProtocol + "Rak Lein Nar 2 - Khun Htetz Naing - Khun Moung - Khun Wai Yan Soe.mp3",
                "title": "ရက်လဲဉ်းနာꩻ (၂)",
                "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ၊ ခွန်ဝေယံစိုး",
                "youtube": "Axu4DcLMxLE",
                "video": videoProtocol + "RakLeinNar2 - Khun Htetz Naing X Khun Moung X Khun Wai Yan Soe.mp4"
            },
            {
                "img": imgProtocol + "kham.png",
                "audio": audioProtocol + "Kham - Khun Htetz Naing Ft Khun Moung.mp3",
                "title": "ခမ်း",
                "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ",
                "youtube": "IhJk273Kgoc",
                "video": videoProtocol + "Kham - Khun Htetz Naing X Khun Moung.mp4"
            },
            {
                "img": imgProtocol + "nar_yue_phay_bai.png",
                "audio": audioProtocol + "Nar Yue Phay Bai.mp3",
                "title": "နာꩻယူႏဖေႏဗဲင်း",
                "artists": "ခွန်ဆောင်းဖေး၊ ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ",
                "youtube": "kAMfi2uU_MU",
                "video": videoProtocol + "NarYuePhayBai - Khun Soung Phay X Khun Htetz Naing X Khun Moung.mp4"
            },
            {
                "img": imgProtocol + "rak_lein_nar.jpg",
                "audio": audioProtocol + "Rak Lein Nar.mp3",
                "title": "ရက်လဲဉ်းနာꩻ",
                "artists": "ခွန်ထက်နိုင်",
                "youtube": "-0M4Rw5tV1I",
                "video": videoProtocol + "RakLeinNar - Khun Htetz Naing.mp4"
            },
            {
                "img": imgProtocol + "kyay_nat_dyar.jpg",
                "audio": audioProtocol + "Kyay Nat Dyar - 2 By Khun Htetz Naing.mp3",
                "title": "ကေႏနပ်ဒျာႏ",
                "artists": "ခွန်ထက်နိုင်",
                "youtube": "3AP0b1VEJ9U",
                "video": videoProtocol + "KayNatDyar - Khun Htetz Naing.mp4"
            },
            {
                "img": imgProtocol + "rak-ta-phae-sar.jpg",
                "audio": audioProtocol + "Rak Ta Phae Sar - NEW.mp3",
                "title": "ရက်တဖဲ့ꩻသား",
                "artists": "ခွန်ထက်နိုင်",
                "youtube": "VLlQ-jI0QVM",
                "video": videoProtocol + "Rak Ta Phae Sar - Khun Htetz Naing.mp4"
            },
            {
                "img": imgProtocol + "kham_pa_tao.jpg",
                "audio": audioProtocol + "KhamPhaTao_KhunHtetzNaing_ft_NangKhamHayMhan.mp3",
                "title": "ခံႏဖတဝ်း",
                "artists": "ခွန်ထက်နိုင်၊ နင်ႏခမ်းဟေမာန်",
                "youtube": "nlPP9cV6Y34",
                "video": videoProtocol + "Kham Pha Tao - Khun Htetz Naing X Nang Kham Hay Mhan.mp4"
            },
            {
                "img": imgProtocol + "raw-swa-mu.png",
                "audio": audioProtocol + "Rak Swa Mu.mp3",
                "title": "ရက်သွꩻမူႏ",
                "artists": "ခွန်ထက်နိုင်",
                "youtube": "Q1ogNwa3Fkg",
                "video": videoProtocol + "Rak Swa Mu - Khun Htetz Naing.mp4"
            },
            {
                "img": imgProtocol + "rak-lein-nar2.png",
                "audio": audioProtocol + "Rak Lein Nar - 2.mp3",
                "title": "ရက်လဲဉ်းနာꩻ  (၂) Demo",
                "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ၊ ခွန်ဝေယံစိုး",
                "youtube": "RXKlT8pj2x4",
                "video": videoProtocol + "RakLeinNar2DEMO- Khun Htetz Naing X Khun Moung X Khun Wai Yan Soe.mp4"
            },
            {
                "img": imgProtocol + "lo_lein_swa_ta_phyar.jpg",
                "audio": audioProtocol + "Lo Lein Swa Ta Phyar.mp3",
                "title": "လွိုလဲဉ်း\"သွꩻ\"တဖြာꩻ",
                "artists": "ခွန်ဖိုးသား၊ ခွန်ထက်နိုင်",
                "youtube": "qQs8eB5C_UE",
                "video": videoProtocol + "LoLeinSwaTaPhyar - Khun Phoe Thar X Khun Htetz Naing.mp4"
            },
            {
                "img": imgProtocol + "nann_leon_ngar.jpg",
                "audio": audioProtocol + "Nann Leon Ngar.mp3",
                "title": "နန်းလွဉ်ꩻငါႏ",
                "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ",
                "youtube": "dL3SWukakaY",
                "video": videoProtocol + "NannLeonNgar - Khun Htetz Naing X Khun Moung.mp4"
            },
            {
                "img": imgProtocol + "pyan_lae_lar_pay_par.png",
                "audio": audioProtocol + "Pyan Lae Lar Pay Par - Han Htet - Wai Yan Soe - Khun Htetz Naing.mp3",
                "title": "ပြန်လှည့်လာပေးပါ",
                "artists": "ဟန်ထက်၊ ခွန်ဝေယံစိုး Ft ခွန်ထက်နိုင်",
                "youtube": "2cVyVGs0MJA",
                "video": "https://www.youtube.com/watch?v=2cVyVGs0MJA"
            }
        ];
        return temp;
    }

    function changeUrlNoReload(newUrl) {
        if (isOnline()) {
            if (history.pushState) {
                window.history.pushState(document.documentElement.outerHTML, document.title, newUrl);
            } else {
                document.location.href = newUrl;
            }
        }
    }

    function getSongIdByName(title){
        var a = 0;
        songs.map(function(value,i){
            if(value.youtube == title){
                a = i;
            }
        });
        return a;
    }
});