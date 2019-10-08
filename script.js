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
        albums = ['ခမ်း', 'နာꩻယူႏဖေႏဗဲင်း', 'ရက်လဲဉ်းနာꩻ', 'ကေႏနပ်ဒျာႏ', 'ရက်တဖဲ့ꩻသား', 'ခံႏဖတဝ်း', 'ရက်သွꩻမူႏ', 'ရက်လဲဉ်းနာꩻ  (၂) Demo', 'လွိုလဲဉ်း"သွꩻ"တဖြာꩻ', 'နန်းလွဉ်ꩻငါႏ', 'ပြန်လှည့်လာပေးပါ'],
        trackNames = ['ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ', 'ခွန်ဆောင်းဖေး၊ ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ', 'ခွန်ထက်နိုင်', 'ခွန်ထက်နိုင်', 'ခွန်ထက်နိုင်၊ နင်ႏခမ်းဟေမာန်', 'ခွန်ထက်နိုင်', 'ခွန်ထက်နိုင်', 'ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ၊ ခွန်ဝေယံစိုး', 'ခွန်ဖိုးသား၊ ခွန်ထက်နိုင်', 'ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ', 'ဟန်ထက်၊ ခွန်ဝေယံစိုး၊ ခွန်ထက်နိုင်'],
        albumArtworks = ['_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9', '_10', '_11'],
        trackUrl = ['./src/audio/Kham - Khun Htetz Naing Ft Khun Moung.mp3',
            './src/audio/Nar Yue Phay Bai.mp3',
            './src/audio/Rak Lein Nar.mp3',
            './src/audio/Kyay Nat Dyar - 2 By Khun Htetz Naing.mp3',
            './src/audio/Rak Ta Phae Sar - NEW.mp3',
            './src/audio/KhamPhaTao_KhunHtetzNaing_ft_NangKhamHayMhan.mp3',
            './src/audio/Rak Swa Mu.mp3', './src/audio/Rak Lein Nar - 2.mp3', './src/audio/Lo Lein Swa Ta Phyar.mp3', './src/audio/Nann Leon Ngar.mp3', './src/audio/Pyan Lae Lar Pay Par - Han Htet - Wai Yan Soe - Khun Htetz Naing.mp3'
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

    $.each(trackUrl, function(key, value) {
        var img = 1 + key;
        $('.play-list').append(`<li id="` + img + `"><div class="play">
        <div class="album-thumb pull-left">
            <img src="` + $('#_' + img).attr('src') + `">
        </div>
        <div class="songs-info pull-left">
            <div class="song-title">` + albums[key] + `</div>
            <div class="songs-detail">
                <span class="song-artist">` + trackNames[key] + `</span>
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

        if ((currIndex > -1) && (currIndex < trackUrl.length)) {
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

            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audio.src = trackUrl[currIndex];

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find('img.active').removeClass('active');
            $('#' + currArtwork).addClass('active');
            $(document).prop('title', '🎵 ' + currAlbum + ' - ' + currTrackName);
            $('link[rel="shortcut icon"]').attr('href', $('#' + currArtwork).attr('src'));
            bgArtworkUrl = $('#' + currArtwork).attr('src');

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
            window.open(trackUrl[currIndex]);
        })
    }

    $('ol.play-list li').click(function(e) {
        currIndex = this.id;
        selectTrack(-1);
    })


    initPlayer();
});