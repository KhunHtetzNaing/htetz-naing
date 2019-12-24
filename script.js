$(function () {

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
        currIndex = -1,
        youtubeIframe = $('#yt'),
        joox = $('.joox-container'),
        downloadMP3 = $('#dl-mp3'),
        downloadMP4 = $('#dl-mp4'),
        ytplayer ={};

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'fas fa-pause');
                audio.play();
                pauseYoutubeVideo();
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
        console.log(currIndex,flag);
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
                pauseYoutubeVideo();
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
            if(songs[currIndex].hasOwnProperty("info")){
                trackName.html(songs[currIndex].info.replace(/\n/g, '<br />'));
            }else{
                trackName.html(currArtist);
            }
            
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
        youtubeIframe.attr('src', 'https://www.youtube.com/embed/' + songs[currIndex].youtube+'?enablejsapi=1');
        downloadMP3.attr('href',songs[currIndex].audio);
        downloadMP4.attr('href',songs[currIndex].video);
        changeUrlNoReload('?id=' + currYoutube);
        $(document).ready( function() {
            console.log( "ready!" );
            onYouTubeIframeAPIReady();
        });
        if(songs[currIndex].hasOwnProperty("joox")){
            joox.show(800);
        }else{
            joox.hide(800);
        }
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
        });
        joox.on('click', function(){
            if(songs[currIndex].hasOwnProperty("joox")){
                downloadMe(songs[currIndex].joox);
            }else{
                downloadMe('https://www.joox.com/mm/artist/e9TU_G07__KhT1vPq7uVzA==');
            }
        });
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

    var url_string = window.location.href;
    var url = new URL(url_string);
    if (isHas(url_string, 'id=')) {
        var songName = url.searchParams.get("id");
        getSongIdByName(songName);
    } else {
        selectTrack(1);
    }

    function changeUrlNoReload(newUrl) {
        if (history.pushState) {
            window.history.pushState(document.documentElement.outerHTML, document.title, newUrl);
        } else {
            document.location.href = newUrl;
        }
    }

    function getSongIdByName(title) {
        songs.map(function (value, i) {
            if (value.youtube == title) {
                currIndex = i+1;
                selectTrack(-1);
            }
        });
    }

    function onYouTubeIframeAPIReady() {
        ytplayer = new YT.Player('yt', {
            events: {
              'onStateChange': onPlayerStateChange
            }
        });
      }
      
      function onPlayerStateChange(event) {
          if(event.data == 1){
              if(!audio.paused){
                playPause();
              }
          }
      }
    
      function pauseYoutubeVideo(){
        try {
            ytplayer.pauseVideo();
          }
          catch(err) {
            console.log(err);
          }
      }
});