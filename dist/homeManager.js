class homeManager {
    constructor() {
        this.UserId = JSON.parse(sessionStorage.UserId)
    }
    getUserId() {
        return this.UserId
    }
    async getEvents(gardenName) {
        await $.get(`/events/${gardenName}`)
    }

    async addEvent(event) {
        await $.post(`/event`, event)
    }
}