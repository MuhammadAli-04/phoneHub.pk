
userName = document.getElementById('userName').innerHTML
totalItem = document.getElementById('totalItem')


user = []
allMobiles = []

async function getApi() {
    await fetch("http://127.0.0.1:7000")
        .then((response) => response.json())
        .then((json) => {
            users = Object.keys(json['Users']);
            allMobiles = json['Brands'];
            users.forEach(u => {
                if (json['Users'][u]['name'] == userName) {
                    user = json['Users'][u]
                }
            });
            showMobiles()
        });
}


function showMobiles() {
    uCart = user['cart']
    ht = totalItem.innerHTML
    ht += uCart.length
    document.getElementById('totalItem').innerHTML = ht

    itemList = document.querySelector('.item-list').innerHTML
    uCart.forEach(mob => {
        mobDb = allMobiles[mob[0]][mob[1]]

        itemList +=  `<div class="item">
        <div class="col-1-of-5">
          <img src= ${mobDb['ImageURL'][0]} alt="phone"
          class="item-img" height="70" />
        </div>
        <div class="col-4-of-5">
          <div class="col-1-of-2">
            <h2 class="">${mobDb['Name']}</h2>
            <h6 class="specs">${mobDb['Brand']}, Color:White</h6>
          </div>
          <div class="col-1-of-2">
            <div class="col-2-of-3">
            <p>Rs. </p>  
            <p class = 'price'>${mobDb['Price']['USD']}</p>
            </div>
            <div class="col-1-of-3">
              <button type="button" onclick = "del1('${mobDb['Brand']}', '${mobDb['Name']}')" class="btn btn-dark">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        </div>`
        document.querySelector('.item-list').innerHTML = itemList
    });


    // set Total Price

    total = 0.0
    allPrices = document.querySelectorAll('.price')
    allPrices.forEach(pr =>{
        total += parseFloat(pr.innerHTML)
        console.log(parseFloat(pr.innerHTML));
    })
    console.log(total);
    ht = document.getElementById('totalPrice').innerHTML
    ht += `${total}`
    document.getElementById('totalPrice').innerHTML = ht

}

getApi()


function del1(br, ph) {
    window.location.href = `http://127.0.0.1:8000/deleteFromCart/${br}/${ph}`
}

function delAll() {
    window.location.href = `http://127.0.0.1:8000/deleteFromCart/allPhones/allPhones`
}

function checkOut() {
  window.location.href = `http://127.0.0.1:8000/checkOut`
}