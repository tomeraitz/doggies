class RendererProfile {
    renderProfile(data) {
        $("#profile-pic-name").empty();
        let source = $("#profile-template").html();
        let template = Handlebars.compile(source);
        let newHTML = template(data);
        $("#profile-pic-name").append(newHTML);
    }
}