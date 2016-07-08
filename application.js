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

    var time_mod = 0
    function addRow(response){
      var row = $("<div>").addClass('row').appendTo("#black-box")
      photo_array = response.data.photos.forEach(function(photo){
        $('<img>').attr("src", photo.image_url).addClass('hidden').addClass('transition').appendTo(row)
      });
      setTimeout(function(){
        row.children().removeClass('hidden')
      },720+(80*time_mod))
      time_mod += 1
    }

    // $('.row > img').addClass('hidden').fadeOut(2200, function(){
    //   $(this).remove()
    // })
    $('.row').addClass('fast').fadeOut(720, function(){
      $(this).remove()
    })
    // $('.row').each(function(index){
    //   var row = $(this)
    //   setTimeout(function(){
    //     row.addClass('fast').fadeOut(720, function(){
    //       $(this).remove()
    //     })
    //   },80*index)
    // })

    for(var i = 1; i<=5; i++){
      _500px.api('/photos/search', { geo: lat + ',' + lng + ',' + radius/1000 + 'km', page: i }, addRow);
    };
  })



})
