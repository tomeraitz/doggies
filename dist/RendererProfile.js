class RendererProfile {
    constructor() {
        Handlebars.registerHelper('toUpper', function (str) {
            return str.replace(/^\w/, c => c.toUpperCase());
        });
    }

    renderProfile(data) {
        $("#profile").empty();
        let source = $("#profile-template").html();
        let template = Handlebars.compile(source);
        let newHTML = template(data);
        $("#profile").append(newHTML);
    }

    rednerPosts(data) {
        console.log(data)
        $("#posts").empty();
        let source = $("#post-template").html();
        let template = Handlebars.compile(source);
        let newHTML = template(data);
        $("#posts").append(newHTML);
    }

}
