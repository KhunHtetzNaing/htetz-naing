<?php

?>

<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="HandheldFriendly" content="true">
<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.3.1/css/all.css'>
<link rel="stylesheet" href="https://rawcdn.githack.com/KhunHtetzNaing/htetz-naing/2549be56becfe668db9b0f57559d8c1eaecb0603/style.css">
<link rel="stylesheet" href='https://mmwebfonts.comquas.com/fonts/?font=mon3' />
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script  src="https://rawcdn.githack.com/KhunHtetzNaing/htetz-naing/2549be56becfe668db9b0f57559d8c1eaecb0603/data.js"></script>
<?php

if(isset($_GET['id'])){
    $html = file_get_contents('https://rawcdn.githack.com/KhunHtetzNaing/htetz-naing/2549be56becfe668db9b0f57559d8c1eaecb0603/data.js',true);
    $raw = getStringBetween($html,'temp = ',';');

    $imgOnline = getStartUrl('imgOnline',$html);
    $audioOnline = getStartUrl('audioOnline',$html);
    $videoOnline = getStartUrl('videoOnline',$html);

    $html = str_replace("\n","",$html);
    $raw = getJson($html);
    $raw = str_replace("imgProtocol+\"","\"$imgOnline",$raw);
    $raw = str_replace("audioProtocol+\"","\"$audioOnline",$raw);
    $raw = str_replace("videoProtocol+\"","\"$videoOnline",$raw);
    
    $json = json_decode($raw,true);

    $homePage = true;
foreach ($json as $key => $value) {
    if($value['youtube']==$_GET["id"]){
        $youtube = $value['youtube'];
        $title = $value['title'];
        $img = $value['img'];
        $artists = $value['artists'];
        echoMeta($youtube,$title,$img,$artists);
        $homePage = false;
        break;
    }
}

if($homePage==true){
    echoDefault();
}
}else{
    echoDefault();
}

function getJson($html){
    $re = '/temp=(.*)];/';
    preg_match_all($re, $html, $matches, PREG_SET_ORDER, 0);
    return $matches[0][1].']';
}

function getStartUrl($what,$html){
    $re = '/'.$what.' ?= ?\'(.*?)\'/';
    preg_match_all($re, $html, $matches, PREG_SET_ORDER, 0);
    return $matches[0][1];
}

function showLog($msg){
    echo "<script>console.log(`$msg`);</script>";
}

function getBaseUrl() {
    // output: /myproject/index.php
    $currentPath = $_SERVER['PHP_SELF']; 

    // output: Array ( [dirname] => /myproject [basename] => index.php [extension] => php [filename] => index ) 
    $pathInfo = pathinfo($currentPath); 

    // output: localhost
    $hostName = $_SERVER['HTTP_HOST']; 

    // output: http://
    $protocol = strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,5))=='https'?'https':'http';

    // return: http://localhost/myproject/
    return $protocol.'://'.$hostName.$pathInfo['dirname'];
}

function echoDefault(){
    echo '<!-- MetaTag -->
    <!-- Primary Meta Tags -->
    <meta name="title" content="Khun Htetz Naing">
    <meta name="description" content="PaOh Rap singer,PaOh Hip Hop songs">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://khunhtetznaing.com/">
    <meta property="og:title" content="Khun Htetz Naing - PaOh Rap">
    <meta property="og:description" content="PaOh Rap singer,PaOh Hip Hop songs">
    <meta property="og:image" content="https://i.imgur.com/a7EoTIc.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://khunhtetznaing.com/">
    <meta property="twitter:title" content="Khun Htetz Naing - PaOh Rap">
    <meta property="twitter:description" content="PaOh Rap singer,PaOh Hip Hop songs">
    <meta property="twitter:image" content="https://i.imgur.com/a7EoTIc.png">';
}

function echoMeta($youtube,$title,$img,$artists){
    echo '<link rel="shortcut icon" type="image/png" href="'.$img.'"/>
    <title>'.$title.' 🎵</title>
    <!-- MetaTag -->
    <!-- Primary Meta Tags -->
    <meta name="title" content="🎵 '.$title.' 🎶">
    <meta name="description" content="🎤 '.$artists.' 🎙️">
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="'.getBaseUrl().'?id='.$youtube.'">
    <meta property="og:title" content="🎵 '.$title.' 🎶">
    <meta property="og:description" content="🎤 '.$artists.' 🎙️">
    <meta property="og:image" content="'.$img.'">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content='.getBaseUrl().'?id='.$youtube.'">
    <meta property="twitter:title" content="🎵 '.$title.' 🎶">
    <meta property="twitter:description" content="🎤 '.$artists.' 🎙️">
    <meta property="twitter:image" content="'.$img.'">';
}

function getStringBetween($str,$from,$to){
    $sub = substr($str, strpos($str,$from)+strlen($from),strlen($str));
    return substr($sub,0,strpos($sub,$to));
}


?>
</head>
<body>
<!-- partial:index.partial.html -->
<!-- Tracks used in this music/audio player application are free to use. I downloaded them from Soundcloud and NCS websites. I am not the owner of these tracks. -->
    <div id="app-cover">
        <div id="bg-artwork"></div>
        <div id="bg-layer"></div>
        <div id="player">
            <div id="player-track">
                <div id="album-name"></div>
                <div id="track-name"></div>
                <div id="track-time">
                    <div id="current-time"></div>
                    <div id="track-length"></div>
                </div>
                <div id="s-area">
                    <div id="ins-time"></div>
                    <div id="s-hover"></div>
                    <div id="seek-bar"></div>
                </div>
            </div>
            <div id="player-content">
                <div id="album-art">
                    <div id="buffer-box">Buffering ...</div>
                </div>
                <div id="player-controls">
                    <div class="control">
                        <div class="button" id="play-previous">
                            <i class="fas fa-backward"></i>
                        </div>
                    </div>
                    <div class="control">
                        <div class="button" id="play-pause-button">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="control">
                        <div class="button" id="play-next">
                            <i class="fas fa-forward"></i>
                        </div>
                    </div>

                    <div class="control">
                        <div class="button" id="download">
                            <i class="fas fa-download">
                                
                            </i>
                        </div>
                    </div>
                </div>
            </div>
            <ol class="play-list">
            </ol>
        </div>
    </div>
<!-- partial -->
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
<script  src="https://rawcdn.githack.com/KhunHtetzNaing/htetz-naing/2549be56becfe668db9b0f57559d8c1eaecb0603/script.js"></script>
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5dcbe75e99b6adbf"></script>
</body>
</html>