const manager = new RegisterManager()

const inputErr = function () {
    $("#first-Name").addClass("input-err")
    $("#last-name-signup").addClass("input-err")
    $("#email").addClass("input-err")
    $("#Password").addClass("input-err")
    $("#gender").addClass("input-err")
    $("#date-ob-inpt").addClass("input-err")
}

$("body").on("click", "#signup-button", async function () {
    let firstName = $("#first-Name").val()
    let lastName = $("#last-name-signup").val()
    let email = $("#email").val()
    let password = $("#Password").val()
    let brith = $("#date-ob-inpt").val()
    let genderSelected = $("#gender input[type='radio']:checked");
    let gender = genderSelected.val()
    let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        birthday: brith,
    }
    if (firstName && lastName && email && password) {
        const result = await manager.firstRegister(user)
        if (result == true) {
            window.location.href = "home.html"
        } else {
            alert("This mail is already taken")
        }
    } else {
        inputErr()
    }
})

$("body").on("click", "#login-button", async function () {
    let email = $("#login-email").val()
    let password = $("#login-password").val()
    const user = {
        email: email,
        password: password,
    }
    const result = await manager.login(user)
    if (result) {
        window.location.href = "home.html"
    } else {
        $("#login-email").addClass("input-err")
        $("#login-password").addClass("input-err")
    }
})

let dogs = ["https://i.imgur.com/IFXkKxt.png", "https://i.imgur.com/CLtKAYn.png", "https://i.imgur.com/I0RPAZ4.png"]
let randomDog = Math.floor(Math.random() * dogs.length)
$("#dog-image").attr("src", dogs[randomDog])