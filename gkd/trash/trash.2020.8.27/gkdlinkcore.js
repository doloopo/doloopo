function getGKDLINK(link, key) {
    return "gkd://" + DES3.encrypt(key, link, true) + "/" + BASE64.encoder(key) + "/";
}

function getSource(gkdlink) {
    var a = gkdlink.substring(6).split('/');
    return [DES3.decrypt(BASE64.decoder(a[1]), a[0]), BASE64.decoder(a[1])]; 
}