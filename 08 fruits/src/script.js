import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader'
import style from './style.css';

let scene, camera, renderer, container, groundMat,
  groundGeo, groundTexture, mesh, controls, apple,
  loader, banana, light1, light2, geometry,
  material, objBanana, bananaTexture;

function init() {
  //container
  container = document.createElement('div');
  document.body.appendChild(container);

  //scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcce0ff);
  scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

  //camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .1, 1000);
  camera.position.set(0, 2, 2);
  scene.add(camera)

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // orbit controls
  controls = new OrbitControls(camera, renderer.domElement);


  //light
  // light1 = new THREE.AmbientLight(0x666666);
  // scene.add(light1)

  light2 = new THREE.SpotLight(0xdfebff, 2);
  light2.position.set(-3, 3, 3);
  // light2.position.multiplyScalar(1.3);
  //decrease shadow bias, reduce the shadow sensitivity
  light2.shadow.bias = -0.0001;
  //increase the shadow resolution by increasing the mapSize to a multiplier of 1024
  light2.shadow.mapSize.width = 1024 * 10;
  light2.shadow.mapSize.height = 1024 * 10;
  light2.castShadow = true;

  let helper = new THREE.CameraHelper(light2.shadow.camera);
  scene.add(helper);

  // const d = 300;
  // light2.shadow.camera.left = - d;
  // light2.shadow.camera.right = d;
  // light2.shadow.camera.top = d;
  // light2.shadow.camera.bottom = - d;
  // light2.shadow.camera.far = 1000;
  scene.add(light2);


  //loader
  loader = new THREE.TextureLoader();


  //ground
  // groundTexture = loader.load(
  //   'textures/grass.png'
  // );
  // // load a texture, set wrap mode to repeat
  // groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
  // groundTexture.repeat.set(25, 25);
  // groundTexture.anisotropy = 16;
  // //For use with a Texture's encoding property.
  // groundTexture.encoding = THREE.sRGBEncoding;

  groundMat = new THREE.MeshLambertMaterial({
    // map: groundTexture 
    color: 0x525456
  });
  groundGeo = new THREE.PlaneBufferGeometry(2, 2);
  mesh = new THREE.Mesh(groundGeo, groundMat);
  mesh.position.y = - .3;
  mesh.rotation.x = - Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  //models
  banana = new OBJLoader();
  bananaTexture = loader.load('models/banana/textures/Diffuse.png')
  banana.load('models/banana/source/export_banana.obj',
    result => {
      objBanana = result;
      objBanana.children[0].material.map = bananaTexture;
      objBanana.scale.multiplyScalar(0.8);

      objBanana.traverse(obj => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      })

      scene.add(objBanana);
    })

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

  // console.log('CAMERA POSITION ' + camera.position.x)
  // console.log('LIGHT POS ' + light2.position.x)

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