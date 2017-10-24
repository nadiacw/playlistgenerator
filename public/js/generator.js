  var options = document.getElementsByClassName('rs');
  var isColorMode = true;

  // Colors
  var colors = ["#A2ABEA", "#7FC9F7", "#B4D738", "#881700", "#FDD927"];
  var nbSteps = 0;
  var clickedImg = [];
  var colorOn = true;
  var images = [];

  $(document).ready(function(){
      setColors();
  });

  function loadXMLDoc(color) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        getImages(this, color);
      }
    };
    xmlhttp.open("GET", "images.xml" , true);
    xmlhttp.send();
  }

  function getImages(xml, color) {
    var x, i, xmlDoc, table;
    xmlDoc = xml.responseXML;
    imageList = null;
    string = "";
    stringColor = rgbToString(color);
    x = xmlDoc.getElementsByTagName("color");
    for (i = 0; i < x.length; i++) {
      if (x[i].getAttribute("category") == stringColor) {
        imageList = x[i].getElementsByTagName("image");

        for (j = 0; j < imageList.length; j++) {
          string += imageList[j].getAttribute("category") + ";";
        }
      }
    }
    ajaxImages(string, stringColor);
  }

  function rgbToString(rgb) {
    if (rgb == "rgb(162, 171, 234)")
        return "purple";
    else if (rgb == "rgb(127, 201, 247)")
      return "blue";
    else if (rgb == "rgb(180, 215, 56)")
      return "green";
    else if (rgb == "rgb(136, 23, 0)")
      return "red";
    else if (rgb == "rgb(253, 217, 39)")
      return "yellow";
    else return null;
  }

  function stringToHex(string) {
    if (string == "purple")
      return "#A2ABEA";
    else if (string == "blue")
      return "#7FC9F7";
    else if (string == "green")
      return "#B4D738";
    else if (string == "red")
      return "#881700";
    else if (string == "yellow")
      return "#FDD927";
    else return null;
  }

  function ajaxImages(listImages, color) {
    folder = "images/" + color + "/";
    $.ajax({
      url: folder,
      success: function(data) {
        $(data).find("a").attr("href", function(i, val) {
          if (val.match(/\.(jpe?g|png|gif)$/)) {
            //$("body").append( "<img src='"+ folder + val +"'>" );
            images.push(folder + val);
          }
        });
        setImages(images);
      }
    });
  }

  function setColors() {
    isColorMode = true;
    // For each option, get a random new color, making sure they aren't repeated
    var new_colors = colors.slice(0);
    for (var i = 0; i < options.length; i++) {
      var rand = Math.floor(Math.random() * new_colors.length);
      // hide images
      options[i].style.opacity = 0;
      options[i].parentNode.style.backgroundColor = new_colors[rand];
      new_colors.splice(rand, 1);
    }
  }


  function setImages(images) {
    isColorMode = false;
    // For each option, get a random new image, making sure they aren't repeated
    var new_images = images.slice(0);
    for (var i = 0; i < options.length; i++) {
      var rand = Math.floor(Math.random() * new_images.length);
      options[i].src = new_images[rand];
      new_images.splice(rand, 1);
      // full opacity
      options[i].style.opacity = 1;
      options[i].parentNode.style.backgroundColor = "transparent";
    }
  }

  // Add listeners for options
  for (var i = 0; i < options.length; i++) {
    options[i].onclick = function() {
      if (isColorMode)
        clickColor(this.parentNode.style.backgroundColor);
      else
        clickImage(this.src);
    };
  }

  document.getElementById("rectangle").onclick = function() {
    if(colorOn)
      setColors();
    else
      setImages(images);
  }

  function clickColor(color) {
    console.log("Clicked color " + color);
    clickedImg.push(stringToHex(rgbToString(color)));
    colorOn = false;
    images = [];
    loadXMLDoc(color);
  }

  function clickImage(image) {
    console.log("Clicked image " + image);
    clickedImg.push(image.split("http://localhost:8000/")[1]);
    if (++nbSteps >= 2) {
      location.href = location.href+'?var1='+clickedImg[0]+'&var2='+clickedImg[1]+'?var3='+clickedImg[2]+'?var4='+clickedImg[3];
      window.location.assign("playlist.html"+'?var1='+clickedImg[0]+'?var2='+clickedImg[1]+'?var3='+clickedImg[2]+'?var4='+clickedImg[3]);
    } else {
      colorOn = true;
      setColors();
    }
  }
