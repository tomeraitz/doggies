class RegisterManager {
    constructor() {
        this.UserId = ""
    }

    async firstRegister(user) {
        const response = await $.post(`/user`, user)
        if (!response)
        {
            return false
        } else
        {
            sessionStorage.UserId = JSON.stringify(response._id)
            this.UserId = response._id
            return true
        }
    }

    async login(user) {
        console.log(user)
        const response = await $.post(`/login`, user)
        console.log(response)
        if (!response)
        {
            return false
        }
        sessionStorage.UserId = JSON.stringify(response)
        this.UserId = response
        return true
    }

}