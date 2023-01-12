

const firebaseConfig = {
    apiKey: "AIzaSyDs3f_7dEjYttSIaS_gyA96Iv6Kyw6d31w",
    authDomain: "demodb-38d29.firebaseapp.com",
    databaseURL: "https://demodb-38d29-default-rtdb.firebaseio.com",
    projectId: "demodb-38d29",
    storageBucket: "demodb-38d29.appspot.com",
    messagingSenderId: "322915066206",
    appId: "1:322915066206:web:656ceedbf352d925db6fcf",
    measurementId: "G-3BRJQ6K3ZM"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);


function submitForm() {
    let count = 0
    images = document.getElementById('formFile').files
    if (images.length == 1) {
        var storageref = firebase.storage().ref("Phones/" + document.querySelector('.name').value + '/' + images[0].name);
        thisref = storageref.put(images[0]);
        thisref.on('state_changed', function (snapshot) { }, function (error) { }, function () {
            alert('Uploaded Successfully');
            document.getElementById('form1').submit();
        })
    }
    else if (images.length > 1) {
        for (var key of Object.keys(images)) {
            var storageref = firebase.storage().ref("Phones/" + document.querySelector('.name').value + '/' + images[key].name);
            thisref = storageref.put(images[key]);
            thisref.on('state_changed', function (snapshot) { }, function (error) { }, function () {
                count++;
                if (count == images.length - 1) {
                    alert('Uploaded Successfully');
                    document.getElementById('form1').submit();
                }
            })
        };
    }
}
