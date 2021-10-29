const form = document.querySelector('#login-form');
const email = document.querySelector('#email');
const passWord = document.querySelector('#password');


form.addEventListener('submit', e => {
    e.preventDefault();
    const loginDetails = {  // detta är vad användaren skriver in i formen
        email: email.value,
        password: passWord.value
    };

    console.log(loginDetails);

    fetch('/api/user/login', {  //gör ett anrop till API:et(backend)
        method: 'POST',  //vilken typ av anrop vi gör
        headers: {   //vad för sorts typ av information vi använder
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails)  // är vad vi skickar till backend
    })
        .then(res => res.json())  //Konverterat vår anrop till JSON
        .then(response => {  //använd de information vi fick från backend
            console.log(response);
            if (response.error) {

                alert('Please input right credentials');  //gör detta <---

            } else {  //allt inom 2: a then detta kommer ifrån backend
                localStorage.setItem('token', response.token);  //detta skickar användaren till admin sidan
                location.href = response.redirect;
            }

        });
});