import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const loader = new THREE.TextureLoader();
scene.background = loader.load( 'https://i3.wp.com/wallpapercave.com/wp/wp3140064.jpg' );
const texture = new THREE.TextureLoader().load('textures/Blue lock.jpg');
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { /*color: 0xffffff, wireframe:true*/ map: texture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

let arrowUp = false;
let arrowDown = false;
let arrowLeft = false;
let arrowRight = false;

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	if(arrowUp){
		cube.position.y += 0.1;
	}

	if(arrowDown){
		cube.position.y += -0.1;
	}
	if(arrowLeft){
		cube.position.x += -0.1;
	}
	if(arrowRight){
		cube.position.x += 0.1;
	}

	renderer.render( scene, camera );

}

document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event){
	console.log(event.key);
	console.log(event.keyCode);
	switch(event.key){
		case "ArrowUp":
			arrowUp = true;
		break;
		case "ArrowDown":
			arrowDown = true;
		break;	
		case "ArrowLeft":
			arrowLeft = true;
		break;
		case "ArrowRight":
			arrowRight = true;
		break;

	}
}


document.addEventListener("keyup", onDocumentKeyUp, false);

function onDocumentKeyUp(event){
	console.log(event.key);
	console.log(event.keyCode);
	switch(event.key){
		case "ArrowUp":
			arrowUp = false;
		break;	
		case "ArrowDown":
			arrowDown = false;
		break;	
		case "ArrowLeft":
			arrowLeft = false;
		break;
		case "ArrowRight":
			arrowRight = false;
		break;
	}
}



