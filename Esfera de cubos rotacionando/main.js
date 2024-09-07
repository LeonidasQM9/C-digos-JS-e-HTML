import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const group = new THREE.Group();  

let n = 30;
let m = 20;

for(let j = 0; j < m; j++) {
    for(let i = 0; i < n; i++) {
        const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
        const cube = new THREE.Mesh( geometry, material );

        let r = 3;
        let theta = 2.0 * Math.PI * j / m;
        let phi = Math.PI * i / n;

        cube.position.x = r * Math.sin(phi) * Math.sin(theta);
        cube.position.y = r * Math.cos(phi);
        cube.position.z = r * Math.sin(phi) * Math.cos(theta);

        group.add(cube);  
    }
}

scene.add(group);  
camera.position.z = 6;

function animate() {
    group.rotation.x += 0.01;  
    group.rotation.y += 0.01;  

    group.children.forEach(cube => {
        cube.material.color.setHex(Math.random() * 0xffffff);
    });

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );
