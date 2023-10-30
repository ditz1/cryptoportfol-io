console.log("hello world");

var showsignin = true;
var signinpage = document.getElementById('loginscreen');
console.log(showsignin);





function loginCredentials(name, password) {
    fetch('http://35.188.225.12/backend/signin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            password: password
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data + "test");
        if (data.trim() === "User signed in successfully!"){
            showsignin = false;
            
            signinpage.style.display = 'none';
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

function createCredentials(name, password) {
    fetch('http://35.188.225.12/backend/newcreate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            password: password
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data + "test");
        if (data.trim() === "User signed in successfully!"){
            showsignin = false;
            //signinpage.style.display = 'none';
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}


document.getElementById('loginbutton')
        .addEventListener('click', function() {
            var username = document.getElementById('loginname');
            var password = document.getElementById('loginpass');
           
            let slen = username.value.length;
            let plen = password.value.length;
            if (slen < 3) {
                console.log("username must be longer than 3 characters!");
            }
            
            else if (plen < 3) {
                console.log("password must be longer than 3 characters!");
            }
            
            else {
                console.log("created username: " + username.value);
                console.log("created password: " + password.value);
                loginCredentials(username.value, password.value);
                username.value = "";
                password.value = "";
                //showsignin = false;
                
                console.log(showsignin);
                //signinpage.style.display = 'none';


            }
        });

document.getElementById('createbutton')
        .addEventListener('click', function() {
            var username = document.getElementById('createname');
            var password = document.getElementById('createpass');

            let slen = username.value.length;
            let plen = password.value.length;

            if (slen < 3) {
                console.log("username must be longer than 3 characters!");
            }
            
            else if (plen < 3) {
                console.log("password must be longer than 3 characters!");
            }
            
            else {
                console.log("created username: " + username.value);
                console.log("created password: " + password.value);
                createCredentials(username.value, password.value);
                
                username.value = "";
                password.value = "";
                //showsignin = false;
                
                console.log(showsignin);
                //signinpage.style.display = 'none';

            }
        });

