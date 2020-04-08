        //OnlineTag
        var imgOnline = 'https://gitlab.com/HtetzNaing/songs/-/raw/master/src/img/',
        audioOnline = 'https://gitlab.com/HtetzNaing/songs/-/raw/master/src/audio/',
        videoOnline = 'https://gitlab.com/HtetzNaing/songs/-/raw/master/src/video/';
        
function isOnline() {
  return window.location.protocol != 'file:';
}

function generateSong() {
  var imgProtocol = (isOnline() == true) ? imgOnline : './src/img/',
      audioProtocol = (isOnline() == true) ? audioOnline : './src/audio/',
      videoProtocol = (isOnline() == true) ? videoOnline : './src/video/';
  var temp = [
    {
        "img": imgProtocol + "Remix_LoLeinSwaTaPhyar_KhunHtetzNaing.png",
        "audio": audioProtocol + "Remix_LoLeinSwaTaPhyar_KhunHtetzNaing.mp3",
        "title": "လွိုလဲဉ်းသွꩻတဖြာꩻ (REMIX)",
        "artists": "ခွန်ထက်နိုင်",
        "info":"တဲမ်း - ခွန်ဖိုးသား၊ ခွန်ထက်နိုင်\nရွစ် - ခွန်ထက်နိုင်၊\nCast - Khun Htetz Naing, Khun Thar Doon, Nang Su Kyi, May Htar Khaing, Yoon Mi Mi Han, San Dar\nMusic & Mixing - July Tun\nPresented By UG Entertainment",
        "youtube": "A7tkyR7igdE",
        "video": videoProtocol + "Remix_LoLeinSwaTaPhyar_KhunHtetzNaing.mp4"
    },
    {
        "img": imgProtocol + "2AChaiSutNeZatRan.jpg",
        "audio": audioProtocol + "2 A Chai Sut Ne Zat Ran - Khun Htetz Naing X Nang Cherry Win.mp3",
        "title": "အဆုဲင်ꩻသွတ်ꩻနီဇာတ်ရဲဉ်ႏ (MV)",
        "artists": "ခွန်ထက်နိုင်၊ နင်ႏချယ်ရီဝင်း",
        "info":"ရွစ် - ခွန်ထက်နိုင်၊ နင်ႏချယ်ရီဝင်း\nတဲမ်း - ခွန်ထက်နိုင်\nMusic & Mixing - July Tun\nDirected By Khun Thu Tha",
        "youtube": "UBMLyZcHzjc",
        "video": videoProtocol + "2 A Chai Sut Ne Zat Ran - Khun Htetz Naing X Nang Cherry Win.mp4"
    },
    {
        "img": imgProtocol + "LoSayNar.jpg",
        "audio": audioProtocol + "LoSayNar-KhunLaoRak_KhunMoung_KhunHtetzNaing.mp3",
        "title": "လိုႏသေနာႏ",
        "artists": "ခွန်လဝ်းရက်၊ ခွန်မောင်ႏ၊ ခွန်ထက်နိုင်",
        "info":"တဲမ်း - ခွန်နေထွန်း၊ ခွန်မောင်ႏ၊ ခွန်ထက်နိုင်\nရွစ် - ခွန်လဝ်းရက်၊ ခွန်မောင်ႏ၊ ခွန်ထက်နိုင်\nMusic - R Phyo\nMixing - Khun Tharnge\nကင်မရာ - ထွန်းဓါတ်ပုံ၊ ကိုငယ်(မိုင်းပွန်)\nတည်းဖြတ် - ဦးခွန်ဆန်းတစ်",
        "youtube": "Yx-KNGjj4K8",
        "video": videoProtocol + "LoSayNar-KhunLaoRak_KhunMoung_KhunHtetzNaing.mp4"
    },
    {
        "img": imgProtocol + "vday.png",
        "audio": audioProtocol + "VDay-KhunHtetzNaingXKhunWaiYanSoeXKhunPaungPaungXKhunMoung.mp3",
        "title": "ထာꩻရက်မွူးနီꩻ (V Day)",
        "artists": "ခွန်ထက်နိုင်၊ ခွန်ဝေယံစိုး၊ ခွန်ပေါင်းပေါင်း၊ ခွန်မောင်ႏ",
        "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်၊ ခွန်ဝေယံစိုး၊ ခွန်ပေါင်းပေါင်း၊ ခွန်မောင်ႏ\nProd. by July Tun\n Cover Design by Wai Yan\nLyrics Video by Phone Hay Ko",
        "youtube": "AaX5l9IYdlY",
        "joox":"https://www.joox.com/mm/single/UxT4qBH5C4IbKbhdUA4UYQ==",
        "video": videoProtocol + "VDay-KhunHtetzNaingXKhunWaiYanSoeXKhunPaungPaungXKhunMoung.mp4"
    },
    {
        "img": imgProtocol + "ForYou.png",
        "audio": audioProtocol + "ForYou-KhunHtetzNaing.mp3",
        "title": "မင်းအတွက် (For You)",
        "artists": "ခွန်ထက်နိုင်",
        "info":"ရေး/ဆို - ခွန်ထက်နိုင်\nBeat - Holding You by Dizzla D Music\nMixing - Khun Tharnge\nCamera & Edit - Kaung Kham(Hopong)",
        "youtube": "P4V_1xq4XE8",
        "joox":"https://www.joox.com/mm/single/wVJN6jvHE162jJsB++qeYw==",
        "video": videoProtocol + "ForYou-KhunHtetzNaing.mp4"
    },
    {
        "img": imgProtocol + "nann_leon_ngar.jpg",
        "audio": audioProtocol + "Nann Leon Ngar.mp3",
        "title": "နန်းလွဉ်ꩻငါႏ",
        "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ",
        "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ\nပွုံႏဆောင်ႏ - ခွန်ထက်နိုင်၊ နင်ႏနွယ်နီခမ်း၊ ခွန်မောင်ႏ\nEditor - Aung Khin\nDirector - Phone Hay Ko\nProd. by Khun Tharnge",
        "joox":"https://www.joox.com/mm/single/M65CY76mDRcUPBSniAmXNw==",
        "youtube": "g5uvfqOAS4A",
        "video": videoProtocol + "NannLeonNgar_KhunHtetzNaing_X_KhunMoung.mp4"
    },
    {
        "img": imgProtocol + "NarTaAoTaoMueNeJwel.jpg",
        "audio": audioProtocol + "NarTaAoTaoMueNeJwel - Khun Htetz Naing Ft Khun Moung.mp3",
        "title": "နာꩻတအဝ်ႏတဝ်းမွူးနီꩻစွယ်ꩻ",
        "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ",
        "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ\nပွုံႏဆောင်ႏ - ခွန်ထက်နိုင်၊ Nang Shang Hom(နင်ႏဟွမ်ဟွိုန်ႏ)\nMusic - R Phyo\nMixing - Khun Tharnge\nDirected By Khun Thu Ta\nThanks - Zin Maung Htun, Khun Wai Yan Soe",
        "youtube": "CoRehNuFBtY",
        "joox":"https://www.joox.com/mm/single/+kV40Edbm6ZaRawhklhNug==",
        "video": videoProtocol + "NarTaAoTaoMueNeJwel - Khun Htetz Naing Ft Khun Moung.mp4"
    },
    {
        "img": imgProtocol + "AfterYouLeave-Artwork.jpg",
        "audio": audioProtocol + "After You Leave - Khun Zaw Oo X Khun Htetz Naing.mp3",
        "title": "After You Leave",
        "artists": "ခွန်ဇော်ဦး၊ ခွန်ထက်နိုင်",
        "info":"တဲမ်း - ခွန်ကျော်လိန် ၊ ခွန်ထက်နိုင်\nရွစ် - ခွန်ဇော်ဦး၊ ခွန်ထက်နိုင်\nပွုံႏဆောင်ႏ - နင်ႏပြုံးကြည်\nဒါရိုက်တာ/ကင်မရာ - ခွန်အောင်မြင့်၊ ခွန်ထွန်းလေး\nDrone - ခွန်ဟောဝ်ရက်\nProd. By Khun Tharnge",
        "youtube": "rsDXFM3VAWE",
        "video": videoProtocol + "After You Leave - Khun Zaw Oo X Khun Htetz Naing.mp4"
    },
    {
        "img": imgProtocol + "ForgiveForever.jpg",
        "audio": audioProtocol + "Forgive Forever - Khun Wai Yan Soe X Khun Htetz Naing.mp3",
        "title": "Forgive Forever",
        "artists": "ခွန်ဝေယံစိုး၊ ခွန်ထက်နိုင်",
        "info":"တဲမ်း - ခွန်အာကာ(NP) ၊ ခွန်ထက်နိုင်\nရွစ် - ခွန်ဝေယံစိုး၊ ခွန်ထက်နိုင်\nProd. By Khun Tharnge",
        "youtube": "bmwNWBlpKbA",
        "video": videoProtocol + "Forgive Forever - Khun Wai Yan Soe X Khun Htetz Naing.mp4"
    },
    {
        "img": imgProtocol + "PaOMaLay.jpg",
        "audio": audioProtocol + "PaOMaLay-KhunHtetzNaing.mp3",
        "title": "ပအိုဝ်းမလေး",
        "artists": "ခွန်ထက်နိုင်",
        "info":"ရေး/ဆို - ခွန်ထက်နိုင်\nသရုပ်ဆောင် - နန်းသီတာအောင်\nMusic & Mixing - July Tun\nRecord - Khun Tharnge\nCamera & Edit - Khun San Thit",
        "joox":"https://www.joox.com/mm/single/7vs2FMw0tuLt5WKICxlYgw==",
        "youtube": "sXE3wsWB1Lo",
        "video": videoProtocol + "PaOMaLay-KhunHtetzNaing.mp4"
    },
    {
        "img": imgProtocol + "AoRakDyarTat.jpg",
        "audio": audioProtocol + "Ao Rak Dyar Tat - Khun Htetz Naing X Khun Saung Phay X Khun Moung.mp3",
        "title": "အဝ်ႏရက်ဒျာႏတဲ့",
        "artists": "ခွန်ထက်နိုင်၊ ခွန်ဆောင်းဖေ၊ ခွန်မောင်ႏ",
        "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်၊ ခွန်ဆောင်းဖေ၊ ခွန်မောင်ႏ\nMusic & Mixing by Khun Tharnge\nRecord - Khun Tharnge & Khun Naing Win Phyo",
        "youtube": "caRxOvCFr_E",
        "video": videoProtocol + "Ao Rak Dyar Tat - Khun Htetz Naing X Khun Saung Phay X Khun Moung.mp4"
    },
      {
          "img": imgProtocol + "YamSayNar.jpg",
          "audio": audioProtocol + "Yam Say Nar - Htetz Naing X Tun Lwin.mp3",
          "title": "ယံသေနာႏ",
          "artists": "ခွန်ထွန်းလွင်၊ ခွန်ထက်နိုင်",
          "info":"တဲမ်း/ရွစ် - ခွန်ထွန်းလွင်၊ ခွန်ထက်နိုင်\nMusic - July Tun\nMixing - Khun Tharnge",
          "youtube": "piQ4-BaRqmM",
          "joox":"https://www.joox.com/mm/single/3M_sIK3JOrXd+_XPOx2mqA==",
          "video": videoProtocol + "YamSayNar - Khun Htetz Naing X Khun Tun Lwin.mp4"
      },
      {
          "img": imgProtocol + "tam-pho.jpg",
          "audio": audioProtocol + "Tam Pho - Khun Lao Rak X Khun Htetz Naing X Khun Moung.mp3",
          "title": "တန်ႏဖိုꩻ",
          "artists": "ခွန်လဝ်းရက်၊ ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ",
          "info":"တဲမ်း/ရွစ် - ခွန်လဝ်းရက်၊ ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ\nMusic - Khun Myo Aung\nMixing - Khun Tharnge",
          "youtube": "R_qEAThSh3I",
          "joox":"https://www.joox.com/mm/single/NrLo2a8kBniaUyZ7OtAdSw==",
          "video": videoProtocol + "TamPho - Khun Lao Rak X Khun Htetz Naing X Khun Moung.mp4"
      },
      {
          "img": imgProtocol + "AChaiSutNeZatRan.jpg",
          "audio": audioProtocol + "A Chai Sut Ne Zat Ran - Khun Htetz Naing X Nang Cherry Win.mp3",
          "title": "အဆုဲင်ꩻသွတ်နီဇာတ်ရဲဉ်ႏ",
          "artists": "ခွန်ထက်နိုင်၊ နင်ႏချယ်ရီဝင်း",
          "info":"တဲမ်း - ခွန်ထက်နိုင်\nရွစ် - ခွန်ထက်နိုင်၊ နင်ႏချယ်ရီဝင်း\nMusic & Mixing - July Tun\nRecord - Khun Tharnge",
          "youtube": "HLWLzR48cxA",
          "video": videoProtocol + "AChaiSwutNeeZatRan - Khun Htetz Naing X Nang Cherry Win.mp4"
      },
      {
          "img": imgProtocol + "RakLeinNar2_FINAL.png",
          "audio": audioProtocol + "Rak Lein Nar 2 - Khun Htetz Naing - Khun Moung - Khun Wai Yan Soe.mp3",
          "title": "ရက်လဲဉ်းနာꩻ (၂)",
          "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ၊ ခွန်ဝေယံစိုး",
          "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ၊ ခွန်ဝေယံစိုး\nပွုံႏဆောင်ႏ - နင်ႏနှင်းဝေ\nDirected by Phone Hay Ko\nMusic & Mixing - July Tun\nRecord - Khun Tharnge",
          "joox":"https://www.joox.com/mm/single/doBVnY_ZEFH2bg0ODBsrOA==",
          "youtube": "Axu4DcLMxLE",
          "video": videoProtocol + "RakLeinNar2 - Khun Htetz Naing X Khun Moung X Khun Wai Yan Soe.mp4"
      },
      {
          "img": imgProtocol + "kham.png",
          "audio": audioProtocol + "Kham - Khun Htetz Naing Ft Khun Moung.mp3",
          "title": "ခမ်း",
          "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ",
          "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ\nMusic - R Phyo\nMixing - Khun Tharnge",
          "youtube": "IhJk273Kgoc",
          "joox":"https://www.joox.com/mm/single/ljrdTi79on5hZOiWOVYU0w==",
          "video": videoProtocol + "Kham - Khun Htetz Naing X Khun Moung.mp4"
      },
      {
          "img": imgProtocol + "nar_yue_phay_bai.png",
          "audio": audioProtocol + "Nar Yue Phay Bai.mp3",
          "title": "နာꩻယူႏဖေႏဗဲင်း",
          "artists": "ခွန်ဆောင်းဖေး၊ ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ",
          "info":"တဲမ်း - ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ\nရွစ် - ခွန်ဆောင်းဖေ၊ ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ\nProd. by Khun Tharnge",
          "joox":"https://www.joox.com/mm/single/0gwuleMQ9lngKd7eDrnaQA==",
          "youtube": "kAMfi2uU_MU",
          "video": videoProtocol + "NarYuePhayBai - Khun Soung Phay X Khun Htetz Naing X Khun Moung.mp4"
      },
      {
          "img": imgProtocol + "rak_lein_nar.jpg",
          "audio": audioProtocol + "Rak Lein Nar.mp3",
          "title": "ရက်လဲဉ်းနာꩻ",
          "artists": "ခွန်ထက်နိုင်",
          "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်\nပွုံႏဆောင်ႏ - ခွန်ထက်နိုင်၊ နင်ႏနှင်းဝေ\nDirected by Phone Hay Ko\nProd. by Khun Tharnge",
          "joox":"https://www.joox.com/mm/single/pPgjbsGZQW+hpAsCE8eohg==",
          "youtube": "-0M4Rw5tV1I",
          "video": videoProtocol + "RakLeinNar - Khun Htetz Naing.mp4"
      },
      {
          "img": imgProtocol + "kyay_nat_dyar.jpg",
          "audio": audioProtocol + "Kyay Nat Dyar - 2 By Khun Htetz Naing.mp3",
          "title": "ကေႏနပ်ဒျာႏ",
          "artists": "ခွန်ထက်နိုင်",
          "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်\nပွုံႏဆောင်ႏ - Khun Htetz Naing, Khun T Htwe, Karyan Shoon Lae\nDirected by KhunThuTa\nMusic & Mixing - July Tun\nRecord - Khun Tharnge",
          "youtube": "3AP0b1VEJ9U",
          "joox":"https://www.joox.com/mm/single/4XOsfkhFFxww0XGdmHycuw==",
          "video": videoProtocol + "KayNatDyar - Khun Htetz Naing.mp4"
      },
      {
          "img": imgProtocol + "rak-ta-phae-sar.jpg",
          "audio": audioProtocol + "Rak Ta Phae Sar - NEW.mp3",
          "title": "ရက်တဖဲ့ꩻသား",
          "artists": "ခွန်ထက်နိုင်",
          "youtube": "VLlQ-jI0QVM",
          "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်\nMusic - R Phyo\nMixing - Khun Tharnge",
          "joox":"https://www.joox.com/mm/single/LJdFoP78oRJjS7d+cskLMA==",
          "video": videoProtocol + "Rak Ta Phae Sar - Khun Htetz Naing.mp4"
      },
      {
          "img": imgProtocol + "kham_pa_tao.jpg",
          "audio": audioProtocol + "KhamPhaTao_KhunHtetzNaing_ft_NangKhamHayMhan.mp3",
          "title": "ခံႏဖတဝ်း",
          "artists": "ခွန်ထက်နိုင်၊ နင်ႏခမ်းဟေမာန်",
          "info":"တဲမ်း - ခွန်ထက်နိုင်\nရွစ် - ခွန်ထက်နိုင်၊ နင်ႏခမ်းဟေမာန်\nMusic - NagarLay\nMixing - Khun Naing Win Phyo",
          "youtube": "nlPP9cV6Y34",
          "joox":"https://www.joox.com/mm/single/6hwuq_tDaJ7DEOTLkLZAaA==",
          "video": videoProtocol + "Kham Pha Tao - Khun Htetz Naing X Nang Kham Hay Mhan.mp4"
      },
      {
          "img": imgProtocol + "raw-swa-mu.png",
          "audio": audioProtocol + "Rak Swa Mu.mp3",
          "title": "ရက်သွꩻမူႏ",
          "artists": "ခွန်ထက်နိုင်",
          "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်\nProd. by Khun Tharnge",
          "joox":"https://www.joox.com/mm/single/z1GTv7VKBolzJ1eA1JTrWg==",
          "youtube": "Q1ogNwa3Fkg",
          "video": videoProtocol + "Rak Swa Mu - Khun Htetz Naing.mp4"
      },
      {
          "img": imgProtocol + "rak-lein-nar2.png",
          "audio": audioProtocol + "Rak Lein Nar - 2.mp3",
          "title": "ရက်လဲဉ်းနာꩻ  (၂) Demo",
          "artists": "ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ၊ ခွန်ဝေယံစိုး",
          "info":"တဲမ်း/ရွစ် - ခွန်ထက်နိုင်၊ ခွန်မောင်ႏ၊ ခွန်ဝေယံစိုး\nMusic - NagarLay\nMixing - Khun Tharnge",
          "youtube": "RXKlT8pj2x4",
          "joox":"https://www.joox.com/mm/single/doBVnY_ZEFH2bg0ODBsrOA==",
          "video": videoProtocol + "RakLeinNar2DEMO- Khun Htetz Naing X Khun Moung X Khun Wai Yan Soe.mp4"
      },
      {
          "img": imgProtocol + "lo_lein_swa_ta_phyar.jpg",
          "audio": audioProtocol + "Lo Lein Swa Ta Phyar.mp3",
          "title": "လွိုလဲဉ်း\"သွꩻ\"တဖြာꩻ",
          "artists": "ခွန်ဖိုးသား၊ ခွန်ထက်နိုင်",
          "info":"တဲမ်း/ရွစ် - ခွန်ဖိုးသား၊ ခွန်ထက်နိုင်\nMusic - Khun Htun Oo\nMixing - Khun Paing Moe",
          "youtube": "qQs8eB5C_UE",
          "video": videoProtocol + "LoLeinSwaTaPhyar - Khun Phoe Thar X Khun Htetz Naing.mp4"
      },
      {
          "img": imgProtocol + "pyan_lae_lar_pay_par.png",
          "audio": audioProtocol + "Pyan Lae Lar Pay Par - Han Htet - Wai Yan Soe - Khun Htetz Naing.mp3",
          "title": "ပြန်လှည့်လာပေးပါ",
          "artists": "ဟန်ထက်၊ ခွန်ဝေယံစိုး Ft ခွန်ထက်နိုင်",
          "info":"တေးရေး - ဟန်ထက်၊ ခွန်ထက်နိုင်\nတေးဆို - ဟန်ထက်၊ ခွန်ဝေယံစိုး၊ ခွန်ထက်နိုင်\nProd. by Khun Tharnge",
          "youtube": "2cVyVGs0MJA",
          "video": "https://www.youtube.com/watch?v=2cVyVGs0MJA"
      }
  ];
  return temp;
}