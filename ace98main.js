var layer5 = document.getElementById("layer5");
var timenow = document.getElementById("TimeNow");
var allitems = document.querySelectorAll(".items");
var appbackground = document.getElementById("apps");
var movableElmnt = ["notebook", "weather"];
var theitemselected;
var corf = 'c';
var notebookdialog = document.getElementById("notebook");
var weatherdialog = document.getElementById("weather");
var menubar = document.getElementById("menubar")

if(localStorage.getItem('corf')){
  corf = localStorage.getItem('corf')
}

for (var i = 0; i < allitems.length; i++) {
  movableElmnt.push(allitems[i].id);
}

function initDesktop() {
  /** MAKE ALL ELEMENTS DRAGGABLE **/
  dragElement(document.getElementById("notebook"));
  dragElement(document.getElementById("weather"));
  for (var i = 0; i < allitems.length; i++) {
    dragElement(allitems[i]);
  }

  /** USER TIME AS NOW **/
  var timeasnow = new Date().toLocaleString("en-US").slice(0, -6);
  var amorpm = new Date().toLocaleString("en-US").slice(-2);
  var usertime = timeasnow + amorpm;
  // .slice(0,16) + new Date().toLocaleString("en-US").slice(20);
  timenow.innerHTML = usertime;
  getBatteryLevel()
  setInterval(function() {
    var timeasnow = new Date().toLocaleString("en-US").slice(0, -6);
    var amorpm = new Date().toLocaleString("en-US").slice(-2);
    var usertime = timeasnow + amorpm;
    // .slice(0,16) + new Date().toLocaleString("en-US").slice(20);
    timenow.innerHTML = usertime;
  }, 20000);
  setInterval(getBatteryLevel,100)
  /** RETRIEVING FROM LOCALSTORAGE **/

  if (localStorage.getItem("notebook")) {
    document.getElementById("notebookText").value = localStorage.getItem(
      "notebook"
    );
  }

  if (!localStorage.getItem("itemcount")) {
    localStorage.setItem("itemcount", 0);
  } else if (localStorage.getItem("itemcount")) {
    var allitemcount = localStorage.getItem("itemcount");
    for (var i = 0; i < allitemcount; i++) {
      additem(JSON.parse(localStorage.getItem(`newitem ${i}`)));
    }
  }

  allitems = document.querySelectorAll(".items");
  for (var i = 0; i < allitems.length; i++) {
    movableElmnt.push(allitems[i].id);
  }

  for (var i = 0; i < movableElmnt.length; i++) {
    if (
      localStorage.getItem(`${movableElmnt[i]} top`) &&
      localStorage.getItem(`${movableElmnt[i]} left`)
    ) {
      document.getElementById(movableElmnt[i]).style.top = localStorage.getItem(
        `${movableElmnt[i]} top`
      );
      document.getElementById(
        movableElmnt[i]
      ).style.left = localStorage.getItem(`${movableElmnt[i]} left`);
    }
  }

  if (localStorage.getItem("delitems")) {
    var dellist = JSON.parse(localStorage.getItem("delitems"));
    for (var i = 0; i < dellist.length; i++) {
      $(`#${dellist[i]}`).hide();
    }
  }

  /** END OF RETRIEVING FROM LOCALSTORAGE **/

  /** DESKTOP CONTEXT MENU **/
// var allitems = document.querySelectorAll(".items");

  for (var i = 0; i < allitems.length; i++) {
    allitems[i].addEventListener(
      "contextmenu",
      function(event) {
        event.preventDefault();
        theitemselected = document.querySelectorAll("div.items:hover")[0];
        var ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.style.display = "block";
        ctxMenu.style.left = event.pageX - 10 + "px";
        ctxMenu.style.top = event.pageY - 10 + "px";
        var ctxMenuAll = document.getElementById("ctxMenuAll");
        ctxMenuAll.style.display = "";
        ctxMenuAll.style.left = "";
        ctxMenuAll.style.top = "";
      },
      false
    );
  }
  appbackground.addEventListener(
    "contextmenu",
    function(event) {
      event.preventDefault();
      var ctxMenuAll = document.getElementById("ctxMenuAll");
      ctxMenuAll.style.display = "block";
      ctxMenuAll.style.left = event.pageX - 10 + "px";
      ctxMenuAll.style.top = event.pageY - 10 + "px";
      var ctxMenu = document.getElementById("ctxMenu");
      ctxMenu.style.display = "";
      ctxMenu.style.left = "";
      ctxMenu.style.top = "";
    },
    false
  );
  layer5.addEventListener(
    "click",
    function(event) {
      var ctxMenu = document.getElementById("ctxMenu");
      ctxMenu.style.display = "";
      ctxMenu.style.left = "";
      ctxMenu.style.top = "";
    },
    false
  );
  layer5.addEventListener(
    "click",
    function(event) {
      var ctxMenu = document.getElementById("ctxMenuAll");
      ctxMenu.style.display = "";
      ctxMenu.style.left = "";
      ctxMenu.style.top = "";
    },
    false
  );
  notebookdialog.addEventListener(
  "contextmenu",
  function(event){event.preventDefault();})
  
  menubar.addEventListener(
  "contextmenu",
  function(event){event.preventDefault();})
  
  weatherdialog.addEventListener(
  "contextmenu",
  function(event){event.preventDefault();})
  getWeather()
  /** GET USER WEATHER DATA **/
}

