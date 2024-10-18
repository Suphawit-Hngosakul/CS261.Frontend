// function call_REST_API_Hello() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     const url = (
//         'http://localhost:8080/services/hello?' +
//         new URLSearchParams({ myName: username, lastName: password}).toString()
//       );
    
//     fetch(url)
//     .then(response => response.text())
//     .then(text => {
//         document.log("Text return from REST API: "+text);
//         document.getElementById('message').innerText = text;92504
//     })
//     .catch(error => console.error('Error:', error));
// }

function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const loginBtn = document.getElementById('loginBtn');

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
        function showdata(data) {
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
        showdata(data);
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

function checkInputs() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value.trim();
    const loginBtn = document.getElementById('loginBtn');

    if (username !== '' && password !== '' && role !== '') {
        loginBtn.disabled = false; // Enable the button if all fields are filled
    } else {
        loginBtn.disabled = true; // Disable the button if any field is empty
    }
}

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // เปลี่ยนข้อความและไอคอน
    this.textContent = type === 'password' ? ' Show' : ' Hide';
    this.classList.toggle('show-password');
});


document.getElementById('username').addEventListener('input', checkInputs);
document.getElementById('password').addEventListener('input', checkInputs);
document.getElementById('role').addEventListener('change', checkInputs);