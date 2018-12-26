const render = new Renderer()
const manger = new homeManager()

const emptyClendar=function(){
    const collection = document.getElementsByClassName("event-span")
    const calendar = Array.prototype.slice.call( collection )
    calendar.forEach(e=>$(e).empty())
}

const getAllgardens = async function(){
    let user = await manger.getUserGardens();
    await manger.addUserGardens(user.gardens);
    await manger.getGaedens();
    console.log(manger.markerGeneral)
    manger.markerGeneral.forEach(g => render.addGenralMarker(g.lat , g.lon , g.name , g._id))
    manger.markerUser.forEach(g => render.addUserMarker(g.lat , g.lon , g.name , g._id))
}

// Open a defulat map
 window.onload = function() {
    render.buildMap(32.109333,34.855499)
    getAllgardens()
 }

// Add new event to calendar
$("body").on("click" , ".join-hour" ,async function(){
    let hour = $(this).siblings(".add-user").find("span").text()
    console.log(hour)
    let id = manger.UserId
    // add garden name
    let event = {
        id : id,
        hour : hour,
        //garden
    }
    await manger.addEvent(event)
    let result =  await manger.getEvents(/*gardenName*/)
    result.calendar.forEach(pic => {
        render.renderGardenData(pic.users,eventID )
    });
    
})

$("body").on("click" , ".show-details" , function(){
    const gardenID = $(this).closest(".gardenName").data().id
    manger.garden = gardenID
})

// Search for cities
$("body").on("click","#search-icon",async function(){
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

  $("body").on("click" ,"#move-to-profile", function(){
    window.location.href = "profile.html"
  })


  emptyClendar()
