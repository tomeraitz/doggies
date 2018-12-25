const manger = new homeManager()
const render = new Renderer()

$("body").on("click" , ".join-hour" ,async function(){
    let hour = $(this).siblings(".add-user").find("span").text()
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