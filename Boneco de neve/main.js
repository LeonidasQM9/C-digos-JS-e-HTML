import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let boneco;
// instantiate a loader
const loader = new OBJLoader();
loader.load(
	// resource URL
	'boneco_de_neve.obj',
	// called when resource is loaded
	function(object) {
        boneco = object
	  // Define um material diferente para o objeto
	  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
	  object.traverse(function(child) {
	    if (child instanceof THREE.Mesh) {
	      child.material = material;
	    }
	  });
	  
	  // Adiciona o objeto à cena
	  scene.add(object);
	}
	,
	// called when loading is in progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);
    boneco.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
