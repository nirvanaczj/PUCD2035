function preprocess() {
  layer2.style.cursor = "wait"
  localStorage.setItem("face",bloblink.slice(22))  
  processImage();
}
var layer3 = document.getElementById("layer3");
var layer2 = document.getElementById("layer2");

var confirmwindow = document.getElementById('confirmwindow');

function processImage() {
  // Replace <Subscription Key> with your valid subscription key.
  var subscriptionKey = "76b765a7221143dba0b6b4c8829b3302";

  var uriBase =
    "https://freesssss.cognitiveservices.azure.com/face/v1.0/detect";

  // Request parameters.
  var params = {
    returnFaceId: "true",
    returnFaceLandmarks: "false",
    returnFaceAttributes:
      "age,gender,headPose,smile,facialHair,glasses,emotion," +
      "hair,makeup,occlusion,accessories,blur,exposure,noise"
  };

  // Display the image.
  // var sourceImageUrl = document.getElementById("inputImage").value;
  // document.querySelector("#sourceImage").src = sourceImageUrl;
  document.querySelector("#sourceImage").src = bloblink;
  
  var localPic = localStorage.getItem("face")
  var dataUrl = "data:image/png;base64,"+ localPic
  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      // xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",
    contentType: false,
    processData: false,
    // Request body.
    // data: '{"url": ' + '"' + sourceImageUrl + '"}'
    data: makeblob(dataUrl)
  })

    .done(function(data) {
      // Show formatted JSON on webpage.
      // $("#responseTextArea").val(JSON.stringify(data, null, 2));
      console.log(data);
      if(data[0]){
      // layer3.style.cursor = "default"
      TweenMax.to("#layer2", 0.75, { ease: "power4.out", y: "-100vh" });
      layer3.style.display = "flex";
      setTimeout(function() {
        confirmwindow.style.display = "block";
      }, 400);
      vidOff()
      TweenMax.to("#process", 2.5, { ease: Power4.easeOut, x: '75vw' })
      var username = localStorage.getItem('username')
      var startjourneybutton = document.getElementById('startjourneybutton')
      var notreally = document.getElementById('notreally')
      startjourneybutton.style.display = 'inline-block'
      notreally.style.display = 'inline-block'
      localStorage.setItem('faceID',data[0].faceId)
      var age = ''+data[0].faceAttributes.age;
      var gender = ''+data[0].faceAttributes.gender;
      var glasses = ''+data[0].faceAttributes.glasses;
      var emotion = data[0].faceAttributes.emotion;
      var theemotion = ''+geth(emotion);
      // var makeupeye = data[0].faceAttributes.makeUp.eyemakeup
      // var makeuplip = data[0].faceAttributes.makeUp.lipmakeup
      // var accessory = data[0].faceAttributes.makeUp.accessories
      var haircolor = data[0].faceAttributes.hair.hairColor;
      var thehaircolor = ''+gethvip(haircolor);
      var b = -1
      var c = 0
      var d = 0
      var e = 0
      var f = 0
      var g = 0
      function typeWriter() {
        if (b == -1){
          setTimeout(function(){b++;typeWriter()},750);
        }
        else if (b < username.length) {
          document.getElementById("name").innerHTML += username.charAt(b);
          b++;
          setTimeout(typeWriter, 75);
          console.log(b, '?', username.length)
        }
        else if ( b == username.length && c < age.length){
          if (c < age.length) {
          document.getElementById("age").innerHTML += age.charAt(c);
          c++;
          setTimeout(typeWriter, 75);
        }
        }
        else if ( c == age.length && d < gender.length){
          if (d < gender.length) {
          document.getElementById("gender").innerHTML += gender.charAt(d);
          d++;
          setTimeout(typeWriter, 75);
        }}
        else if ( d == gender.length && e < thehaircolor.length){
          if (e < thehaircolor.length) {
          document.getElementById("haircolor").innerHTML += thehaircolor.charAt(e);
          e++;
          setTimeout(typeWriter, 75);
        }
        }
        else if ( e == thehaircolor.length && f < glasses.length){
          if (f < glasses.length) {
          document.getElementById("glasses").innerHTML += glasses.charAt(f);
          f++;
          setTimeout(typeWriter, 75);
        }
        }
        else if ( f == glasses.length && g < theemotion.length){
          if (g < theemotion.length) {
          document.getElementById("mood").innerHTML += theemotion.charAt(g);
          g++;
          setTimeout(typeWriter, 75);
        }
        }
      }
      typeWriter()
      // typeWriter(age,'age')  
      // typeWriter(gender,'gender')
      // typeWriter(glasses,'glasses')
      // typeWriter(emotion,'mood')
      // typeWriter(thehaircolor,'haircolor')
      // var typeOutput = `Hey, ${username}! I think you are an ${age} years old ${gender} with ${glasses}. You probably feel ${theemotion} now. I am also pretty sure that you have a ${thehaircolor} hair color! Did I guess right?`;
      }
      else{
        alert('no face was detected;')
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

function geth(o) {
  var vals = [];
  for (var i in o) {
    vals.push(o[i]);
  }

  var max = Math.max.apply(null, vals);

  for (var i in o) {
    if (o[i] == max) {
      return i;
    }
  }
}

function gethvip(o) {
  var vals = [];
  for (var i in o) {
    vals.push(o[i]["confidence"]);
  }

  var max = Math.max.apply(null, vals);

  var arrlen = vals.length;
  for (var i = 0; i < arrlen; i++) {
    if (o[i]["confidence"] == max) {
      return o[i]["color"];
    }
  }
}


function vidOff() {
    var video = document.getElementById("video");
    video.pause();
    video.src = "";
    localStream.getVideoTracks()[0].stop();

}


