var layer1 = document.getElementById("layer1");
var layer1_5 = document.getElementById("layer1_5");
var layer2 = document.getElementById("layer2");
var layer3 = document.getElementById("layer3");
var progress = document.getElementById("process")
function init() {
  // $('form').fadeOut(0);
  layer1.style.opacity = "0";
  setTimeout(function() {
    layer1.style.display = "none";
    layer1_5.style.display = "flex";
    TweenMax.to("#process", 2.5, { ease: Power4.easeOut, x: '25vw' })
  }, 1000);
  // startup();
}

function submitname(){
  var username = document.getElementById("username").value
  console.log(username)
  if(username === ''){
    alert('Please name yourself :/')
  }
  else{
  localStorage.setItem('username',username)
  layer1_5.style.display = "none"
  layer2.style.display = 'flex'
  startup();
  TweenMax.to("#process", 2.5, { ease: Power4.easeOut, x: '50vw' })
  }
  
}



function notreally(){
  localStorage.clear()
  window.location.reload()
}

function startjourney(){
  TweenMax.to("#process", 2.5, { ease: Power4.easeOut, x: '100vw' })
  setTimeout(function(){window.location.reload()},800)
}

// function showwarning(){
//   // document.getElementById("subintro").style.opacity = '1'
//   document.getElementById("logo").src = "https://i.imgur.com/lAEnmSq.png"
//   document.getElementById("layer1").style.background = "black"
//   document.getElementById("enterbutton").style.background = "white"
// document.getElementById("enterbutton").style.color = "black"
// }

// function hidewarning(){
//   // document.getElementById("subintro").style.opacity = '0'
//   document.getElementById("logo").src = "https://i.imgur.com/quzCPZa.png"
//   document.getElementById("layer1").style.background = "white"
//   document.getElementById("enterbutton").style.background = "black"
//   document.getElementById("enterbutton").style.color = "#EB855B"
// }