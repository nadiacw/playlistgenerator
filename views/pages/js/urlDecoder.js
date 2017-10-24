var url = window.location.href;
var url_arr = url.split("?");
document.getElementById("img1").setAttribute("src", "../" + url_arr[2].split("=")[1]);
document.getElementById("img2").setAttribute("src", "../" + url_arr[4].split("=")[1]);
document.getElementById("color1").style.background = url_arr[1].split("=")[1];
document.getElementById("color2").style.background = url_arr[3].split("=")[1];