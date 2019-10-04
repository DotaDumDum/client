const url = `http://localhost:3000`

$(document).ready(() => {
    $('.jumbotron').hide()
    $('#signOutButton').hide()
    $.ajax({
        type: 'GET',
        url: `${url}/heroes`
    })
    .done(heroes => {
        heroes.forEach((hero,index) => {
            let arr = []
            arr.push(hero.localized_name)
            arr.push(hero.attack_type)
            arr.push(hero.primary_attr)
            hero.roles.forEach(role => arr.push(role))
            $('#heroes').append(`
            <div class="card border-danger" style="width: 22rem;">
                <div class="card-body" id="hero${index}">
                    <div class="row">
                        <div class="col-sm-8">
                            <button class="btn btn-danger"onclick="buttonClick(this)" value="${arr}">${hero.localized_name}</button>
                            <br>
                            <a class="h5">${hero.attack_type}</a>
                            <br>
                            
                            <img src="https://api.opendota.com/apps/dota2/images/heroes/${hero.localized_name.toLowerCase().replace(' ', "_")}_full.png" alt="Does Not Exist" class="m-3 rounded">
                        <div class="col-sm-4" id="pic${index}">
                        </div>
                    </div>
                </div>
            </div>`)
            if (hero.primary_attr === "str") {
                $(`#pic${index}`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/897/large/alexandra-bisson-001-str.jpg?1534811821" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
            else if (hero.primary_attr === 'int') {
                $(`#pic${index}`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/901/large/alexandra-bisson-003-int.jpg?1534811832" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
            else {
                $(`#pic${index}`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/899/large/alexandra-bisson-002-agi.jpg?1534811827" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
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

    $('#mood-form').on('submit', (e) => {
        $('.jumbotron').show()
        e.preventDefault()
        const data = {
            text: $('#mood').val()
        }
        $.ajax({
            type: 'POST',
            url: "http://localhost:3000/heroes/recommendation",
            data
        })
        .done(object => {
            console.log(object)
            $('#heroes').empty()
            $('#mood-form').hide()
            $('#recommendedHero').append(`
                    <div class="row">
                        <div class="col-sm-8">
                        <button class="btn btn-danger"onclick="buttonBack()">Back</button>
                        <h3 class="text-center"> ${object.localized_name}</h3>
                            <br>
                            <a class="h4">${object.attack_type}</a>
                            <br>
                            <h5>Roles</h5>
                            <ol id="roles"></ol>
                            <br>
                        </div>
                        <div class="col-sm-4" id="pics">
                        </div>
                        <div id="video">
                        </div>
                    </div>
            `)

            object.roles.forEach(role => {
                $('#roles').append(`<li>     ${role}</li>`)
            })

            if (object.primary_attr === "str") {
                $(`#pics`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/897/large/alexandra-bisson-001-str.jpg?1534811821" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
            else if (object.primary_attr === 'int') {
                $(`#pics`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/901/large/alexandra-bisson-003-int.jpg?1534811832" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
            else {
                $(`#pics`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/899/large/alexandra-bisson-002-agi.jpg?1534811827" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
            const name = object.localized_name
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/youtube/video',
                data: {
                    hero: name
                },
                dataType: 'json'
            })
            .done(data => {
                const url = data.url
                $('#video').append(`
                <iframe src="${url}" allowfullscreen width="450px" height="300px"></iframe>`)
            })
            .fail(console.log)
        })
        .fail(console.log)
    })
})

const buttonClick = (button) => {
    let arr = button.value
    arr = arr.split(',')
    const localized_name = arr[0]
    const attack_type = arr[1]
    const primary_attr = arr[2]
    const roles = arr.slice(3)
    const object = {
        localized_name, attack_type, primary_attr, roles
    }
    $('#heroes').empty()
    $('#mood-form').hide()
    $('#recommendedHero').append(`
            <div class="row">
                <div class="col-sm-8" style="padding-left: 5rem;">
                    <h3 class="text-center"> ${object.localized_name}</h3>
                    <img src="https://api.opendota.com/apps/dota2/images/heroes/${object.localized_name.toLowerCase().replace(' ', "_")}_full.png" alt="Does Not Exist" class="m-3 rounded">
                    <br>
                    <a class="h4">${object.attack_type}</a>
                    <br>
                    <h5>Roles</h5>
                    <ol id="roles"></ol>
                    <br>
                </div>
                <div class="col-sm-4" id="pics" style="padding-right: 2rem">
                </div>
                <div id="video" class="content-center">
                </div>
            </div>
    `)
    $('#recommendedHero').show()
    object.roles.forEach(role => {
        $('#roles').append(`<li>     ${role}</li>`)
    })
    if (object.primary_attr === "str") {
        $(`#pics`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/897/large/alexandra-bisson-001-str.jpg?1534811821" style="max-height:60px;border-radius:100%" class="float-right">`)
    }
    else if (object.primary_attr === 'int') {
        $(`#pics`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/901/large/alexandra-bisson-003-int.jpg?1534811832" style="max-height:60px;border-radius:100%" class="float-right">`)
    }
    else {
        $(`#pics`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/899/large/alexandra-bisson-002-agi.jpg?1534811827" style="max-height:60px;border-radius:100%" class="float-right">`)
    }
    const name = object.localized_name
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/youtube/video',
        data: {
            hero: name
        },
        dataType: 'json'
    })
    .done(data => {
        const url = data.url
        $('#video').append(`
        <iframe src="${url}" allowfullscreen width="450px" height="300px"></iframe>`)
    })
    .fail(console.log)
}

const buttonBack = () => {
    $.ajax({
        type: 'GET',
        url: `${url}/heroes`
    })
    .done(heroes => {
        $('#mood-form').show()
        $('#mood').val("")
        heroes.forEach((hero,index) => {
            let arr = []
            arr.push(hero.localized_name)
            arr.push(hero.attack_type)
            arr.push(hero.primary_attr)
            hero.roles.forEach(role => arr.push(role))
            $('#heroes').append(`
            <div class="card border-danger" style="width: 22rem;">
                <div class="card-body" id="hero${index}">
                    <div class="row">
                        <div class="col-sm-8">
                            <button class="btn btn-danger"onclick="buttonClick(this)" value="${arr}">${hero.localized_name}</button>
                            <br>
                            <a class="h5">${hero.attack_type}</a>
                            <br>
                        </div>
                        <div class="col-sm-4" id="pic${index}">
                        </div>
                    </div>
                </div>
            </div>`)
            if (hero.primary_attr === "str") {
                $(`#pic${index}`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/897/large/alexandra-bisson-001-str.jpg?1534811821" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
            else if (hero.primary_attr === 'int') {
                $(`#pic${index}`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/901/large/alexandra-bisson-003-int.jpg?1534811832" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
            else {
                $(`#pic${index}`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/899/large/alexandra-bisson-002-agi.jpg?1534811827" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
        })
    })
    .fail(console.log)
}