const renderer = new RendererProfile()
const profileManager = new ProfileManager()

window.onload = async function () {
    const user = await profileManager.getUserDetilas(profileManager.UserId)
    renderer.renderProfile(user)
    renderer.rednerPosts(user.posts)
    // renderer.rednerGardens(user.gardens)
}

$("body").on("click", "#profile-image", async function () {
    $(".input-file").toggle()
})

$("body").on("click", ".dog-img", async function () {
    $(this).siblings(".input-file-dog").toggle()
})

$("body").on("click", ".add-dog", async function () {
    $(".input-pop-up").show();
    $(".save").click(async function () {
        let name = $("#dog-name-input").val()
        await profileManager.addDog(name)
        const user = await profileManager.getUserDetilas(profileManager.UserId)
        renderer.renderProfile(user)
        $(".input-pop-up").hide();
    })

    $(".cancel").click(function () {
        $(".input-pop-up").hide();
    })
})

$("body").on("click", "#logo", function () {
    window.location.href = "home.html"
})
