const render = new Renderer()
const manager = new homeManager()

const getAllgardens = async function () {
    let user = await manager.getUserGardens();
    await manager.addUserGardens(user.gardens);
    await manager.getGardens()

    manager.markerGeneral.forEach(g => render.addGenralMarker(g.lat, g.lon, g.name, g._id))
    manager.markerUser.forEach(g => render.addUserMarker(g.lat, g.lon, g.name, g._id))
}

const displayUserName = async function () {
    const user = await manager.getUserGardens()
    console.log(user)
    $("#nameDisplay").append(user.firstName)
    $("#profilePicHolder").append(`<img src="${user.profilePic}">`)
}
const displayGardenName = function (gardenName) {
    $("#calendar-community-name").empty()
    $("#calendar-community-name").append(gardenName)
}


// Open a defulat map
window.onload = async function () {
    render.buildMap(32.109333, 34.855499)
    getAllgardens()
    await displayUserName()
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
    $("#post-button").prop('disabled', false);
    const gardenID = $(this).closest(".gardenName").data().id
    manager.garden = gardenID
    const events = await manager.getEvents()
    render.emptyClendar()
    render.renderCalendar(events)

    let gardenP = await manager.getPosts(gardenID)
    displayGardenName(gardenP.name)
    render.renderPosts(gardenP.posts)

})

$("body").on("click", "#post-button", async function () {

    const input = $(".post-inpt").val()
    await manager.addnewPost(input)
    let gardenP = await manager.getPosts(manager.garden)
    render.renderPosts(gardenP.posts)

})


$("body").on("click", ".comment-button", async function () {
    const text = $(this).siblings(".comment-inpt").val()
    const postID = $(this).closest(".single-post").data().id
    await manager.addNewcomment(postID, text)
    let gardenP = await manager.getPosts(manager.garden)
    render.renderPosts(gardenP.posts)
})


// Search for cities
$("body").on("click", "#search-icon", async function () {
    let value = $(".search-inpt").val()
    let result = await $.get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)

    render.map.remove()
    render.buildMap(result[0].lat, result[0].lon)
    getAllgardens()
})

$("body").on("click", ".join-community", async function () {
    const gardenID = $(this).closest(".gardenName").data().id
    manager.garden = gardenID
    await manager.joinCommunity()
    getAllgardens()
    $("#post-button").prop('disabled', false);
    let gardenP = await manager.getPosts(gardenID)
    console.log(gardenP)
    render.renderPosts(gardenP.posts)
})


// move to profile

$("body").on("click", "#move-to-profile", function () {
    window.location.href = "profile.html"
})

render.emptyClendar()

