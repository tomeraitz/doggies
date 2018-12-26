const manger = new RegisterManager()

$("body").on("click" , "#signup-button" ,async function(){
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
    await manger.firstRegister(user)
    window.location.href = "home.html"
})

$("body").on("click" , "#login-button" , async function(){
    let email = $("#login-email").val()
    let password =  $("#login-password").val()
    let user = {
        email: email,
        password: password,
    }
    await manger.login(user)
    window.location.href = "home.html"
})
