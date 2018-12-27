class ProfileManager {
    constructor() {
        this.userId = JSON.parse(sessionStorage.UserId)
        // this.profile = profile
        // this.dogImage = dogImage
        // this.communityImage = communityImage
    }

    uploadProfileImage() {
        $.post(`/upload/profile/${this.userId}`, data => {
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

    async getUserDetilas(userId) {
        return await $.get(`user/${userId}`, function () {
        })
    }

    async addDog(name){
       const dog =  {name : name}
        await $.post(`dog/${this.UserId}`, dog)
    }
}
