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

function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    //validate email
    function ValidEmail(email) {
        const emailPattern = /^.+@dome\.tu\.ac\.th$/; 
        return emailPattern.test(email);
    }
    //validate
    if (username === '' || (username.length < 10 && !ValidEmail(username))) {
        document.getElementById('message').style.color = 'ff0000';
        message.innerText = 'Please enter your student ID or employee email address.';
        return;
    }

    if (password === '' || password.length < 4) {
        document.getElementById('message').style.color = 'ff0000';
        message.innerText = 'Password must be at least 4 characters long.';
        return; 
    }

    if (role === '') {
        document.getElementById('message').style.color = 'ff0000';
        message.innerText = 'Please select your role.';
        return; 
    }

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
        if (data.type === undefined) {
            document.getElementById('message').innerText = 'The username or password is incorrect.';
            return;
        }
        if (data.type !== role ) {
            document.getElementById('message').innerText = 'The information is incorrect.';
            return; 
        }

        //Show date
        function showdate(date) {
            const container = document.getElementById('Profile');
            document.getElementById('Profile').style.display = 'block';
            document.getElementById('Profile').style.position = 'fixed';

            if(data.type == 'student'){
                container.innerHTML = `
                    <div class="infromation">
                        <h1 class="hname">${data.displayname_th}</h1>
                        <hr>
                        <ul>
                            <li id="studentID">Student ID:  ${data.username}</li>
                            <li id="displayname_th">ชื่อ:  ${data.displayname_th}</li>
                            <li id="displayname_en">Name:  ${data.displayname_en}</li>
                            <li id="email">Email:  ${data.email}</li>
                            <li id="faculty">คณะ:  ${data.faculty}</li>
                            <li id="department">สาขา:  ${data.department}</li>
                        </ul>
                        <div class="close" onclick="closedelete()">&times;</div>
                    </div>
                `;
            }else {
                container.innerHTML = `
                <div class="infromation">
                    <h1 class="hname">${data.displayname_th}</h1>
                    <hr>
                    <ul>
                        <li id="displayname_th">ชื่อ:  ${data.displayname_th}</li>
                        <li id="displayname_en">Name:  ${data.displayname_en}</li>
                        <li id="email">Email:  ${data.email}</li>
                        <li id="department">${data.department}</li>
                        <li id="faculty">${data.faculty}</li>
                    </ul>
                    <div class="close" onclick="closedelete()">&times;</div>
                </div>
            `;
            }
        }

        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerText = data.message;
        showdate(data);
    })
    .catch(error => {
        // console.error('Error:', error),
        document.getElementById('message').style.color = 'ff0000';
        document.getElementById('message').innerText = 'Error: ' + error.message;
    });
}

function closedelete() {
    document.getElementById('message').style.color = 'ff0000';
    document.getElementById('Profile').style.display = 'none';
    document.getElementById("loginForm").reset();
    location.reload();
    document.getElementById('message').innerText = '';
}