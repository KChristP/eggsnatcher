app = {}
app.input = {}

// Grab elements, create settings, etc.

// Get access to the camera!
// function hasGetUserMedia() {
//   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
//             navigator.mozGetUserMedia || navigator.msGetUserMedia);
// }
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    document.getElementById('cam').innerHTML = 
    `<video id="video" width="${window.innerWidth}" height="${window.innerHeight}" autoplay></video><button id="snap">Snap Photo</button><canvas id="canvas" width="640" height="480"></canvas>`;
    var video = document.getElementById('video');
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

//=====================================================================================
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0x000000, 0 ); // the default

document.getElementById('cam').appendChild(renderer.domElement);

var eggGeometry = new THREE.IcosahedronGeometry(1,3);
// var geometry = new THREE.SphereGeometry( radius, 16, 12 );
eggGeometry.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.0, 1.5 ) );


var eggMaterial = new THREE.MeshNormalMaterial( { wireframe: true } );
var egg = new THREE.Mesh(eggGeometry, eggMaterial);
scene.add(egg);


camera.position.z = 5

function render() {
  requestAnimationFrame(render);
  egg.rotation.x += 0.01
  egg.rotation.y += 0.01
  renderer.render(scene, camera)
  if (app.input.hands && app.input.hands.length > 0) {
    //console.log('HAND', app.input.hands);
  }
}

render();
