var KEYS = ["8b1a9"];
var LIN = ["U2FsdGVkX19j5VU41UpJ3kIHCgjjxBjy7mhuXFT/CTvWZXgQDMC/ndDIkZtzcEe3CGRGqeqUv9a/q/faLDNfzw=="];
var clicks = 0;
var sessionkey = "";

function func() {
	alert(CryptoJS.AES.encrypt("something", "something"));
	document.getElementById("IFR").style = "opacity: 100%";
	
	var fKEY = document.getElementById("pswd").value;
	if(CryptoJS.MD5(fKEY).toString(CryptoJS.enc.Hex).substring(0, 5) == KEY){
		alert("WOW");
		var fLIN = CryptoJS.AES.decrypt(LIN, fKEY).toString(CryptoJS.enc.Utf8);
		document.getElementById("IFR").src = fLIN;
	}
}

function clickdetect(){
	clicks++;
	if (clicks>=10){
		forpswd();
		clicks = 0;
	}
}

function hidedesmos(){
	document.getElementById("dsms").style="display: none;";
	document.getElementById("footer").style="display: none;";
}

function forpswd(){
	mdui.prompt("请提供调试 ID", "开发者模式", function(value){pswdchk(value)});
}

function pswdchk(value) {
	fKEY = CryptoJS.MD5(value).toString(CryptoJS.enc.Hex).substring(0, 5);
	fLIN = "";
	for (var i = 0; i<KEYS.length; i++){
		if (fKEY == KEYS[i]){
			fLIN = LIN[i]
		}
	}
	if (fLIN==""){mdui.alert("无效的调试 ID。");return 0;}
	sessionkey = value;
	hidedesmos();
	document.getElementById("IFR").src = CryptoJS.AES.decrypt(fLIN, value).toString(CryptoJS.enc.Utf8);
	document.getElementById("IFR").style = "display: inline;width : 100%;height : 100%;"
	document.getElementById("mydiv").style.top=0 
}

function syncfromfore(){
	document.getElementById("after").value = CryptoJS.AES.encrypt(document.getElementById("fore").value, sessionkey).toString();
}

function syncfromafter(){
	document.getElementById("fore").value = CryptoJS.AES.decrypt(document.getElementById("after").value, sessionkey).toString(CryptoJS.enc.Utf8);
}