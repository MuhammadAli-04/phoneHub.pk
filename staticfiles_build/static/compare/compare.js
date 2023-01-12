let brand = {};
let allBrands = [];
let allPhones = [];
let suggestions = [];

async function getApi() {
  await fetch("http://127.0.0.1:7000")
    .then((response) => response.json())
    .then((json) => {
      brand = json["Brands"];
      allBrands = Object.keys(brand);
      allBrands.forEach((el) => {
        // allPhones.push([Object.keys(brand[el]), el]);
        Object.keys(brand[el]).forEach((ell) => {
          allPhones.push([ell, el]);
        });
      });
      // allPhones = allPhones.flat(1);
      // console.log(brand);
      // console.log(allBrands);
      // console.log(allPhones);
    });
}

function start() {
  getApi();
  let searchBar = document.getElementById("search");
  searchBar.addEventListener("click", brandSuggestion);
  searchBar.addEventListener("keyup", suggestion);
  // searchBtn.addEventListener('click', search)

  let search1 = document.getElementById("search1");
  let search2 = document.getElementById("search2");
  let search3 = document.getElementById("search3");

  search1.addEventListener("keyup", suggestion);
  search2.addEventListener("keyup", suggestion);
  search3.addEventListener("keyup", suggestion);

  search1.addEventListener("click", brandSuggestion);
  search2.addEventListener("click", brandSuggestion);
  search3.addEventListener("click", brandSuggestion);
}

function brandSuggestion(e) {
  if (e.target.value == "") {
    let brands = allBrands.slice(0, 4);
    suggestions = brands;
    // console.log(suggestions);
    console.log("-------------------------");
  }
}

function suggestion(e) {
  // console.log(allPhones);
  suggestions = [];
  allPhones.forEach((phone) => {
    if (
      phone[0].toLowerCase().startsWith(e.target.value.toLowerCase()) &&
      e.target.value != ""
    ) {
      // console.log(phone);
      suggestions.push(phone[0]);
    }
  });
  console.log("-------------------------");
}

start();

// //////////////////////////////////////

// getting all required elements
const searchWrapper = document.querySelector("#search-input0");
const inputBox = searchWrapper.querySelector("#search");
const suggBox = searchWrapper.querySelector("#autocom-box0");
const icon = searchWrapper.querySelector("#searchBtn");

