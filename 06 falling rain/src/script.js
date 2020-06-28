import * as THREE from 'three';
import style from './style.css';

//variables
let container,
  scene,
  camera,
  renderer,
  loader,
  clock,
  light1,
  light2,
  poratalVortex = [],
  poratalBgVortex = [];

//container
container = document.createElement('div');
document.body.appendChild(container);

//scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0x141414);

//camera
camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0.0, 0.0, 1000);
scene.add(camera)

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

//lights


//loader


//animation loop

const loop = () => {
  requestAnimationFrame(loop);


  renderer.render(scene, camera);
};

loop();
window.addEventListener("resize", () => {
  //Adjusting the window size
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  //Change of camera aspect and update aspect with new features.
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});