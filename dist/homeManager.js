class homeManager {
    constructor() {
      //  this.UserId = JSON.parse(sessionStorage.UserId)
          this.markerFromDB = []
    }

    async getEvents(gardenName){
       let gardens = await $.get(`/events/${gardenName}`)
        this.markerFromDB = []
        this.markerFromDB.push(...gardens)
     }

    async addEvent(event){
       await $.post(`/event` , event)
    }

    async getGaedens(){
        await $get(`/allgardens`)
    }

    async saveGarden(){
        await $get(`/allgardens`)
    }
}