$(document).ready(() => {
    $('#signOutButton').hide()
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/heroes'
    })
    .done(heroes => {
        heroes.forEach((hero,index) => {
            $('#heroes').append(`
            <div class="card" style="width: 18rem;">
                <div class="card-body" id="hero${index}"">
                    <a class="h2" href="#">${hero.localized_name}</a>
                    <br>
                    <a class="h5">${hero.attack_type}</a>
                    <br>
                </div>
            </div>`)
            hero.roles.forEach(role => {
                $(`#hero${index}`).append(`<li>${role}</li>`)
            })
        })
    })
    .fail(console.log)

    $('#mood-form').on('submit', (e) => {
        e.preventDefault()
        const sentence = $('#mood').val()
    })
})