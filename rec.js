var startpage = document.getElementById('layer1')
var recpage = document.getElementById('layer4')
var homepage = document.getElementById('layer5')
function initcheck() {
  if (!localStorage.getItem("faceID")) {
    startpage.style.display = "flex";
    recpage.style.display= "none"
  } else if (localStorage.getItem("faceID")) {
    document.getElementById("welcome").innerHTML = `Hey ${localStorage.getItem('username')}, welcome back!`
    recpage.style.display= "flex"
    startpage.style.display = "none";
    var localPic = localStorage.getItem("face");
    var dataUrl = "data:image/png;base64," + localPic;
    var photo = document.getElementById("photo");
    photo.setAttribute("src", dataUrl);
  }
}

initcheck();

function initverify() {
  var shotbutton = document.getElementById("takeshot");
  var startbutton = document.getElementById("verifybutton");
  var thisisnotme = document.getElementById("clearbutton");
  thisisnotme.style.display = 'none';
  document.getElementById("welcome").innerHTML = "Smile😊"
  startbutton.style.display = "none";
  shotbutton.style.display = "block";
  startverify();
}

var width = 400;
var height = 0;
var streaming = false;
var video = null;
var canvas = null;
var photo = null;
var startbutton = null;
var bloblink = null;
var blobverify = null;
var localStreamVe;
function startverify() {
  width = 400;
  video = document.getElementById("videoverify");
  photo = document.getElementById("photo");
  canvas = document.getElementById("placeholder");
  startbutton = document.getElementById("takeshot");
  photo.style.display = "none";
  video.style.display = "block";
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
      localStreamVe = stream
    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });
  video.addEventListener(
    "canplay",
    function(ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    },
    false
  );
  startbutton.addEventListener(
    "click",
    function(ev) {
      takepicturetoverify();
      ev.preventDefault();
    },
    false
  );
  // clearphoto();
}

// function clearphoto() {
//   var context = canvas.getContext("2d");
//   context.fillStyle = "#AAA";
//   context.fillRect(0, 0, canvas.width, canvas.height);

//   var data = canvas.toDataURL("image/png");
//   // photo.setAttribute("src", data);
// }

function takepicturetoverify() {
  var canvas = document.getElementById("placeholder");
  var context = canvas.getContext("2d");
  if (width && height) {
    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL("image/png");
    // photo.setAttribute("src", data);
    blobverify = data;
    retrievecodeVerify()
  }
}

function retrievecodeVerify() {
  // Replace <Subscription Key> with your valid subscription key.
  var subscriptionKey = "76b765a7221143dba0b6b4c8829b3302";

  var uriBase =
    "https://freesssss.cognitiveservices.azure.com/face/v1.0/detect";

  // Request parameters.
  var params = {
    returnFaceId: "true",
    returnFaceLandmarks: "false"
  };

  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",
    contentType: false,
    processData: false,
    data: makeblob(blobverify)
  })

    .done(function(data) {
      if (data[0]) {
        var tobeverified = data[0].faceId
        var storedfaceid = localStorage.getItem('faceID')
        faceverify(tobeverified,storedfaceid)
      }
      else if (!data[0]){
        alert('no face was detected!')
      }
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString =
        errorThrown === ""
          ? "Error. "
          : errorThrown + " (" + jqXHR.status + "): ";
      errorString +=
        jqXHR.responseText === ""
          ? ""
          : jQuery.parseJSON(jqXHR.responseText).message
          ? jQuery.parseJSON(jqXHR.responseText).message
          : jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    });
}


function faceverify(faceId1,faceId2) {
  var subscriptionKey = "76b765a7221143dba0b6b4c8829b3302";
  var uriBase = "https://freesssss.cognitiveservices.azure.com/face/v1.0/verify";
  $.ajax({
    url: uriBase,

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",
    data: `{'faceId1': '${faceId1}','faceId2': '${faceId2}'}`
  })

    .done(function(data) {
      if (data.isIdentical) {
        initDesktop();
        alert("Welcome home!")
        recpage.style.display = 'none'
        homepage.style.display = 'flex'
        vidOffVe();
        afterLoadDesktop();
        localStorage.setItem('lastLogin',new Date().toLocaleString("en-US"))

      }
      else if (!data.isIdentical){
        alert("Who are you?")
      }
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString =
        errorThrown === ""
          ? "Error. "
          : errorThrown + " (" + jqXHR.status + "): ";
      errorString +=
        jqXHR.responseText === ""
          ? ""
          : jQuery.parseJSON(jqXHR.responseText).message
          ? jQuery.parseJSON(jqXHR.responseText).message
          : jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    });
}

function clearStorage(){
  if (window.confirm("Hooman, are you sure?? this will clear all existing local data.")) {
  localStorage.clear()
  window.location.reload()}
}


function vidOffVe() {
    var video = document.getElementById("videoverify");
    video.pause();
    video.src = "";
    localStreamVe.getVideoTracks()[0].stop();

}