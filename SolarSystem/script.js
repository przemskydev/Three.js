let scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.set(0, 0, 50);
renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true //background true==transparent
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const handleResize = () => {
  //Adjusting the window size
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  //Change of camera aspect and update aspect with new features.
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}

//Creating spheres and lights
const createSphere = (r = 1, color = 0xffffff) => {
  const geometry = new THREE.SphereGeometry(r, 32, 32);
  const material = new THREE.MeshLambertMaterial({
    color,
  })
  return new THREE.Mesh(geometry, material)
};

const createLight = (int = 1, color = 0xffffff) => {
  return new THREE.PointLight(color, int)
};

const createPlanet = (r = 1, color = 0xffffff) => {
  const sphere = createSphere(r, color);
  const pivot = new THREE.Object3D();
  pivot.add(sphere);
  return {
    sphere,
    pivot
  }
}

const sunLight = createLight(1.2);
const sunLight2 = createLight(1.2);
sunLight.position.set(500, 300, 900)
sunLight2.position.set(-100, 100, 900)

//Solar System
const sun = createSphere(10.9, 0xFF3C12);
const mercury = createPlanet(0.3, 0xB78668);
const venus = createPlanet(0.9, 0xF3B3B3);
const earth = createPlanet(1, 0x5EC0E3);
const mars = createPlanet(0.5, 0xD83B29);
const jupiter = createPlanet(3, 0xCD8565);
const saturn = createPlanet(2, 0xFBE578);
const uranus = createPlanet(1.5, 0x57A0FF);
const neptune = createPlanet(1.3, 0x3949C9);
const pluto = createPlanet(0.15, 0xCFE1EB);


/*
********************************
Scene
*/

scene.add(sun, sunLight, sunLight2);

//planet positioning
mercury.sphere.position.set(13, 0, 0);
venus.sphere.position.set(-16, 2, 0);
earth.sphere.position.set(1, 21, 0);
mars.sphere.position.set(-23, -1, 0);
jupiter.sphere.position.set(2, 29, 0);
saturn.sphere.position.set(3, -39, 0);
uranus.sphere.position.set(47, 0, 0);
neptune.sphere.position.set(-56, -2, 0);
pluto.sphere.position.set(-65, -1, 0);
//add planets
sun.add(
  mercury.pivot,
  venus.pivot,
  earth.pivot,
  mars.pivot,
  jupiter.pivot,
  saturn.pivot,
  uranus.pivot,
  neptune.pivot,
  pluto.pivot
);


/* 
Animation code above
********************************
Generating function always below
*/
const loop = () => {
  requestAnimationFrame(loop);

  mercury.pivot.rotation.z += 0.05;
  venus.pivot.rotation.y += 0.04;
  earth.pivot.rotation.z += 0.03;
  mars.pivot.rotation.z += 0.02;
  jupiter.pivot.rotation.z -= 0.01;
  saturn.pivot.rotation.z += 0.009;
  uranus.pivot.rotation.z += 0.008;
  neptune.pivot.rotation.y += 0.006;
  pluto.pivot.rotation.z -= 0.005;

  // sun.rotation.y += 0.007

  renderer.render(scene, camera);
};

loop();
window.addEventListener("resize", handleResize)