const renderer = new RendererProfile()
const profileManager = new ProfileManager()

window.onload = async function () {
    const user = await profileManager.getUserDetilas(profileManager.UserId)
    console.log(user)
    renderer.renderProfile(user)
}

$("body").on("click", "#profile-image", function () {
    $(".input-file").trigger("click")
    profileManager.uploadProfileImage()
})

$("body").on("click", "#logo", function () {
    window.location.href = "home.html"
})
