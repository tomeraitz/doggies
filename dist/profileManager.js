
class UploadImage {
    constructor(profile, dogImage, communityImage) {
        this.profile = profile
        this.dogImage = dogImage
        this.communityImage = communityImage
    }

    uploadProfileImage() {
        $.post(`/upload`, data => {
            this.profile = data;
        })
    }

    uploadDogImage() {
        $.post(`/upload`, data => {
            this.dogImage = data;
        })
    }

    uploadCommunityImage() {
        $.post(`/upload`, data => {
            this.communityImage = data;
        })
    }
}


class User {
    constructor(renderer) {
        this.UserId = JSON.parse(sessionStorage.UserId);
        this.renderer = renderer
    }

    async userName(userId) {
        let user = await $.post(`user/${userId}`, function () {
            renderer.renderer(user)
        })
    }
}