function searchPhone(n) {
  let searchBar = null;
  if (n == 0) {
    searchBar = document.getElementById("search");
  } else if (n == 1) {
    searchBar = document.getElementById("search1");
  } else if (n == 2) {
    searchBar = document.getElementById("search2");
  } else if (n == 3) {
    searchBar = document.getElementById("search3");
  }
  let phoneee = searchBar.value;
  // console.log(phoneee);
  allPhones.forEach((element) => {
    if (element[0] == phoneee) {
      console.log(element);
      if (n == 0) {
        window.location.href = `/specs/${element[1]}/${element[0]}`;
      } else if (n == 1) {
        document.querySelector("#name1").innerHTML =
          "<strong>" + brand[element[1]][element[0]]["Name"] + "</strong>";

        document.querySelector("#img1").src =
          brand[element[1]][element[0]]["ImageURL"];

        document.querySelector("#announced1").innerHTML =
          brand[element[1]][element[0]]["Launch"]["Announced"];
        document.querySelector("#status1").innerHTML =
          brand[element[1]][element[0]]["Launch"]["Status"];

        document.querySelector("#technology1").innerHTML =
          brand[element[1]][element[0]]["Network"]["Technology"];

        document.querySelector("#Dimensions1").innerHTML =
          brand[element[1]][element[0]]["Build"]["Dimensions"];
        document.querySelector("#Weight1").innerHTML =
          brand[element[1]][element[0]]["Build"]["Weight"];
        document.querySelector("#Sims1").innerHTML =
          brand[element[1]][element[0]]["Build"]["Sims"];

        document.querySelector("#Type1").innerHTML =
          brand[element[1]][element[0]]["Display"]["Type"];
        document.querySelector("#Size1").innerHTML =
          brand[element[1]][element[0]]["Display"]["Size"];
        document.querySelector("#Resolution1").innerHTML =
          brand[element[1]][element[0]]["Display"]["Resolution"];

        document.querySelector("#OS1").innerHTML =
          brand[element[1]][element[0]]["Platform"]["OS"];
        document.querySelector("#Chipset1").innerHTML =
          brand[element[1]][element[0]]["Platform"]["Chipset"];
        document.querySelector("#CPU1").innerHTML =
          brand[element[1]][element[0]]["Platform"]["CPU"];

        document.querySelector("#Ram1").innerHTML =
          brand[element[1]][element[0]]["Memory"]["Ram"];
        document.querySelector("#Rom1").innerHTML =
          brand[element[1]][element[0]]["Memory"]["Rom"];

        document.querySelector("#Front1").innerHTML =
          brand[element[1]][element[0]]["Camera"]["Front"];
        document.querySelector("#Rear1").innerHTML =
          brand[element[1]][element[0]]["Camera"]["Rear"];

        document.querySelector("#Charging1").innerHTML =
          brand[element[1]][element[0]]["Battery"]["Charging"];
        document.querySelector("#Capacity1").innerHTML =
          brand[element[1]][element[0]]["Battery"]["Capacity"];

        document.querySelector("#Authentication1").innerHTML =
          brand[element[1]][element[0]]["Sensors"]["Authentications"];
        document.querySelector("#Extras1").innerHTML =
          brand[element[1]][element[0]]["Sensors"]["Extras"];

        document.querySelector("#colors1").innerHTML =
          brand[element[1]][element[0]]["Colors"]["Available"];

        document.querySelector("#Price1").innerHTML =
          brand[element[1]][element[0]]["Price"]["USD"];
      } else if (n == 2) {
        document.querySelector("#name2").innerHTML =
          "<strong>" + brand[element[1]][element[0]]["Name"] + "</strong>";

        document.querySelector("#img2").src =
          brand[element[1]][element[0]]["ImageURL"];

        document.querySelector("#announced2").innerHTML =
          brand[element[1]][element[0]]["Launch"]["Announced"];
        document.querySelector("#status2").innerHTML =
          brand[element[1]][element[0]]["Launch"]["Status"];

        document.querySelector("#technology2").innerHTML =
          brand[element[1]][element[0]]["Network"]["Technology"];

        document.querySelector("#Dimensions2").innerHTML =
          brand[element[1]][element[0]]["Build"]["Dimensions"];
        document.querySelector("#Weight2").innerHTML =
          brand[element[1]][element[0]]["Build"]["Weight"];
        document.querySelector("#Sims2").innerHTML =
          brand[element[1]][element[0]]["Build"]["Sims"];

        document.querySelector("#Type2").innerHTML =
          brand[element[1]][element[0]]["Display"]["Type"];
        document.querySelector("#Size2").innerHTML =
          brand[element[1]][element[0]]["Display"]["Size"];
        document.querySelector("#Resolution2").innerHTML =
          brand[element[1]][element[0]]["Display"]["Resolution"];

        document.querySelector("#OS2").innerHTML =
          brand[element[1]][element[0]]["Platform"]["OS"];
        document.querySelector("#Chipset2").innerHTML =
          brand[element[1]][element[0]]["Platform"]["Chipset"];
        document.querySelector("#CPU2").innerHTML =
          brand[element[1]][element[0]]["Platform"]["CPU"];

        document.querySelector("#Ram2").innerHTML =
          brand[element[1]][element[0]]["Memory"]["Ram"];
        document.querySelector("#Rom2").innerHTML =
          brand[element[1]][element[0]]["Memory"]["Rom"];

        document.querySelector("#Front2").innerHTML =
          brand[element[1]][element[0]]["Camera"]["Front"];
        document.querySelector("#Rear2").innerHTML =
          brand[element[1]][element[0]]["Camera"]["Rear"];

        document.querySelector("#Charging2").innerHTML =
          brand[element[1]][element[0]]["Battery"]["Charging"];
        document.querySelector("#Capacity2").innerHTML =
          brand[element[1]][element[0]]["Battery"]["Capacity"];

        document.querySelector("#Authentication2").innerHTML =
          brand[element[1]][element[0]]["Sensors"]["Authentications"];
        document.querySelector("#Extras2").innerHTML =
          brand[element[1]][element[0]]["Sensors"]["Extras"];

        document.querySelector("#colors2").innerHTML =
          brand[element[1]][element[0]]["Colors"]["Available"];

        document.querySelector("#Price2").innerHTML =
          brand[element[1]][element[0]]["Price"]["USD"];
      } else if (n == 3) {
        document.querySelector("#name3").innerHTML =
          "<strong>" + brand[element[1]][element[0]]["Name"] + "</strong>";

        document.querySelector("#img3").src =
          brand[element[1]][element[0]]["ImageURL"];

        document.querySelector("#announced3").innerHTML =
          brand[element[1]][element[0]]["Launch"]["Announced"];
        document.querySelector("#status3").innerHTML =
          brand[element[1]][element[0]]["Launch"]["Status"];

        document.querySelector("#technology3").innerHTML =
          brand[element[1]][element[0]]["Network"]["Technology"];

        document.querySelector("#Dimensions3").innerHTML =
          brand[element[1]][element[0]]["Build"]["Dimensions"];
        document.querySelector("#Weight3").innerHTML =
          brand[element[1]][element[0]]["Build"]["Weight"];
        document.querySelector("#Sims3").innerHTML =
          brand[element[1]][element[0]]["Build"]["Sims"];

        document.querySelector("#Type3").innerHTML =
          brand[element[1]][element[0]]["Display"]["Type"];
        document.querySelector("#Size3").innerHTML =
          brand[element[1]][element[0]]["Display"]["Size"];
        document.querySelector("#Resolution3").innerHTML =
          brand[element[1]][element[0]]["Display"]["Resolution"];

        document.querySelector("#OS3").innerHTML =
          brand[element[1]][element[0]]["Platform"]["OS"];
        document.querySelector("#Chipset3").innerHTML =
          brand[element[1]][element[0]]["Platform"]["Chipset"];
        document.querySelector("#CPU3").innerHTML =
          brand[element[1]][element[0]]["Platform"]["CPU"];

        document.querySelector("#Ram3").innerHTML =
          brand[element[1]][element[0]]["Memory"]["Ram"];
        document.querySelector("#Rom3").innerHTML =
          brand[element[1]][element[0]]["Memory"]["Rom"];

        document.querySelector("#Front3").innerHTML =
          brand[element[1]][element[0]]["Camera"]["Front"];
        document.querySelector("#Rear3").innerHTML =
          brand[element[1]][element[0]]["Camera"]["Rear"];

        document.querySelector("#Charging3").innerHTML =
          brand[element[1]][element[0]]["Battery"]["Charging"];
        document.querySelector("#Capacity3").innerHTML =
          brand[element[1]][element[0]]["Battery"]["Capacity"];

        document.querySelector("#Authentication3").innerHTML =
          brand[element[1]][element[0]]["Sensors"]["Authentications"];
        document.querySelector("#Extras3").innerHTML =
          brand[element[1]][element[0]]["Sensors"]["Extras"];

        document.querySelector("#colors3").innerHTML =
          brand[element[1]][element[0]]["Colors"]["Available"];

        document.querySelector("#Price3").innerHTML =
          brand[element[1]][element[0]]["Price"]["USD"];
      }
    }
  });
}

