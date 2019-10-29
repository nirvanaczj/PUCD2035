/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");


var photoArray = [
  'https://cdn.glitch.com/f904e7c6-0953-4066-a1ac-2d98698f4711%2F4.svg?v=1572307448360',
  'https://cdn.glitch.com/f904e7c6-0953-4066-a1ac-2d98698f4711%2F6.svg?v=1572307437215',
  'https://cdn.glitch.com/f904e7c6-0953-4066-a1ac-2d98698f4711%2F5.svg?v=1572307438112',
  'https://cdn.glitch.com/f904e7c6-0953-4066-a1ac-2d98698f4711%2F3.svg?v=1572307439927',
  'https://cdn.glitch.com/f904e7c6-0953-4066-a1ac-2d98698f4711%2F2.svg?v=1572307441366',
  'https://cdn.glitch.com/f904e7c6-0953-4066-a1ac-2d98698f4711%2F1.svg?v=1572307441945'
]

document.getElementById('dice').insertAdjacentHTML('beforeend',`<img src="${photoArray[Math.floor(Math.random()*6)]}"></img>`)
document.getElementById('dice').insertAdjacentHTML('beforeend',`<img src="${photoArray[Math.floor(Math.random()*6)]}"></img>`)