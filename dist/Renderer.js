class Renderer {
    constructor(){
        this.map = ""
    }
    renderGardenData(user, id) {
        $(`#${id}`).empty();
        const source = $('#events-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({user});
        $(`#${id}`).append(newHTML)
    }

    buildMap(lat,lon)  {
        // initialize map
        $('#map').empty();
        $('#map').append("<div id='mapDetials' style='width: 100%; height: 100%;'></div>")
        this.map = L.map('map').setView([lat, lon], 13);

        // set map tiles source
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        }).addTo(this.map);
    }

    addMarker(lat, lon){
        L.marker([lat, lon]).addTo(this.map);
        
    }

    chooseMarker(gardenName){
        marker.bindPopup(`<div class="gardenName">
                            <p>${gardenName}</p>
                            <button>Join Garden</button>
                        </div>`).openPopup();
    }
    
}


