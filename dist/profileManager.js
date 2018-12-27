class ProfileManager {
    constructor() {
        this.UserId = JSON.parse(sessionStorage.UserId)
        // this.profile = profile
        // this.dogImage = dogImage
        // this.communityImage = communityImage
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
