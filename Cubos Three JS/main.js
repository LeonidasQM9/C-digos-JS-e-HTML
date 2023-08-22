import * as THREE from 'three';

class simulavel{
    constructor (geometria, velX, velY, velZ){
        this.geometria = geometria;
        this.velX = velX;
        this.velY = velY;
        this.velZ = velZ;
    }

    simule(){
        this.geometria.position.x += this.velX;
        this.geometria.position.y += this.velY;
        this.geometria.position.z += this.velZ;

        if(this.geometria.position.x > 1.0 || this.geometria.position.x < -1.0)
            this.velX = - this.velX;
        if(this.geometria.position.y > 1.0 || this.geometria.position.y < -1.0)
            this.velY = - this.velY; 
        if(this.geometria.position.z > 1.0 || this.geometria.position.z < -1.0)
            this.velZ = - this.velZ;       
    }

}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true } );
const cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );

const obj1 = new simulavel(cube, 0.02, 0.01, 0.03);
const obj2 = new simulavel(cube2, 0.01, 0.02, 0.03);

camera.position.z = 5;

// const velX = 0.01;
// const velY = 0.01;

function animate() {
	requestAnimationFrame( animate );

    obj1.simule();
    obj2.simule();

	//cube.position.x += velX;
	//cube.position.y += velY;
    cube.rotation.x += 0.03;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.01;

    cube2.rotation.x += 0.03;
    cube2.rotation.y += 0.02;
    cube2.rotation.z += 0.01;
	renderer.render( scene, camera );
}
animate();