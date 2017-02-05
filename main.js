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

var ax, ay, az, vx, vy, vz;
var px = 0
var py = 0
var pz = 5

camera.position.z = 5
function handleMotionEvent(event) {
	var a0x = ax || 0
	var a0y = ay || 0
	var a0z = az || 0
	var v0x = vx || 0
	var v0y = vy || 0
	var v0z = vz || 0

  ax = event.acceleration.x;
  ay = event.acceleration.y;
  az = event.acceleration.z;
  var interval = event.interval/10;
	

	vx = ((ax - a0x) * interval) + v0x
	vy = ((ay - a0y) * interval) + v0y
	vz = ((az - a0z) * interval) + v0z

	px = ((vx - v0x) * interval * 2) + px
	py = ((vy - v0y) * interval * 2) + py
	pz = ((vz - v0z) * interval * 2) + pz

	// console.log("px: ", px)
	// console.log("py: ", py)
	// console.log("pz: ", pz)
  // var ralpha = event.rotationRate.alpha;
  // var rbeta = event.rotationRate.beta;
  // var rgamma = event.rotationRate.gamma;
				

	
	// console.log("x: ", ax)
	// console.log("y: ", ay)
	// console.log("z: ", az)

	// console.log("interval: ", interval)
	//do something here
}

function render() {
	requestAnimationFrame(render);
	egg.rotation.x += 0.01
	egg.rotation.y += 0.01

	console.log(px)

	camera.position.x = px
	camera.position.y = py
	camera.position.z = pz

	console.log(pz)
	window.addEventListener('devicemotion', handleMotionEvent, true); 


	renderer.render(scene, camera)
}

render();

