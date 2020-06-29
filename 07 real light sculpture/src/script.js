import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader'
import style from './style.css';

let scene, camera, renderer, controls, axesHelper, loader, model, light1, light2, geometry,
  material, cube;

function init() {
  //scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);


  //camera
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, .1, 1000);
  camera.position.set(0, 20, 50);
  scene.add(camera)

  //helper
  // axesHelper = new THREE.AxesHelper(500);

  //renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 2;
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  //orbit controls
  controls = new OrbitControls(camera, renderer.domElement)

  // scene.add(axesHelper)

  //loader
  loader = new OBJLoader();
  loader.load('model/source/apollo.obj', result => {
    model = result
    model.position.set(0, -18, 0);
    model.rotation.set(4.7, 0, 0)
    //update the properties if the object is a mesh
    model.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    })
    scene.add(model)
  })

  //light
  light1 = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
  scene.add(light1)

  light2 = new THREE.SpotLight(0xffa95c, 4);
  light2.position.set(-50, 50, 50);
  //decrease shadow bias, reduce the shadow sensitivity
  light2.shadow.bias = -0.0001;
  //increase the shadow resolution by increasing the mapSize to a multiplier of 1024
  light2.shadow.mapSize.width = 1024 * 4;
  light2.shadow.mapSize.height = 1024 * 4;
  light2.castShadow = true;
  scene.add(light2);
}
init()

//animation
const loop = () => {
  requestAnimationFrame(loop);
  light2.position.set(
    camera.position.x + 10,
    camera.position.y + 10,
    camera.position.z + 10
  )
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