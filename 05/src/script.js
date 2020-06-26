import style from './style.css';
import * as THREE from 'three';

//variables
let container,
  scene,
  camera,
  renderer,
  loader,
  light1,
  light2,
  light3,
  light4,
  object,
  controls,
  poratalVortex = [];

//container
container = document.createElement('div');
document.body.appendChild(container);

//scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0x141414);

//camera
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0.0, 0.0, 1000);
scene.add(camera)

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

//lights
light1 = new THREE.DirectionalLight(0xffffff, 0.5);
light1.position.set(0, 0, 1);
scene.add(light1)

//loader

loader = new THREE.TextureLoader();

loader.load(
  'textures/smoke.png',
  function (texture) {
    const geometry = new THREE.PlaneBufferGeometry(350, 350);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true
    })

    for (let i = 880 ; i > 250; i--) {
      const portal = new THREE.Mesh(geometry, material);
      portal.position.set(
        .5 * i * Math.cos((4 * i * Math.PI) / 180),
        .5 * i * Math.sin((4 * i * Math.PI) / 180),
        .1 * i
      )
      portal.rotation.z = Math.random() * 360;
      poratalVortex.push(portal)
      scene.add(portal)
    }
  }
)

//resize window
const handleResize = () => {
  //Adjusting the window size
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  //Change of camera aspect and update aspect with new features.
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
console.log(poratalVortex)
//animation loop
const loop = () => {
  requestAnimationFrame(loop);

  let clock = new THREE.Clock();

  let delta = clock.getDelta();

  poratalVortex.forEach(portal => {
    portal.rotation.z -= delta * 1.5
  })

  renderer.render(scene, camera);
};

loop();
window.addEventListener("resize", handleResize);