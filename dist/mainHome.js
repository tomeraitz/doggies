const render = new Renderer()
const manger = new homeManager()

// render.map.remove()
render.buildMap(32.109333, 34.855499)

// window.onload = function() {

//     render.addMarker(32.109333 , 34.855499) 
// }


$("body").on("click", ".join-hour", async function () {
    let hour = $(this).siblings(".add-user").find("span").text()
    let id = manger.UserId
    // add garden name
    let event = {
        id: id,
        hour: hour,
        //garden
    }
    await manger.addEvent(event)
    let result = await manger.getEvents(/*gardenName*/)
    result.calendar.forEach(pic => {
        render.renderGardenData(pic.users, eventID)
    });

})

$("body").on("click", "#search-icon", async function () {
    let value = $("#search-inpt").val()
    let result = await $.get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)
    render.map.remove()
    render.buildMap(result[0].lat, result[0].lon)
})

$("body").on("click", ".openPosts", function () {
    document.getElementById('posts').innerHTML = "<div style='width: 100%; height: 200px; background-color: black;'></div>"
})

render.map.on('click', e => {
    let Newlat = e.latlng.lat;
    let Newlon = e.latlng.lng;
    console.log(Newlat)
    render.addMarker(Newlat, Newlon)
});

// $("body").on("click" , ".leaflet-marker-pane"){

// }

