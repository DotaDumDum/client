const url = `http://localhost:3000`

$(document).ready(() => {
    $.ajax({
        type: 'GET',
        url: `${url}/heroes`
    })
        .done(heroes => {
            heroes.forEach((hero, index) => {
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


    $('#registerBtn').click(function (event) {
        console.log('terjadi');
        event.preventDefault()
        let data = $('#registerForm input').serialize()

        $.ajax({
            url: `${url}/user/register`,
            method: 'post',
            data: data
        })
            .done(repos => {
                console.log(repos);
            })
            .fail(err => {
                let msg = err.responseText
                $(`#errorLogin`).html(msg);
            })
    })

    $('#loginbtn').click(function (event) {
        event.preventDefault()
        let data = $('#loginForm input').serialize()

        $.ajax({
            url: `${url}/user/manualLogin`,
            method: 'post',
            data: data
        })
            .done(token => {
                localStorage.setItem('token', token)
            })
            .fail(err => {
                let msg = err.responseText
                $(`#errorLogin`).html(msg);
            })
    })


})
