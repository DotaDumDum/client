function onSignIn(googleUser) {
    $('#signInButton').hide()
    $('#signOutButton').show()
    const id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        type: 'POST',
        url: `${url}/user/googleLogin`,
        data: {
            id: id_token
        },
        dataType: 'json'
    })
        .done(token => {
            console.log(token);
            localStorage.setItem('token', token)
            login()
        })
        .fail(console.log)
}

function signOut() {
    $('#signInButton').show()
    $('#signOutButton').hide()
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut()
        .then(() => {
            console.log('User signed out');
            localStorage.removeItem('token');
        })
        .catch(console.log)
}