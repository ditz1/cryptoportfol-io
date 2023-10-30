console.log("hello javascript");
console.log("this language sucks");

////////////////////////////////////////////////
////////////////////_INIT_//////////////////////
////////////////////////////////////////////////

var signinpage = document.getElementById('loginscreen');
var foliopage = document.getElementById('folioscreen');
var createdtext = document.getElementById('createacc');
var uidtext = document.getElementById('loguid');
var showsignin = true;
var showfolio = false;
var uid = 0;

////////////////////////////////////////////////
////////////////////SIGNIN//////////////////////
////////////////////////////////////////////////

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
            showfolio = true;
            signinpage.style.display = 'none';
            foliopage.style.display = 'block';
            getUserID(name);
            
            
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
        if (data.length < 18){
            createdtext.textContent = "created account!";
            
            
            showsignin = false;
            showfolio = true;
            
        }
    })
    .catch(error => {
        console.log('Error:', error);
        
    });
}

function getUserID(name) {
    fetch('http://35.188.225.12/backend/getuid.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log("User found with UID:", data.data.uid);
            uid = data.data.uid;
            uidtext.textContent = "user id: " + uid;
            loadFolioDisplay();
        } else if (data.status === 'error') {
            console.log("Error:", data.message);
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
                console.log(showsignin);
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
                console.log(showsignin);

            }
        });

////////////////////////////////////////////////
////////////////////PORTFOLIO///////////////////
////////////////////////////////////////////////
function loadFolioDisplay(){
    if (showfolio) {
        console.log("folio showing");
        console.log(uid);
        console.log(uidtext.textContent);
    }
}


