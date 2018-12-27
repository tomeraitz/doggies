const render = new Renderer()
const manager = new homeManager()

const emptyClendar=function(){
    const collection = document.getElementsByClassName("event-span")
    const calendar = Array.prototype.slice.call( collection )
    calendar.forEach(e=>$(e).empty())
}

const getAllgardens = async function(){
    let user = await manager.getUserGardens();
    await manager.addUserGardens(user.gardens);
    await manager.getGaedens()
    manager.markerGeneral.forEach(g => render.addGenralMarker(g.lat , g.lon , g.name , g._id))
    manager.markerUser.forEach(g => render.addUserMarker(g.lat , g.lon , g.name , g._id))
}



// Open a defulat map
 window.onload = function() {
    render.buildMap(32.109333,34.855499)
    getAllgardens()
 }

// Add new event to calendar
$("body").on("click" , ".join-hour" ,async function(){

    let hour = $(this).siblings(".add-user").find("span").text()
    let id = manager.UserId

    // add garden name
    let event = {
        id: id,
        hour: hour,
        //garden
    }
    await manager.addEvent(event)
    let result = await manager.getEvents(/*gardenName*/)
    result.calendar.forEach(pic => {
        render.renderGardenData(pic.users, eventID)
    });

})

$("body").on("click" , ".show-details" ,async function(){
    $("#post-button").prop('disabled', false);
    const gardenID = $(this).closest(".gardenName").data().id
    manager.garden = gardenID
    let gardenP = await manager.getPosts(gardenID)
    render.renderPosts(gardenP.posts)
})

$("body").on("click" , "#post-button" ,async function(){
    const input = $(".post-inpt").val()
    await manager.addnewPost(input)
    let gardenP = await manager.getPosts(manager.garden)
    render.renderPosts(gardenP.posts)
})

$("body").on("click" , ".comment-button" ,async function(){
    const text = $(this).siblings(".comment-inpt").val()
   const postID = $(this).closest(".single-post").data().id
    await manager.addNewcomment(postID , text)
    let gardenP = await manager.getPosts(manager.garden)
    render.renderPosts(gardenP.posts)
} )

// Search for cities
$("body").on("click","#search-icon",async function(){
    let value = $(".search-inpt").val()
    let result = await $.get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)
     render.map.remove()
     render.buildMap(result[0].lat, result[0].lon)
     getAllgardens()
  })
  
  $("body").on("click" , ".join-community",async function(){
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

  $("body").on("click" ,"#move-to-profile", function(){
    window.location.href = "profile.html"
  })


  emptyClendar()


