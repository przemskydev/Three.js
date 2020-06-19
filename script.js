let scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10000);
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
}

const createLight = (int = 1, color = 0xffffff) => {
  return new THREE.PointLight(color, int)
}

const sunLight = createLight(1.2);
const sunLight2 = createLight(1.2);
sunLight.position.set(500, 300, 900)
sunLight2.position.set(-100, 100, 900)

//Solar System
const sun = createSphere(5, 0xFF3C12)

/*
********************************
Scene
*/

scene.add(sun, sunLight, sunLight2);



/* 
Animation code above
********************************
Generating function always below
*/
const loop = () => {
  requestAnimationFrame(loop);

  renderer.render(scene, camera);
};

loop();
window.addEventListener("resize", handleResize)