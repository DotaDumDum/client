function onSignIn(googleUser) {
    $('#signInButton').hide()
    $('#signOutButton').show()
    const id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000',
        data: {
            id: id_token
        },
        dataType: 'json'
    })
    .done(console.log)
    .fail(console.log)
}

function signOut() {
    $('#signInButton').show()
    $('#signOutButton').hide()
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut()
    .then(console.log)
    .catch(console.log)
}