
// Get all images
var folder = "images/";
var images = [];
$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) {
                // $("body").append( "<img src='"+ folder + val +"'>" );
                images.push(folder + val);
            }
        });
        setImages();
    }
});

function setImages(){
  // For each option, get a random new image, making sure they aren't repeated
  var options = document.getElementsByClassName('rs');
  var new_images = images.slice(0);
  for (var i = 0; i < options.length; i++) {
    var rand = Math.floor(Math.random() * new_images.length);
    options[i].src = new_images[rand];
    new_images.splice(rand,1);
  }
}
