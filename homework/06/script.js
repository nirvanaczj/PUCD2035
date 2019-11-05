//data
var startColor

var warm = false
var cold = false
var personalfav = false

function save(){
  console.log('save to personal fav')
  var allPalatte = document.querySelectorAll('.palatte')
  var favColor = []
  for(var i = 0; i < allPalatte.length; i++){
    favColor.push(allPalatte[i].style.backgroundColor)
  }
  localStorage.setItem('favcolor',JSON.stringify(favColor))
  alert("Successfully set!");
}

function handlepersonalfav(){ 
  if(localStorage.getItem('favcolor')){
  personalfav = true
  var container = document.querySelector('.container')
  container.innerHTML = ''
  var favColors = JSON.parse(localStorage.getItem('favcolor'))
  console.log(favColors)
  for(var i = 0; i < favColors.length; i++){
    var newdiv = document.createElement('div')
    newdiv.className = "palatte"
    newdiv.style.backgroundColor = favColors[i]
    document.querySelector('.container').appendChild(newdiv)
    var rgbarray = newdiv.style.backgroundColor.slice(4,-1).split(',')
    var hex = rgbarray.map(function(x){      //For each array element
        x = parseInt(x).toString(16);      //Convert to a base16 string
        return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
    })
    hex = "#"+hex.join("");
    var favHSL = rgb2hsv(rgbarray[0],rgbarray[1],rgbarray[2])
    console.log(favHSL)
    if(favHSL['v'] < 50){
    newdiv.innerHTML = `<div class="colorcode" style="color:white">${newdiv.style.backgroundColor}<br>${hex}<div>`}
    if(favHSL['v'] > 50){
    newdiv.innerHTML = `<div class="colorcode" style="color:black">${newdiv.style.backgroundColor}<br>${hex}<div>`}
  }
} else if(!localStorage.getItem('favcolor')){
  var defaultbtn = document.getElementById("default");
  defaultbtn.checked = true;
  var personalbtn = document.getElementById("personalfav");
  personalbtn.checked = false;
  handledefault()
  alert("You haven't set your personal favorite color!");
}
}

function handledefault(){
  console.log('Change to random color palatte')
  personalfav = false
  warm = false;
  cold = false;
  refreshpalatte()
}
function handlewarm(){
  console.log('Change to warm color palatte')
  personalfav = false
  warm = true;
  cold = false
  refreshpalatteWarm()
}

function handlecold(){
  console.log('Change to cold color palatte')
  personalfav = false
  cold = true;
  warm = false
  refreshpalatteCold()
}

//methods
function generateRandom()
{var counter = 0
var rgbarray = []
var hexcode = ''
while(counter < 6){
var newdiv = document.createElement('div')
newdiv.className = "palatte"
var generatedHvalue = (Math.random()*360)
var generatedSvalue = (Math.random()*50)
var generatedLvalue = 10+(Math.random()*80)
var generatedHSVcolor = `hsl(${generatedHvalue}, ${generatedSvalue}%, ${generatedLvalue}%)`
var generatedHSVcolorContrast = `hsl(${generatedHvalue+180}, ${generatedSvalue}%, ${generatedLvalue}%)`
newdiv.style.backgroundColor = generatedHSVcolor
document.querySelector('.container').appendChild(newdiv)
rgbarray = newdiv.style.backgroundColor.slice(4,-1).split(',')
var hex = rgbarray.map(function(x){      //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
})
hex = "#"+hex.join("");
if(generatedLvalue < 50){
newdiv.innerHTML = `<div class="colorcode" style="color:white">${newdiv.style.backgroundColor}<br>${hex}<div>`}
if(generatedLvalue > 50){
newdiv.innerHTML = `<div class="colorcode" style="color:black">${newdiv.style.backgroundColor}<br>${hex}<div>`}
counter ++}}

