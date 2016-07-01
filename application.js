var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.44, lng: -123.3656},
    zoom: 12
  });

  map.addListener('idle', function(e) {
    $('#map').trigger('idle');
  });
}

$(function() {

  _500px.init({
    sdk_key: '50c46bbb5f655a00978f0b43ebba46a46abb011a'
  }); 

  $( ".image-box" ).on('click', function() {
    $(this).toggle( "slide" );
  })

$('#map').on('idle',function(){
  var lat = map.getCenter().lat();
  var lng = map.getCenter().lng();
  var bounds = map.getBounds();
  var center = map.getCenter();
  if (bounds && center) {
      var ne = bounds.getNorthEast();
        // Calculate radius (in meters).
        var radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
  }
  $('#black-box > img').remove();
  _500px.api('/photos/search', { geo: lat + ',' + lng + ',' + radius/1000 + 'km'}, function (pages){
      console.log(pages);
      for(var i = 1; i <= pages.data.total_pages && i<=5; i++){
      _500px.api('/photos/search', { geo: lat + ',' + lng + ',' + radius/1000 + 'km', page: i }, function (response) {
        photo_array = response.data.photos.forEach(function(photo){
          $("<img>").attr("src", photo.image_url).appendTo("#black-box")
        });
      });
    };
  })
})



})
