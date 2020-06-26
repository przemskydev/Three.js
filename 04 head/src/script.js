import style from './style.css';
import * as THREE from 'three';
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//variables
let container,
  scene,
  camera,
  renderer,
  loader,
  sphere,
  light1,
  light2,
  light3,
  light4,
  object,
  controls;

//container
container = document.createElement('div');
document.body.appendChild(container);

//scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0x141414);

//camera
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0.0, 0.0, 100);

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

//controls
controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.minDistance = 100;
controls.maxDistance = 500;

//loader
loader = new OBJLoader();
loader.load(
  '3Dmodels/WDHead.obj',
  function (obj) {
    object = obj;
    object.scale.multiplyScalar(0.8);
    object.position.y = - 30;
    scene.add(object);
  }
)

//sphere
sphere = new THREE.SphereBufferGeometry(0.5, 16, 8);

//lights
light1 = new THREE.PointLight(0xff0040, 2, 50);
light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
scene.add(light1);

light2 = new THREE.PointLight(0x0040ff, 2, 50);
light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff })));
scene.add(light2);

light3 = new THREE.PointLight(0x80ff80, 2, 50);
light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x80ff80 })));
scene.add(light3);

light4 = new THREE.PointLight(0xffaa00, 2, 50);
light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
scene.add(light4);



//resize window
const handleResize = () => {
  //Adjusting the window size
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  //Change of camera aspect and update aspect with new features.
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}

//functionality
// let clock = new THREE.Clock();
// let time = Date.now() * 0.0005;
// let delta = clock.getDelta();
//animation loop
const loop = () => {
  requestAnimationFrame(loop);

  let clock = new THREE.Clock();
  let time = Date.now() * 0.0005;
  let delta = clock.getDelta();

  if (object) object.rotation.y -= 0.5 * delta;

  light1.position.x = Math.sin(time * 0.7) * 30;
  light1.position.y = Math.cos(time * 0.5) * 40;
  light1.position.z = Math.cos(time * 0.3) * 30;

  light2.position.x = Math.cos(time * 0.3) * 30;
  light2.position.y = Math.sin(time * 0.5) * 40;
  light2.position.z = Math.sin(time * 0.7) * 30;

  light3.position.x = Math.sin(time * 0.7) * 30;
  light3.position.y = Math.cos(time * 0.3) * 40;
  light3.position.z = Math.sin(time * 0.5) * 30;

  light4.position.x = Math.sin(time * 0.3) * 30;
  light4.position.y = Math.cos(time * 0.7) * 40;
  light4.position.z = Math.sin(time * 0.5) * 30;

  renderer.render(scene, camera);
};

loop();
window.addEventListener("resize", handleResize);