// initDesktop();

function afterLoadDesktop(){

  var username = localStorage.getItem('username')
  var lastLogin = localStorage.getItem('lastLogin')
  var amorpm = new Date().toLocaleString("en-US").slice(-2);
  var hourNum  = new Date().getHours()
  // console.log(amorpm, hourNum)
  if (hourNum >= 0 && hourNum <= 12){
    var greeting = 'morning'
  }
  else if (hourNum > 12 && hourNum <= 18){
    var greeting = 'afternoon'
  }
  else if (hourNum > 18 && hourNum <= 24){
    var greeting = 'evening'
  }
  // else if (amorpm == 'PM' && hourNum >= 6){
  //   var greeting = 'evening'
  // }
  
  var greetingmsg = `Good ${greeting}, ${username}!`
  if(localStorage.getItem('lastLogin')){
  var yourlasttimeLogin = 'Your last login time was '
  var lastLoginmsg = lastLogin}
  // document.getElementById('noticemsg').innerHTML = greetingmsg
    // $('#noticemsg').text(greetingmsg)
  var i = 0;
  var b = 0;
  var j = 0;
  var d = 0;
  var f = 0;
  var speed = 75;
  function typeWriter() {
  if (i < greetingmsg.length) {
    document.getElementById("noticemsg").innerHTML += greetingmsg.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  else if (i == greetingmsg.length && b == 0){
    document.getElementById("noticemsg").innerHTML += '<br>';
    b++;
    setTimeout(typeWriter, speed);
  }
  else if (b == 1 && j < yourlasttimeLogin.length){
    document.getElementById("noticemsg").innerHTML += yourlasttimeLogin.charAt(j);
    j++;
    setTimeout(typeWriter, speed);    
  }
  else if (j == yourlasttimeLogin.length && d == 0){
    document.getElementById("noticemsg").innerHTML += '<br>';
    d++;
    setTimeout(typeWriter, speed);
  }
    else if (f < lastLoginmsg.length && d == 1){
    document.getElementById("noticemsg").innerHTML += lastLoginmsg.charAt(f);
    f++;
    setTimeout(typeWriter, speed);    
  }
}
  typeWriter()
}

// afterLoadDesktop()
/**playing with Battery **/

function getBatteryLevel(){
navigator.getBattery().then(function(battery) {

    var level = battery.level;
    var charging = battery.charging;
    // console.log(battery)
    if(charging == true){
      $('#batteryasnow').attr("src","https://i.imgur.com/HI4ljWN.png")
    }
    else if(level == 1){
      $('#batteryasnow').attr("src","https://i.imgur.com/LwKLDKC.png")
    }
    else if (level < 1 && level > 0.66){
      $('#batteryasnow').attr("src","https://i.imgur.com/wc5zttc.png")
    }
    else if (level < 0.66 && level > 0.33){
      $('#batteryasnow').attr("src","https://i.imgur.com/GXjJHP0.png")
    }
    else if (level < 0.33 && level > 0.10){
      $('#batteryasnow').attr("src","https://i.imgur.com/nUo0nrU.png")
    }
    else if (level < 0.10 && level > 0.0){
      $('#batteryasnow').attr("src","https://i.imgur.com/bUSsxJK.png")
    }
});
}

function getWeather() {
  $.getJSON("https://jsonip.com/?callback=?", function(data) {
    $.get("https://ipapi.co/" + data.ip + "/latlong/", function(response) {
      var latlong = response.split(",");
      var weatherurl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latlong[0] +
        "&lon=" +
        latlong[1] +
        "&units=metric&appid=179b43c141e26fcdb64ea4e0f01dac15";
      var weatherurlFahrenheit =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latlong[0] +
        "&lon=" +
        latlong[1] +
        "&units=imperial&appid=179b43c141e26fcdb64ea4e0f01dac15";
      if (corf == "c") {
        $.get(weatherurl, function(wResponse) {
          // console.log(wResponse)
          var iconcode = wResponse.weather[0].icon;
          var iconurl =
            "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
          $("#weatherasnow").attr("src", iconurl);
          document.getElementById("mainweather").innerHTML = JSON.stringify(wResponse.weather[0].description).slice(1,-1);
          document.getElementById("tempasnow").innerHTML = 'Temp: '+JSON.stringify(wResponse.main.temp).slice(0,3) + '℃'
          document.getElementById("templowhigh").innerHTML = JSON.stringify(wResponse.main.temp_min).slice(0,3)+'℃'+ '~' + JSON.stringify(wResponse.main.temp_max).slice(0,3) + '℃'
        });
      } else if (corf == "f") {
        $.get(weatherurlFahrenheit, function(wResponse) {
          var iconcode = wResponse.weather[0].icon;
          var iconurl =
            "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
          $("#weatherasnow").attr("src", iconurl);
          document.getElementById("mainweather").innerHTML = JSON.stringify(wResponse.weather[0].description).slice(1,-1);
          document.getElementById("tempasnow").innerHTML = 'Temp: '+JSON.stringify(wResponse.main.temp).slice(0,3) + '℉'
          document.getElementById("templowhigh").innerHTML = JSON.stringify(wResponse.main.temp_min).slice(0,3) + '℉' + '~' + JSON.stringify(wResponse.main.temp_max).slice(0,3) + '℉'
        });
      }
    });
  });
}

function switchCF(){
  if(corf == 'f'){
    corf = 'c'
    localStorage.setItem('corf',corf)
    getWeather()}
  else if(corf == 'c'){
    corf = 'f'
    localStorage.setItem('corf',corf)
    getWeather()
  }
}

/**STORE NOTE**/
function storenote() {
  var notebookText = document.getElementById("notebookText").value;
  localStorage.setItem("notebook", notebookText);
}

/**CLEAR LAYOUT OF ITEMS**/

function clearLayout() {
  allitems = document.querySelectorAll(".items");
  for (var i = 0; i < allitems.length; i++) {
    movableElmnt.push(allitems[i].id);
  }
  $("div.items").css({ top: "" });
  $("div.items").css({ left: "" });
  $("div#notebook").css({ top: "" });
  $("div#notebook").css({ left: "" });
  $("div#weather").css({ top: "" });
  $("div#weather").css({ left: "" });
  for (var i = 0; i < movableElmnt.length; i++) {
    localStorage.removeItem(`${movableElmnt[i]} top`);
    localStorage.removeItem(`${movableElmnt[i]} left`);
  }
  // localStorage.removeItem('delitems')
}

// clearLayout()
/** ADD NEW ITEMS TO DESKTOP**/
function createitem(img, link, name) {
  var randomleft = `${Math.round(Math.random() * window.innerWidth * 0.9)}px`;
  var randomtop = `${Math.round(Math.random() * window.innerHeight * 0.9)}px`;
  var newitem = `  <div style="top:${randomtop};left:${randomleft}" class = "items" ondblclick="window.open('${link}')" onclick="itemmousedown(this);" id = "${name}"><img class = "itemlogo" src="${img}"><br/>${name}</div>`;
  movableElmnt.push(name);
  var allitemcount = localStorage.getItem("itemcount");
  localStorage.setItem(`newitem ${allitemcount}`, JSON.stringify(newitem));
  additem(newitem);
  allitemcount++;
  localStorage.setItem("itemcount", allitemcount);
}

function additem(newitem) {
  var element = document.createElement("div");
  $("#allitems").append(element);
  element.outerHTML = newitem;
  allitems = document.querySelectorAll(".items");
  for (var i = 0; i < allitems.length; i++) {
    dragElement(allitems[i]);
    allitems[i].addEventListener(
      "contextmenu",
      function(event) {
        event.preventDefault();
        theitemselected = document.querySelectorAll("div.items:hover")[0];
        var ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.style.display = "block";
        ctxMenu.style.left = event.pageX - 10 + "px";
        ctxMenu.style.top = event.pageY - 10 + "px";
        var ctxMenuAll = document.getElementById("ctxMenuAll");
        ctxMenuAll.style.display = "";
        ctxMenuAll.style.left = "";
        ctxMenuAll.style.top = "";
      },
      false
    );
  }
  closeNewDialog()
}

/** DELETE ITEMS **/

function toggleCreate() {
  $("#newElmntDialog").show();
  console.log('s')
}

function closeNewDialog() {
  $("#newElmntDialog").hide();
}
function switchNotebook(){
  if(document.getElementById("notebook").style.display == 'none'){
    toggleNotebook()
  }
  else{
    closeNotebook()
  }
}
function toggleNotebook() {
  $("#notebook").show();
  $("#notebookOption").hide();
  $("#ctxMenuAll").css({ height: "80px" });
}


function closeNotebook() {
  $("#notebook").hide();
  $("#notebookOption").show();
  $("#ctxMenuAll").css({ height: "120px" });
}

function toggleWeather() {
  $("#weather").show();
}

function closeWeather() {
  $("#weather").hide();
}

function closeNotice(){
  $("#enternotice").hide()
}
function deleteitem() {
  var id = theitemselected.id;
  document.getElementById(id).style.display = "none";
  if (!localStorage.getItem("delitems")) {
    localStorage.setItem("delitems", JSON.stringify([id]));
  } else if (localStorage.getItem("delitems")) {
    var dellist = JSON.parse(localStorage.getItem("delitems"));
    dellist.push(id);
    localStorage.setItem("delitems", JSON.stringify(dellist));
  }
}

function submitnew() {
  var img = $("#newElmntImg").val();
  var link = $("#newElmntLink").val();
  var name = $("#newElmntName").val();

  createitem(img, link, name);
}
// createitem(
//   "https://i.imgur.com/h917uzj.png",
//   "https://www.zijiachen.com",
//   "personal"
// );

/**CREATE BORDER OF ITEM**/
function itemmousedown(e) {
  for (var i = 0; i < allitems.length; i++) {
    allitems = document.querySelectorAll(".items");
    allitems[i].style.border = "none";
    allitems[i].style.background = "transparent";
    allitems[i].classList.remove("clicked");
  }
  e.style.border = "0.01px black dotted";
  e.style.backgroundColor = "rgba(173,216,230,0.7)";
  setTimeout(function() {
    e.classList.add("clicked");
  }, 200);
}

function itemmouseup(e) {}

function itemnoborder() {
  var allnotclicked = document.querySelectorAll(".clicked");
  for (var i = 0; i < allnotclicked.length; i++) {
    allnotclicked[i].style.border = "none";
    allnotclicked[i].style.background = "transparent";
    allnotclicked[i].style.boxSizing = "border-box";
  }
}

/**MAKE ITEM DRAGGABLE**/

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (elmnt.querySelector(".windowhead")) {
    // if present, the header is where you move the DIV from:
    elmnt.querySelector(".windowhead").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    var notetop = elmnt.style.top;
    var noteleft = elmnt.style.left;
    localStorage.setItem(`${elmnt.id} top`, notetop);
    localStorage.setItem(`${elmnt.id} left`, noteleft);
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//screensaver
var timeout;
layer5.onmousemove = function() {
  clearTimeout(timeout);
  document.getElementById("screensaver").style.display = "none";
  timeout = setTimeout(function() {
    document.getElementById("screensaver").style.display = "block";
    console.log("1");
  }, 6000);
};

layer5.onkeydown = function() {
  clearTimeout(timeout);
};
