const manager = new RegisterManager()

const inputErr = function () {
    console.log("input err")
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
    console.log(user)
    if (firstName && lastName && email && password)
    {
        console.log(user)
        const result = await manager.firstRegister(user)
        if (result == true)

        {
            window.location.href = "home.html"
        } else
        {
            alert("This mail is already taken")
        }
    } else
    {
        console.log("calling input err")
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
    console.log(user)
    const result = await manager.login(user)
    console.log(result)
    if (result)
    {
        window.location.href = "home.html"
    } else
    {
        $("#login-email").addClass("input-err")
        $("#login-password").addClass("input-err")
    }
})
