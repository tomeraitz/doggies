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
        $(".posts").empty();
        let source = $("#posts-template").html();
        let template = Handlebars.compile(source);
        let newHTML = template({ data });
        $(".posts").append(newHTML);
    }


}
