import * as THREE from 'three';
import style from './style.css';
import { Int8Attribute } from 'three';

//variables
let container,
  scene,
  camera,
  renderer,
  loader,
  clock,
  light1,
  light2,
  cloud,
  cloudGeo,
  cloudMat,
  cloudVortex = [];

init();
function init() {
  //container
  container = document.createElement('div');
  document.body.appendChild(container);

  //scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x141414);
  scene.fog = new THREE.FogExp2(0x11111f, 0.002)
  //camera
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 1);
  camera.rotation.set(1.16, -0.12, 0.27)
  scene.add(camera)

  //lights
  //AmbientLight illuminate all objects in the scene from all direction
  light1 = new THREE.AmbientLight(0x555555)
  light2 = new THREE.DirectionalLight(0xffeedd)
  light2.position.set(0, 0, 1)
  scene.add(light1, light2)

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
}

//loader
clouds();
function clouds() {
  loader = new THREE.TextureLoader();
  loader.load('textures/smoke.png',
    function (texture) {
      cloudGeo = new THREE.PlaneBufferGeometry(500, 500)
      cloudMat = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      })

      for (let i = 0; i < 25; i++) {
        cloud = new THREE.Mesh(cloudGeo, cloudMat);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
        )
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 360;
        cloud.material.opacity = 0.6;
        cloudVortex.push(cloud)
        scene.add(cloud);
      }
    })
}


//animation loop

const loop = () => {
  requestAnimationFrame(loop);

  cloudVortex.forEach(cloud => {
    cloud.rotation.z += 0.002
  })

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