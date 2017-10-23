  var options = document.getElementsByClassName('rs');
  var isColorMode = true;

  // Colors
  var colors = ["#A2ABEA", "#7FC9F7", "#B4D738", "#881700", "#FDD927"];


  // Get all images
  var folder = "images/";
  var images = [];
  
 /* $.ajax({
    url: folder,
    success: function(data) {
      $(data).find("a").attr("href", function(i, val) {
        if (val.match(/\.(jpe?g|png|gif)$/)) {
          //$("body").append( "<img src='"+ folder + val +"'>" );
          images.push(folder + val);
        }
      });
      setColors();
      // setImages();
    }
  });*/

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
    string = "";
    stringColor = rgbToString(color);
    x = xmlDoc.getElementsByTagName("color")[];
    for (i = 0; i < x.length; i++) { 
      string += x[i].getElementsByTagName("image");
    }
    document.getElementById("demo").innerHTML = string + stringColor;
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

  function ajaxImages(color) {
    $.ajax({
      url: folder,
      success: function(data) {
        $(data).find("a").attr("href", function(i, val) {
          if (val.match(/\.(jpe?g|png|gif)$/)) {
            //$("body").append( "<img src='"+ folder + val +"'>" );
            images.push(folder + val);
          }
        });
        setColors();
        // setImages();
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


  function setImages() {
    isColorMode = false;
    // For each option, get a random new image, making sure they aren't repeated
    var new_images = images.slice(0);
    for (var i = 0; i < options.length; i++) {
      var rand = Math.floor(Math.random() * new_images.length);
      options[i].src = new_images[rand];
      new_images.splice(rand, 1);
      // full opacity
      options[i].style.opacity = 1;
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

  function clickColor(color) {
    console.log("Clicked color " + color);
    loadXMLDoc(color);
    setImages();
  }

  function clickImage(image) {
    console.log("Clicked image " + image);
    setColors();
  }
