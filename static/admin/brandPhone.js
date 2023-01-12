

let brand = {}
let allBrands = []
function getApi() {
  fetch('http://127.0.0.1:7000')
    .then(response => response.json())
    .then((json) => {
      brand = json['Brands']
      allBrands = Object.keys(brand)
      createRows()
    })
}

let rowNum = 1

function createRows() {
  allBrands.forEach((br, i) => {
    phones = Object.keys(brand[br])
    totalbrandPhones = phones.length
    if (i % 4 == 0) {
      allRowsDiv = document.querySelector('.allRows').innerHTML
      allRowsDiv += `
            <div id = '${rowNum}' class="row">
            </div>
            `
      document.querySelector('.allRows').innerHTML = allRowsDiv
    }
    rowDiv = document.getElementById(rowNum).innerHTML
    rowDiv += `
        <div class="col-1-of-4">
          <div class="cards">
            <div class="front-side">
              <img height="150px" width="100px" src = "${brand[br][phones[0]]['ImageURL'][0]}" alt="br">
              <p>${br}</p>
            </div>
            <div class="back-side">
              <span>Total Phones : ${totalbrandPhones}</span>
              <a href= "#" onclick= "Func('${br}')" class="route">View Phones</a>
            </div>
          </div>
        </div>`
    document.getElementById(rowNum).innerHTML = rowDiv
    if (i % 4 == 3) {
      rowNum++;
      ht = document.querySelector('.allRows').innerHTML
      ht += `<br>`
      document.querySelector('.allRows').innerHTML = ht
    }
  });


}

function start() {
  getApi()
}

function Func(br) {
  window.location.href = `http://127.0.0.1:8000/admin/${br}/AllPhones/`;
}

start()