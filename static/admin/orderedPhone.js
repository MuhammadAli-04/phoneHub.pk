let users = {}
let allUsersId = []
function getApi() {
    fetch('http://127.0.0.1:7000')
        .then(response => response.json())
        .then((json) => {
            users = json['Users']
            allUsersId = Object.keys(users)

            createRows()
        })
}



function createRows() {
    mainDiv = document.getElementById('mainDiv').innerHTML

    allUsersId.forEach(uid => {
        uOrderList = users[uid]['order']
        if (uOrderList.length != 0 && uOrderList[0][0] != 'Empty') {
            mainDiv += ` <div class="fluid-container">
           <center>
               <nav class="dopp navbar navbar-expand-lg navbar-dark
                       justify-content-between text-white">
                   <a class="navbar-brand" href="#">
                       ${users[uid]['name']}
                   </a>
                   <button class="navbar-toggler " type="button" data-toggle="collapse"
                       data-target="#navbarNavDropdown01" aria-controls="navbarNavDropdown01" aria-expanded="false"
                       aria-label="Toggle navigation" style="outline-color:#fff">
                       <span class="navbar-toggler-icon"></span>
                   </button>

                   <div class="collapse navbar-collapse" id="navbarNavDropdown01">

                       <ul class="navbar-nav ">

                           <!--dropdown item of menu-->
                           <li class="nav-item dropdown">
                               <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                   Mobiles
                               </a>

                               <!--dropdown sub items of menu-->
                               <div id = "${uid}" class="dropdown-menu" aria-labelledby="navbarDropdown">
                                   <div class="dropdown-divider"></div>
                               </div>
                           </li>

                       </ul>

                   </div>
                   <div> <a class = "btn btn-warning" onclick = "funn3('${uid}')" href="#">Dispatch Order</a></div>
               </nav>
           </center>
       </div>
            <hr>`;
            document.getElementById('mainDiv').innerHTML = mainDiv
            httt = document.getElementById(uid).innerHTML;
            let ht = ``
            uOrderList.forEach(or => {
                ht += `<a class="dropdown-item" href="#">
                ${or[0]} - ${or[1]}     
                </a>
                <hr>`
            })
            document.getElementById(uid).innerHTML = (ht +httt)

        }


    });

}


getApi()


function funn3(uid) {
    window.location.href = `/admin/dispatchOrder/${uid}`
}