function generateRandomWarm()
{var counter = 0
var rgbarray = []
var hexcode = ''
while(counter < 6){
var newdiv = document.createElement('div')
newdiv.className = "palatte"
if(Math.random()>0.5){
var generatedHvalue = (Math.random()*90)}
else{var generatedHvalue = 270 + (Math.random()*90)}
console.log(generatedHvalue)
var generatedSvalue = (Math.random()*50)
var generatedLvalue = 10+(Math.random()*80)
var generatedHSVcolor = `hsl(${generatedHvalue}, ${generatedSvalue}%, ${generatedLvalue}%)`
var generatedHSVcolorContrast = `hsl(${generatedHvalue+180}, ${generatedSvalue}%, ${generatedLvalue}%)`
newdiv.style.backgroundColor = generatedHSVcolor
document.querySelector('.container').appendChild(newdiv)
rgbarray = newdiv.style.backgroundColor.slice(4,-1).split(',')
var hex = rgbarray.map(function(x){      //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
})
hex = "#"+hex.join("");
if(generatedLvalue < 50){
newdiv.innerHTML = `<div class="colorcode" style="color:white">${newdiv.style.backgroundColor}<br>${hex}<div>`}
if(generatedLvalue > 50){
newdiv.innerHTML = `<div class="colorcode" style="color:black">${newdiv.style.backgroundColor}<br>${hex}<div>`}
counter ++}}

function generateRandomCold()
{var counter = 0
var rgbarray = []
var hexcode = ''
while(counter < 6){
var newdiv = document.createElement('div')
newdiv.className = "palatte"
var generatedHvalue = 90+(Math.random()*180)
var generatedSvalue = (Math.random()*50)
var generatedLvalue = 10+(Math.random()*80)
var generatedHSVcolor = `hsl(${generatedHvalue}, ${generatedSvalue}%, ${generatedLvalue}%)`
var generatedHSVcolorContrast = `hsl(${generatedHvalue+180}, ${generatedSvalue}%, ${generatedLvalue}%)`
newdiv.style.backgroundColor = generatedHSVcolor
document.querySelector('.container').appendChild(newdiv)
rgbarray = newdiv.style.backgroundColor.slice(4,-1).split(',')
var hex = rgbarray.map(function(x){      //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
})
hex = "#"+hex.join("");
if(generatedLvalue < 50){
newdiv.innerHTML = `<div class="colorcode" style="color:white">${newdiv.style.backgroundColor}<br>${hex}<div>`}
if(generatedLvalue > 50){
newdiv.innerHTML = `<div class="colorcode" style="color:black">${newdiv.style.backgroundColor}<br>${hex}<div>`}
counter ++}}

function titleColor(){
  var generatedHvalue = (Math.random()*250)
  var generatedSvalue = (Math.random()*50)
  var generatedLvalue = (Math.random()*100)
  var generatedHSVcolor = `hsl(${generatedHvalue}, ${generatedSvalue}%, ${generatedLvalue}%)`
  var title = document.getElementById('title')
  title.style.backgroundColor= generatedHSVcolor
  if(generatedLvalue < 50){
  title.style.color="white"
  }
    if(generatedLvalue > 50){
  title.style.color="black"}
    }


function refreshpalatte(){
  var container = document.querySelector('.container')
  container.innerHTML = ''
  generateRandom()
  titleColor()
}

function refreshpalatteWarm(){
  var container = document.querySelector('.container')
  container.innerHTML = ''
  generateRandomWarm()
  titleColor()
}

function refreshpalatteCold(){
  var container = document.querySelector('.container')
  container.innerHTML = ''
  generateRandomCold()
  titleColor()
}

function refreshpage(evt){
  if (personalfav){
    return
  }
  else if (evt.keyCode == 32 && !warm && !cold) {
    refreshpalatte();
    event.preventDefault();}
  else if (evt.keyCode == 32 && warm && !cold){
    console.log('warm')
    refreshpalatteWarm();
    event.preventDefault();
  }
  else if (evt.keyCode == 32 && !warm && cold){
    console.log('cold')
    refreshpalatteCold();
    event.preventDefault();
  }
}

//Jquery code to refresh page
// $("body").keydown(refreshpage).keypress(refreshpage);
$("body").keydown(refreshpage)

//Created
generateRandom()
titleColor()
console.log(navigator.userAgent)

if ((navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
 document.getElementById('responsive').style.display = 'block';
  alert("This Color Palatte Generator does not support mobile yet! Redirecting to owner's personal website")
  window.location.assign("https://www.zijiachen.com")
}

//standalone rgbtohsvfunction
function rgb2hsv (r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
}
