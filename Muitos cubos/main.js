import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const m = 10;
const n = 10;
const p = 10;
const deltaX = 0.4;
const deltaY = 0.4;
const deltaZ = 0.4;
const side = 1.0;
let offsetX = ((m - 1)* (deltaX + side))/2.0;
let offsetY = ((m - 1)* (deltaX + side))/2.0;
let offsetZ = ((m - 1)* (deltaZ + side))/2.0;
let cubes = []

for(let p = 0;p < m; p++){
	for(let j = 0;j < m; j++){
		for(let i = 0;i < m; i++){
			const texture = new THREE.TextureLoader().load('textures/Blue lock.jpg');
			const geometry = new THREE.BoxGeometry( side, side, side );
			const material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe:true /*map:texture*/  } );
			const cube = new THREE.Mesh( geometry, material );
			cube.position.x = i*(side + deltaX) -offsetX;
			cube.position.y = j*(side + deltaY) -offsetY;
			cube.position.z = p*(side + deltaZ) -offsetZ;
			cubes.push(cube);
			scene.add( cube );
		}
	}
}

let theta = 0.0;
camera.position.z = 5;
const R = 2;

function animate() {
	for(var cube of cubes){
		cube.position.z += 0.1;
		if(cube.position.z > camera.position.z){
			cube.position.z = -10;
		}
	}

	theta += 0.1;

	renderer.render( scene, camera );
	cube.position.x = R*Math.cos(theta);
	cube.position.y = R*Math.sin(theta);
}
renderer.setAnimationLoop( animate );


