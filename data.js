    //OnlineTag
    var imgOnline = 'https://github.com/KhunHtetzNaing/htetz-naing/raw/master/src/img/',
        audioOnline = 'https://github.com/KhunHtetzNaing/htetz-naing/raw/master/src/audio/',
        videoOnline = 'https://gitlab.com/KhunHtetzNaing/firstrepo/raw/master/';
        
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