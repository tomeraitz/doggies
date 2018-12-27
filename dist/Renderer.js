class Renderer {
    constructor() {
        this.map = "";
    }

    emptyClendar() {
        const collection = document.getElementsByClassName("event-span")
        const calendar = Array.prototype.slice.call(collection)
        calendar.forEach(e => $(e).empty())
    }

    renderCalendar(events) {
        const collection = document.getElementsByClassName("event-span")
        const calendar = Array.prototype.slice.call(collection)
        while (events.length > 0)
        {
            let event = events.pop()
            calendar.forEach(e => {
                let time = $(e).closest(".event").data().time
                if (event.date == time)
                {
                    let eventCount = 0
                    event.users.forEach(u => {
                        eventCount++
                        if (eventCount <= 3)
                        {
                            console.log(u)
                            $(e).append(`<img class="event-pic" src="${u.profilePic}" title="${u.firstName} ${u.lastName}">`)
                            // $(e).append(`<img class="user-calendar-img" src="https://www.geogreen.co.uk/wp-content/uploads/2017/12/profile-icon.png"/>`)
                        }
                    })
                    if (eventCount > 3)
                    {
                        $(e).append(` + ${eventCount - 3}`)
                    }
                }
            })
        }
    }

    // Renderer the gardens
    renderGardenData(garden, id) {
        $(`#${id}`).empty();
        const source = $('#events-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({ user });
        $(`#${id}`).append(newHTML)
    }


    // initialize map
    buildMap(lat, lon) {
        $('#map').empty();
        $('#map').append("<div id='mapDetials' style='width: 100%; height: 100%;'></div>")
        this.map = L.map('map').setView([lat, lon], 10);

        // set map tiles source
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        // Point on position in map to add a new marker
        this.map.on('click', e => {
            $(".input-pop-up").show();
            $("#garden-name").val("")
            $(".save").click(async function () {
                let gardenName = $("#garden-name").val()
                let Newlat = e.latlng.lat;
                let Newlon = e.latlng.lng;
                let garden = {
                    name: gardenName,
                    lat: Newlat,
                    lon: Newlon,
                }

               await $.post(`/garden/${manager.UserId}`, garden)
               await render.addUserMarker(Newlat, Newlon, gardenName)
                getAllgardens()
                $(".input-pop-up").hide();
            })

            $(".cancel").click(function () {
                $(".input-pop-up").hide();
            })

        })
    }

    addUserMarker(lat, lon, gardenName, id) {
        var greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        L.marker([lat, lon], { icon: greenIcon }).bindPopup(`<div data-id="${id}" class="gardenName">
                                            <p>${gardenName}</p>
                                            <button class="show-details">Show Details</button>
                                         </div>`)
            .addTo(this.map)
    }

    addGenralMarker(lat, lon, gardenName, id) {
        L.marker([lat, lon]).bindPopup(`<div data-id="${id}" class="gardenName">
                                            <p>${gardenName}</p>
                                            <button class="join-community">Join Garden</button>
                                         </div>`)
            .addTo(this.map)
    }


    renderPosts(data) {
        $(`.posts`).empty();
        console.log(data)
        const source = $('#posts-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({ data });
        $(`.posts`).append(newHTML)
    }
}


