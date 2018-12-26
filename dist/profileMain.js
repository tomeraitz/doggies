const renderer = new Renderer()
const uploadImage = new UploadImage(renderer)


$("#upload-btn").on("click", function () {
    uploadImage.uploadProfileImage()
})

