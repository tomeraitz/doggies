class Renderer {
    constructor(){
    }
    renderGardenData(user, id) {
        $(`#${id}`).empty();
        const source = $('#events-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({user});
        $(`#${id}`).append(newHTML)
    }
}