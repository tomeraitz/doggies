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

    async getGardens() {
        let gardens = await $.get(`/allgardens`)
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

    async joinCommunity() {

    }

    async addUserGardens(UserGardens) {
        this.markerUser = []
        this.markerUser.push(...UserGardens)
    }

    async getUserGardens() {
        return $.get(`/user/${this.UserId}`)
    }

    async getEvents() {
        const garden = await $.get(`/garden/${this.garden}`)
        return garden.calendar
    }
}
