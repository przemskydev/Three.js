
let scene, camera, renderer;

init()

function init() {

  //scene
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
  camera.position.set(0, 0, 8);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //world
  const createSphere = (r = 1, color = 0xffffff) => {
    const geometry = new THREE.SphereGeometry(r, 32, 32);
    const material = new THREE.MeshLambertMaterial({
      color
    })
    return new THREE.Mesh(geometry, material)
  };

  const createBox = (w = 1, h = 1, d = 1, color = 0xffffff) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshLambertMaterial(color);
    return new THREE.Mesh(geometry, material)
  };

  //lights
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
}

const handleResize = () => {
  //Adjusting the window size
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  //Change of camera aspect and update aspect with new features.
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}


let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function onMouseMove(e) {
  e.preventDefault;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    // intersects[ i ].object.material.color.set( 0xff0000 );
    const timeline = new TimelineMax();
    timeline.to(intersects[i].object.scale, 1, { z: 2, ease: Expo.easeOut });
    timeline.to(intersects[i].object.scale, .5, { z: 1, ease: Expo.easeOut });
    timeline.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut });
    timeline.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut });
    timeline.to(intersects[i].object.scale, .5, { y: .8, ease: Expo.easeOut });
  }
}

window.addEventListener('mousemove', onMouseMove)

const loop = () => {
  requestAnimationFrame(loop);

  renderer.render(scene, camera);
};

loop();
window.addEventListener("resize", handleResize);