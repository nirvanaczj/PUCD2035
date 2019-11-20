var width = 400;
var height = 0;
var streaming = false;
var video = null;
var canvas = null;
var photo = null;
var startbutton = null;
var bloblink = null;
var localStream;

function startup() {
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  photo = document.getElementById("photo");
  startbutton = document.getElementById("startbutton");
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
      localStream = stream;
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
      takepicture();
      ev.preventDefault();
    },
    false
  );
  clearphoto();
}

function clearphoto() {
  var context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var data = canvas.toDataURL("image/png");
  // photo.setAttribute("src", data);
}

function retake(){
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  startbutton = document.getElementById("startbutton");
  var retakebutton = document.getElementById("retake");
  retakebutton.style.display = 'none'
  canvas.style.display = 'none'
  video.style.display = 'inline'
  startbutton.style.display = 'inline-block'
}

function takepicture() {
  var context = canvas.getContext("2d");
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  startbutton = document.getElementById("startbutton");
  var retakebutton = document.getElementById("retake");
  startbutton.style.display = 'none'
  retakebutton.style.display = 'inline-block'
  canvas.style.display = 'inline'
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    video.style.display = 'none'
    var data = canvas.toDataURL("image/png");
    // photo.setAttribute("src", data);
    bloblink = data;
    // var bloblink = URL.createObjectURL(b64toBlob(data.slice(22)))
    // bloblink = blobToUint8Array(b64toBlob(data.slice(22)));
    // bloblink = b64toBlob(data.slice(22));
    console.log(bloblink);
  } else {
    clearphoto();
  }
}

function blobToUint8Array(b) {
  var uri = URL.createObjectURL(b),
    xhr = new XMLHttpRequest(),
    i,
    ui8;

  xhr.open("GET", uri, false);
  xhr.send();

  URL.revokeObjectURL(uri);

  ui8 = new Uint8Array(xhr.response.length);

  for (i = 0; i < xhr.response.length; ++i) {
    ui8[i] = xhr.response.charCodeAt(i);
  }

  return ui8;
}

// startup();

function b64toBlob(b64Data) {
  var contentType = "";
  var sliceSize = 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

const makeblob = function(dataURL) {
  var BASE64_MARKER = ";base64,";
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(",");
    var contentType = parts[0].split(":")[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};
