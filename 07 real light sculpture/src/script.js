import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader'
import style from './style.css';

let scene, camera, renderer, controls, axesHelper, loader, model;

function init(){
  //scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);
 
  
  //camera
  camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,5000);
  camera.position.set(0,25,25);
  scene.add(camera)
  
  //helper
  axesHelper = new THREE.AxesHelper( 500 );
  
  //renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  //orbit controls
  controls = new OrbitControls(camera, renderer.domElement)

  scene.add(axesHelper)

  //loader
  loader = new GLTFLoader();
  loader.load('model/scene.gltf', result => {
    model = result.scene.children[0]
    scene.add(model)
  })
}
init()

//animation
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