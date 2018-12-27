const renderer = new RendererProfile()
const profileManager = new ProfileManager()

window.onload = async function () {
    const user = await profileManager.getUserDetilas(profileManager.UserId)
    console.log(user)
    renderer.renderProfile(user)
}

$("#profile-image").on("click", function () {
    uploadImage.uploadProfileImage()
})

$("body").on("click", "#logo", function () {
    window.location.href = "home.html"
})
