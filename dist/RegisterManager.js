class RegisterManager {
    constructor() {
        this.UserId = ""
    }

    async firstRegister(user){
        let data = await $.post(`/user` , user)
        sessionStorage.UserId = JSON.stringify(data._id)
        this.UserId = data._id
    }

    async login(user){
    //    let data = await $.get(`/login` , user)
    //     sessionStorage.UserId = JSON.stringify(data._id)
    //     this.UserId = data._id
    }

}