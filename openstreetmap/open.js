function buildMap(lat,lon)  {
    // initialize map
    document.getElementById('continer-map').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
    map = L.map('map').setView([lat, lon], 13);
    // set map tiles source
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://nominatim.openstreetmap.org/search?q=london">OpenStreetMap</a> contributors',
    }).addTo(map);
    // add marker to the map
    marker = L.marker([lat, lon]).addTo(map);
    marker2 = L.marker([31.109333, 34.855499]).addTo(map);
    // add popup to the marker
    marker2.bindPopup("<div>Some Text</div>").openPopup();
    marker.bindPopup(`<div>Some Text</div><button class="openPosts">open posts</button>`).openPopup();

    map.on('click', function(e) {
    alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    var Newlat = e.latlng.lat;
    var Newlon = e.latlng.lng;
    mmarker3 = L.marker([Newlat, Newlon]).addTo(map);
    });
}

$("body").on("click","#Search",async function(){
  let value = $("#pac-input").val()
  let result = await $.get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)
   buildMap(result[0].lat, result[0].lon)
})

$("body").on("click" , ".openPosts", function(){
  document.getElementById('posts').innerHTML = "<div style='width: 100%; height: 200px; background-color: black;'></div>"
})

buildMap(32.109333,34.855499)