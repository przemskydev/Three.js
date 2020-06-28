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
light1 = new THREE.DirectionalLight(0xffffff, 0.5);
light1.position.set(0, 0, 1);
scene.add(light1)

light2 = new THREE.PointLight(0x062d89, 20, 600, 1.7);
light2.position.set(0, 0, 250);
scene.add(light2)
//loader

loader = new THREE.TextureLoader();
loader.load(
  'textures/smoke.png',
  function (texture) {
    //define the shape
    const geometry = new THREE.PlaneBufferGeometry(350, 350);
    const geometryBg = new THREE.PlaneBufferGeometry(1000, 1000);
    //define the surface appearance
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true
    })
    //creating a loop to create a lot of smoke particles and place it along the spiral line
    for (let i = 900; i > 250; i--) {
      const portal = new THREE.Mesh(geometry, material);
      portal.position.set(
        //spiral setting
        .5 * i * Math.cos((4 * i * Math.PI) / 180),
        .5 * i * Math.sin((4 * i * Math.PI) / 180),
        .1 * i
      )
      portal.rotation.z = Math.random() * 360;
      poratalVortex.push(portal)
      scene.add(portal)
    };

    for (let i = 0; i < 40; i++ ){
      const portalBg = new THREE.Mesh(geometryBg, material);
      portalBg.position.set(
        Math.random() * 1000 - 500,
        Math.random() * 400 - 200,
        25
      )
      portalBg.rotation.z = Math.random() * 360;
      portalBg.material.opacity = 0.4;
      poratalBgVortex.push(portalBg)
      scene.add(portalBg)
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

//animation loop
//clock object to keep track of the time
clock = new THREE.Clock();

const loop = () => {
  requestAnimationFrame(loop);
  //control the movement of the object in the scene during animation
  let delta = clock.getDelta();

  poratalVortex.forEach(p => {
    p.rotation.z -= delta * 1.5
  })

  poratalBgVortex.forEach(p => {
    p.rotation.z -= delta * 0.2
  })

  if (Math.random() > 0.8) {
    light2.power = 200 + Math.random() * 350;
  }

  renderer.render(scene, camera);
};

loop();
window.addEventListener("resize", handleResize);