inputBox.onclick = (e) => {
  let emptyArray = [];
  emptyArray = suggestions;
  console.log(emptyArray);
  emptyArray = emptyArray.map((data) => {
    // passing return data inside li tag
    return (data = "<li>" + data + "</li>");
  });
  console.log(emptyArray);

  searchWrapper.classList.add("active"); //show autocomplete box
  showSuggestions(emptyArray, 0);
  let allList = suggBox.querySelectorAll("li");
  for (let i = 0; i < allList.length; i++) {
    //adding onclick attribute in all li tag
    allList[i].setAttribute("onclick", "select(this,0)");
  }
};

inputBox.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestions.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    // console.log(suggestions);
    // console.log(emptyArray);
    emptyArray = emptyArray.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
    // console.log(emptyArray);

    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray, 0);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this,0)");
    }
  } else {
    searchWrapper.classList.remove("active"); //hide autocomplete box
  }
};

function select(element, n) {
  let selectData = element.textContent;
  if (n == 0) {
    inputBox.value = selectData;
  } else if (n == 1) {
    inputBox1.value = selectData;
  } else if (n == 2) {
    inputBox2.value = selectData;
  } else if (n == 3) {
    inputBox3.value = selectData;
  }

  if (n == 0) {
    searchWrapper.classList.remove("active");
  } else if (n == 1) {
    searchWrapper1.classList.remove("active");
  } else if (n == 2) {
    searchWrapper2.classList.remove("active");
  } else if (n == 3) {
    searchWrapper3.classList.remove("active");
  }

  searchPhone(n);
}

