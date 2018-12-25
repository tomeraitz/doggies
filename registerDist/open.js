function buildMap(lat,lon)  {
    // initialize map
    $('#map').empty();
    $('#map').append("<div id='mapDetials' style='width: 100%; height: 100%;'></div>")
    map = L.map('map').setView([lat, lon], 13);
    // set map tiles source
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://nominatim.openstreetmap.org/search?q=london">OpenStreetMap</a> contributors',
    }).addTo(map);
    // add marker to the map
    marker = L.marker([32.109333, 34.855499]).addTo(map);
    // add popup to the marker
   // marker.bindPopup("<div>Some Text</div>").openPopup();
    
   marker.on("click" ,function(){
    marker.bindPopup("<div>Some Text</div>").openPopup();
})

    map.on('click', function(e) {
    let Newlat = e.latlng.lat;
    let Newlon = e.latlng.lng;
    mmarker2 = L.marker([Newlat, Newlon]).addTo(map);
    });
}

$("body").on("click","#search-icon",async function(){
  let value = $("#search-inpt").val()
  let result = await $.get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)
  console.log(result[0].lat + " " + result[0].lon)
   map.remove()
   buildMap(result[0].lat, result[0].lon)
})

$("body").on("click" , ".openPosts", function(){
  document.getElementById('posts').innerHTML = "<div style='width: 100%; height: 200px; background-color: black;'></div>"
})



buildMap(32.109333,34.855499)