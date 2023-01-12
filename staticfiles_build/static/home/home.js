let brando = {};
let crousall = {}
let allBrands = [];
let allPhoness = [];
let suggestions = [];

async function getApi() {
  await fetch("http://127.0.0.1:7000")
    .then((response) => response.json())
    .then((json) => {
      crousall = json['Crousal']
      brando = json['Brands'];
      allBrands = Object.keys(brando);
      allBrands.forEach((el) => {
        Object.keys(brando[el]).forEach((ell) => {
          allPhoness.push([ell, el]);
        });
      });
      showCrousalData()
      showPhones()
    });
}

function start() {
  getApi();
  let searchBar = document.getElementById("search");
  let searchBtn = document.getElementById("searchBtn");
  searchBar.addEventListener("click", brandSuggestion);
  searchBar.addEventListener("keyup", suggestion);
  // searchBtn.addEventListener('click', search)
}

function brandSuggestion(e) {
  if (e.target.value == "") {
    let brands = allBrands.slice(0, 4);
    suggestions = brands;
    // console.log(suggestions);
    // console.log("-------------------------");
  }
}

function suggestion(e) {
  // console.log(allPhoness);
  suggestions = [];
  allPhoness.forEach((phone) => {
    if (
      phone[0].toLowerCase().startsWith(e.target.value.toLowerCase()) &&
      e.target.value != ""
    ) {
      // console.log(phone);
      suggestions.push(phone[0]);
    }
  });
  // console.log("-------------------------");
}

start();

// //////////////////////////////////////

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

function searchPhone() {
  searchBar = document.getElementById("search");
  let phoneee = searchBar.value;
  let flag = 0
  allPhoness.forEach((element) => {
    if (element[0] == phoneee) {
      window.location.href = `/specs/${element[1]}/${element[0]}`;
      flag =1
    }
  });
  allPhoness.forEach((element) => {
    if (element[1] == phoneee) {
      window.location.href = `/brandPhones/${element[1]}`;
      flag=1
    }
  });
  if (flag==0) {
    alert("Invalid Search")
    console.log(window.location.href);
  }
}

inputBox.onclick = (e) => {
  let emptyArray = [];
  emptyArray = suggestions;
  // console.log(emptyArray);
  emptyArray = emptyArray.map((data) => {
    // passing return data inside li tag
    return (data = "<li>" + data + "</li>");
  });
  // console.log(emptyArray);

  searchWrapper.classList.add("active"); //show autocomplete box
  showSuggestions(emptyArray);
  let allList = suggBox.querySelectorAll("li");
  for (let i = 0; i < allList.length; i++) {
    //adding onclick attribute in all li tag
    allList[i].setAttribute("onclick", "select(this)");
  }
};
// if user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    // icon.onclick = () => {
    //   webLink = "https://www.google.com/search?q=" + userData;
    //   linkTag.setAttribute("href", webLink);
    //   console.log(webLink);
    //   linkTag.click();
    // };
    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    // console.log(suggestions);
    // console.log(emptyArray);
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return (data = "<li>" + data + "</li>");
    });
    // console.log(emptyArray);

    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active"); //hide autocomplete box
  }
};

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  searchWrapper.classList.remove("active");
  searchPhone();
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = "<li>" + userValue + "</li>";
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}



//  crousall data


function showCrousalData() {
  funn1('c2', 'Apple')
  funn1('c1', 'Samsung')
  funn1('c3', 'Google')
}


function funn1(el, br) {
  phoneList = Object.keys(brando[br])
  mob = brando[br][phoneList[phoneList.length - 1]]
  cr = crousall[br][mob['Name']]

  ph = document.getElementById(el).innerHTML
  ph += `
  <div class="specs">
  <h2 class="phone-name">${mob['Name']}</h2>
  <div class="col-1-of-5">
      <img style = "width: 160px;height: 212px;" src="${mob['ImageURL'][0]}" alt=${mob['Name']} />
  </div>
  <div class="col-4-of-5">
      <div class="specs-box col-1-of-4">
          <i class="fa-solid fa-mobile-screen"></i>
          <h2 class="display-size">${cr['display']}"</h2>
          <p class="display-resolution">${cr['dimensions']} pixels</p>
      </div>
      <div class="specs-box col-1-of-4">
          <i class="fa-solid fa-camera"></i>
          <h2 class="camera">${cr['rearcamera']}</h2>
          <p class="cam-resolution">${cr['frontcamera']}</p>
      </div>
      <div class="specs-box col-1-of-4">
          <i class="fa-solid fa-microchip"></i>
          <h2 class="ram">${cr['ram']}</h2>
          <p class="processor">${cr['chipset']}</p>
      </div>
      <div class="specs-box col-1-of-4">
          <i class="fa-solid fa-battery-full"></i>
          <h2 class="battery-capacity">${cr['battery']}</h2>
          <p class="battery-type">${cr['type']}</p>
      </div>
  </div>
</div>`;
  document.getElementById(el).innerHTML = ph
}





// brands phonee show krwany k liyeeeee


function showPhones() {
  funn2('ph1', 'Apple')
  funn2('ph2', 'Samsung')
  funn2('ph3', 'Google')

}

function funn2(el, br) {
  ph = document.getElementById(el).innerHTML
  phoneList = Object.keys(brando[br])
  for (let i = 0; i < 4 && i < phoneList.length; i++) {
    ph += `
  <div class="col-1-of-4">
          <div class="related-devices">
          <img src= "${brando[br][phoneList[i]]['ImageURL'][0]}" alt='kuch bhe' height="50px">
              <p class="name"> <a style="color : black" href="#" onclick= "specc('${brando[br][phoneList[i]]['Brand']}', '${brando[br][phoneList[i]]['Name']}')">${brando[br][phoneList[i]]['Name']}</a> </p>
          </div>
      </div>`
  }
  document.getElementById(el).innerHTML = ph
}

function specc(br, ph) {
  window.location.href = `/specs/${br}/${ph}`;
}


