class RendererProfile {
    renderProfile(data) {
        $("#profile").empty();
        let source = $("#profile-template").html();
        let template = Handlebars.compile(source);
        let newHTML = template(data);
        $("#profile").append(newHTML);
    }
}