const renderer = new RendererProfile()
const profileManager = new ProfileManager()

window.onload = async function() {
   const user = await profileManager.getUserDetilas(profileManager.UserId)
   console.log(user)
   renderer.renderProfile(user)
 }

$("#upload-btn").on("click", function () {
    uploadImage.uploadProfileImage()
})

$("body").on("click" ,"#logo", function(){
    window.location.href = "home.html"
  })