function showSuggestions(list, n) {
  let listData;
  if (!list.length) {
    let userValue = null;
    if (n == 0) {
      userValue = inputBox.value;
    } else if (n == 1) {
      userValue = inputBox1.value;
    } else if (n == 2) {
      userValue = inputBox2.value;
    } else if (n == 3) {
      userValue = inputBox3.value;
    }
    listData = "<li>" + userValue + "</li>";
  } else {
    listData = list.join("");
  }
  if (n == 0) {
    suggBox.innerHTML = listData;
  } else if (n == 1) {
    suggBox1.innerHTML = listData;
  } else if (n == 2) {
    suggBox2.innerHTML = listData;
  } else if (n == 3) {
    suggBox3.innerHTML = listData;
  }
}

// Search Bar 1

const searchWrapper1 = document.querySelector("#search-input1");
const inputBox1 = searchWrapper1.querySelector("#search1");
const suggBox1 = searchWrapper1.querySelector("#autocom-box1");
const icon1 = searchWrapper1.querySelector("#searchBtn1");

inputBox1.onclick = (e) => {
  let emptyArray = [];
  emptyArray = suggestions;
  emptyArray = emptyArray.map((data) => {
    // passing return data inside li tag
    return (data = "<li>" + data + "</li>");
  });
  console.log(emptyArray);

  searchWrapper1.classList.add("active"); //show autocomplete box
  showSuggestions(emptyArray, 1);
  let allList = suggBox1.querySelectorAll("li");
  for (let i = 0; i < allList.length; i++) {
    //adding onclick attribute in all li tag
    allList[i].setAttribute("onclick", "select(this,1)");
  }
};

inputBox1.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestions.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    // console.log(suggestions);
    // console.log(emptyArray);
    emptyArray = emptyArray.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
    // console.log(emptyArray);

    searchWrapper1.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray, 1);
    let allList = suggBox1.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this,1)");
    }
  } else {
    searchWrapper1.classList.remove("active"); //hide autocomplete box
  }
};

const searchWrapper2 = document.querySelector("#search-input2");
const inputBox2 = searchWrapper2.querySelector("#search2");
const suggBox2 = searchWrapper2.querySelector("#autocom-box2");
const icon2 = searchWrapper2.querySelector("#searchBtn2");

inputBox2.onclick = (e) => {
  let emptyArray = [];
  emptyArray = suggestions;
  emptyArray = emptyArray.map((data) => {
    // passing return data inside li tag
    return (data = "<li>" + data + "</li>");
  });
  console.log(emptyArray);

  searchWrapper2.classList.add("active"); //show autocomplete box
  showSuggestions(emptyArray, 2);
  let allList = suggBox2.querySelectorAll("li");
  for (let i = 0; i < allList.length; i++) {
    //adding onclick attribute in all li tag
    allList[i].setAttribute("onclick", "select(this,2)");
  }
};

inputBox2.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestions.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    // console.log(suggestions);
    // console.log(emptyArray);
    emptyArray = emptyArray.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
    // console.log(emptyArray);

    searchWrapper2.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray, 2);
    let allList = suggBox2.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this,2)");
    }
  } else {
    searchWrapper2.classList.remove("active"); //hide autocomplete box
  }
};

const searchWrapper3 = document.querySelector("#search-input3");
const inputBox3 = searchWrapper3.querySelector("#search3");
const suggBox3 = searchWrapper3.querySelector("#autocom-box3");
const icon3 = searchWrapper3.querySelector("#searchBtn3");

inputBox3.onclick = (e) => {
  let emptyArray = [];
  emptyArray = suggestions;
  emptyArray = emptyArray.map((data) => {
    // passing return data inside li tag
    return (data = "<li>" + data + "</li>");
  });
  console.log(emptyArray);

  searchWrapper3.classList.add("active"); //show autocomplete box
  showSuggestions(emptyArray, 3);
  let allList = suggBox3.querySelectorAll("li");
  for (let i = 0; i < allList.length; i++) {
    //adding onclick attribute in all li tag
    allList[i].setAttribute("onclick", "select(this,3)");
  }
};

inputBox3.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestions.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    // console.log(suggestions);
    // console.log(emptyArray);
    emptyArray = emptyArray.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
    // console.log(emptyArray);

    searchWrapper3.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray, 3);
    let allList = suggBox3.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this,3)");
    }
  } else {
    searchWrapper3.classList.remove("active"); //hide autocomplete box
  }
};