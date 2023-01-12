let brandd = document.querySelector('.heading').innerHTML

let brand = {}
let crousal = {}
let allPhones = []
function getApi() {
    fetch('http://127.0.0.1:7000')
        .then(response => response.json())
        .then((json) => {
          crousal = json['Crousal'][brandd]
            brand = json['Brands'][brandd]
            allPhones = Object.keys(brand)            
            createRows()
        })
}

let rowNum = 1

function createRows() {
    allPhones.forEach((phone, i) => {
      if (i % 4 == 0) {
            allRowsDiv = document.querySelector('.allRows').innerHTML
            allRowsDiv += `
            <div id = '${rowNum}' class="row">
            </div>
            `
            document.querySelector('.allRows').innerHTML = allRowsDiv
        }
        rowDiv = document.getElementById(rowNum).innerHTML
        // linkk =`{% url \'specs\' ${brandd} ${phone} %}` 
        // linkk =`specs/'${brandd}'/'${phone}'/` 
        rowDiv += `
        <div class="col-1-of-4">
          <div class="cards">
            <div class="front-side">
              <img height="150px" width="100px" src = "${brand[phone]['ImageURL'][0]}" alt="phone">
              <p>${brand[phone]['Name']}</p>
            </div>
            <div class="back-side">
              <span><i class="fa-solid fa-mobile-screen"></i>${crousal[phone]['display']}"</span>
              <span><i class="fa-solid fa-camera"></i>${crousal[phone]['rearcamera']}</span>
              <span><i class="fa-solid fa-memory"></i>${crousal[phone]['ram']}</span>
              <span><i class="fa-solid fa-microchip"></i>${crousal[phone]['chipset']}</span>
              <span><i class="fa-solid fa-battery-full"></i>${crousal[phone]['battery']}</span>
              <a href= "#" onclick= "Func('${brandd}','${phone}')" class="route">View Specs</a>
            </div>
          </div>
        </div>`
        document.getElementById(rowNum).innerHTML = rowDiv
        if (i%4==3) {
            rowNum++;
            ht = document.querySelector('.allRows').innerHTML
            ht +=`<br>` 
            document.querySelector('.allRows').innerHTML= ht
        }
    });
    

}

function start() {
    getApi()
}

function Func(br,ph) {
    window.location.href = `http://127.0.0.1:8000/admin/specs/${br}/${ph}/`;
}

start()