import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let n = 200; 
const cubes = [];
const spiralSpeed = 0.03; 
const rotationSpeed = 0.04; 

for(let j = 0; j < 10; j++) { 
    for(let i = 0; i < n; i++) {
        const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 ); 
        const colorValue = new THREE.Color(`hsl(${(i / n) * 360}, 100%, 50%)`); 
        const material = new THREE.MeshBasicMaterial({ color: colorValue, wireframe: true });
        const cube = new THREE.Mesh( geometry, material );

        let r = 2 + j * 0.2; 
        let theta = 2.0 * Math.PI * i / n;

        cube.position.x = r * Math.cos(theta);
        cube.position.y = r * Math.sin(theta);
        cube.position.z = j * 0.1; 

        cubes.push({ cube, r, theta, j });

        scene.add( cube );
    }
}

camera.position.z = 10;

function animate() {
    cubes.forEach((obj, index) => {
        obj.theta += spiralSpeed;
        obj.cube.position.x = obj.r * Math.cos(obj.theta);
        obj.cube.position.y = obj.r * Math.sin(obj.theta);
        obj.cube.position.z -= 0.02; 

        
        obj.cube.rotation.x += rotationSpeed;
        obj.cube.rotation.y += rotationSpeed;

        if (obj.cube.position.z < -5) {
            obj.cube.position.z = 5;
        }
    });

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );
