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
        // video.play();
    });
}

//=====================================================================================
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000)
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

var px = 0
var py = 0
var pz = 5
var vx = 0
var vy = 0
var vz = 0

camera.position.z = 5
function handleMotionEvent(event) {

	var v0x = vx || 0
	var v0y = vy || 0
	var v0z = vz || 0

  var ax = event.acceleration.x;
  var ay = event.acceleration.y;
  var az = event.acceleration.z;
  var interval = event.interval/100;

	vx += ((ax) * interval)
	vy += ((ay) * interval)
	vz += ((az) * interval)

	// assuming constant acceleration  a over the time period of interval
	// position = 1/2(a * t^2) + (v0 * t) + p0
	px += ((v0x) * interval) + (interval * interval * ax / 2)
	py += ((v0y) * interval) + (interval * interval * ay / 2)
	pz += ((v0z) * interval) + (interval * interval * az / 2)

  // var ralpha = event.rotationRate.alpha;
  // var rbeta = event.rotationRate.beta;
  // var rgamma = event.rotationRate.gamma;

}
window.addEventListener('devicemotion', handleMotionEvent, true); 

function render() {
	requestAnimationFrame(render);
	// egg.rotation.x += 0.01
	// egg.rotation.y += 0.01

	camera.position.x = px
	camera.position.y = py
	camera.position.z = pz

	console.log("px: ", px)
	console.log("py: ", py)
	console.log("pz: ", pz)


	renderer.render(scene, camera)
}

render();

