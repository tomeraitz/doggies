class homeManager {
    constructor() {

          this.UserId = JSON.parse(sessionStorage.UserId)
          this.markerGeneral = []
          this.markerUser = []
          this.garden = ""
    }

    // async getEvents(gardenName){
    //    let gardens = await $.get(`/events/${gardenName}`)
    //     this.markerFromDB = []
    //     this.markerFromDB.push(...gardens)
    //  }


    async addEvent(event) {
        await $.post(`/event`, event)
    }

    async getGaedens(){
        let gardens =  await $.get(`/allgardens`)
        this.markerGeneral = []
        gardens.forEach(g => {
            let exist = false
            this.markerUser.forEach(e => {
                if (e._id == g._id)
                {
                    exist = true
                }
            })
            if (!exist)
            {
                this.markerGeneral.push(g)
            }
            exist = false

        })
        
    }

    async getPosts(){
        return $.get(`/gardenPosts/${this.garden}`)

    }

    async addNewcomment(postId , text){
        let comment = {
            text: text,
            date: new Date()
        }
       await $.post(`/comment/${this.UserId}/${postId}`, comment)
    }

    async addnewPost(text){
        const post ={
            text : text,
            date : new Date()
        }
        await $.post(`/post/${this.UserId}/${this.garden}`, post)
    }

    async joinCommunity(){

        await $.ajax({
            url: `/user/garden/${this.UserId}/${this.garden}`,
            method: "PUT",
            success: response => {
            }
        })
    }

    async addUserGardens(UserGardens){
        this.markerUser = []
        this.markerUser.push(...UserGardens)
    }

    async getUserGardens(){
        return $.get(`/user/${this.UserId}`)
    }
}