$(document).ready(() => {
    $('#signOutButton').hide()
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/heroes'
    })
    .done(heroes => {
        heroes.forEach((hero,index) => {
            console.log(hero)
            $('#heroes').append(`
            <div class="card" style="width: 22rem;">
                <div class="card-body" id="hero${index}">
                    <div class="row">
                        <div class="col-sm-8">
                            <button class="btn btn-primary"onclick="buttonClick(this)" value="${hero.localized_name}">${hero.localized_name}</button>
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

    $('#mood-form').on('submit', (e) => {
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
            $('#heroes').empty()
            $('#mood-form').hide()
            $('#recommendedHero').append(`
                    <div class="row">
                        <div class="col-sm-8">
                            <button class="btn btn-primary"onclick="buttonClick(this)" value="${object.localized_name}">${object.localized_name}</button>
                            <br>
                            <a class="h5">${object.attack_type}</a>
                            <br>
                        </div>
                        <div class="col-sm-4" id="pics">
                        </div>
                    </div>
            `)
            if (object.primary_attr === "str") {
                $(`#pics`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/897/large/alexandra-bisson-001-str.jpg?1534811821" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
            else if (object.primary_attr === 'int') {
                $(`#pics`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/901/large/alexandra-bisson-003-int.jpg?1534811832" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
            else {
                $(`#pics`).append(`<img src="https://cdnb.artstation.com/p/assets/images/images/012/438/899/large/alexandra-bisson-002-agi.jpg?1534811827" style="max-height:60px;border-radius:100%" class="float-right">`)
            }
        })
        .fail(console.log)
    })
})

const buttonClick = (button) => {
    let name = button.value
    console.log(name)
}