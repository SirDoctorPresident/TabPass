chrome.tabs.query({"currentWindow": true}, function(tabs){
    var urls = []
    for(var i = 0; i < tabs.length; i++) {
        urls[i] = tabs[i].url;
    }

    var qrcode = new QRCode("qrcode");
    qrcode.makeCode(JSON.stringify(urls));
});

