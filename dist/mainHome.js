const render = new Renderer()
const manager = new homeManager()

const getAllgardens = async function () {
    let user = await manager.getUserGardens();
    await manager.addUserGardens(user.gardens);
    await manager.getGardens();
    console.log(manager.markerGeneral)
    manager.markerGeneral.forEach(g => render.addGenralMarker(g.lat, g.lon, g.name, g._id))
    manager.markerUser.forEach(g => render.addUserMarker(g.lat, g.lon, g.name, g._id))
}



// Open a defulat map
window.onload = function () {
    render.buildMap(32.109333, 34.855499)
    getAllgardens()
}

// Add new event to calendar
$("body").on("click", ".join-hour", async function () {
    const event = {
        userId: manager.UserId,
        gardenId: manager.garden,
        time: $(this).siblings(".event").data().time
    }
    await manager.addEvent(event)
    const events = await manager.getEvents()
    render.emptyClendar()
    render.renderCalendar(events)
    console.log(event)
})


$("body").on("click", ".show-details", async function () {
    const gardenID = $(this).closest(".gardenName").data().id
    manager.garden = gardenID
    const events = await manager.getEvents()
    render.emptyClendar()
    render.renderCalendar(events)

    let gardenP = await manager.getPosts(gardenID)
    render.renderPosts(gardenP.posts)

})

$("body").on("click", "#post-button", async function () {
    const input = $(".post-inpt").val()
    await manager.addnewPost(input)
    let gardenP = await manager.getPosts(manager.garden)
    render.renderPosts(gardenP.posts)

})

$("body").on("click", ".comment-button", async function () {
    const postID = $(this).closest(".single-post").data().id
    console.log(postID)
})

// Search for cities
$("body").on("click", "#search-icon", async function () {
    let value = $(".search-inpt").val()
    let result = await $.get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)
    render.map.remove()
    render.buildMap(result[0].lat, result[0].lon)
    getAllgardens()
})

//   $("body").on("click" , ".join-community", function(){
//         $(this)
//   })

// move to profile

$("body").on("click", "#move-to-profile", function () {
    window.location.href = "profile.html"
})

render.emptyClendar()

const fakeEvents = [
    {
        date: "00:30",
        users: [1, 2, 3, 4]
    },
    {
        date: "01:30",
        users: [1, 2, 3, 4]
    },
    {
        date: "02:00",
        users: [1, 2]
    },
    {
        date: "04:30",
        users: [1, 2, 3, 4, 5, 6, 7]
    }
]

