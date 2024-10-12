function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    //API TU 
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUe10cbd9ad12a2fbaf42c9db799a8960956ada365c1ec3455320c78e8ab11e0f84249da0030538e747e744ff7cd245e7d'
        },
        body: JSON.stringify ({
            "UserName": username,
            "PassWord": password
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => {
        // console.error('Error:', error),
        document.getElementById('message').innerText = 'Error: ' + error.message;
    });
}

function call_REST_API_Hello() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = (
        'http://localhost:8080/services/hello?' +
        new URLSearchParams({ myName: username, lastName: password}).toString()
      );
    
    fetch(url)
    .then(response => response.text())
    .then(text => {
        document.log("Text return from REST API: "+text);
        document.getElementById('message').innerText = text;92504
    })
    .catch(error => console.error('Error:', error));
}
