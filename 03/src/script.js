import style from './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TimelineMax, Expo } from 'gsap';


let scene, camera, renderer, controls;

//scene
scene = new THREE.Scene();

//camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.set(14, 7, 0)

//renderer
renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
}); renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//controls
controls = new OrbitControls(camera, renderer.domElement);
controls.update();

/*

world
**********************************************
*/

//geometry
const createBox = (w = 1, h = 1, d = 1, color = 0xffffff) => {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshLambertMaterial(color);
  return new THREE.Mesh(geometry, material)
};

const box = createBox();
box.position.set(-2, 1, 0)

//light
const createLight = (int = 1, color = 0xffffff) => {
  return new THREE.PointLight(color, int)
};

const light = createLight(1.6, 0xffffff);
light.position.set(10, 5, -15);

const light2 = createLight(1.3, 0xffffff);
light2.position.set(-15, -20, 25);




//creating world
for (let index = 0; index < 20; index++) {
  const box = createBox();
  box.position.x = (Math.random() - .5) * 10;
  box.position.y = (Math.random() - .5) * 10;
  box.position.z = (Math.random() - .5) * 10;
  scene.add(box, light, light2)
}

//functionality

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function onMouseMove(e) {
  e.preventDefault;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  function numGen() {
    // let num = Math.floor(Math.random() * 2) + 1;
    // num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    let num = (Math.random() - .5) * 10
    return num
  }

  for (let i = 0; i < intersects.length; i++) {
      // intersects[ i ].object.material.color.set( 0xff0000 );
    const timeline = new TimelineMax();
    timeline.to(intersects[i].object.scale, .5, { x: 2, ease: Expo.easeInOut });
    timeline.to(intersects[i].object.scale, .5, { x: 1, ease: Expo.easeInOut });
    timeline.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut });
    timeline.to(intersects[i].object.position, .9, { x: numGen(), ease: Expo.easeOut, y: numGen(), ease: Expo.easeOut });
  }
}

window.addEventListener('mousemove', onMouseMove)

//resize window
const handleResize = () => {
  //Adjusting the window size
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  //Change of camera aspect and update aspect with new features.
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}

//animation loop
const loop = () => {
  requestAnimationFrame(loop);

  renderer.render(scene, camera);
};

loop();
window.addEventListener("resize", handleResize);