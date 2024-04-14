import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

window.addEventListener('resize', () =>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
})

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
camera.position.set(0, 0, 30);

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry(5,5,5)
const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF }) ;
const path = new THREE.Mesh(geometry, material);
path.position.set(5, 1, 20)

/*
const accy = new THREE.Mesh(new THREE.PlaneGeometry(36.76, 27.05), new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('Accy.png'),
  specular: new THREE.Color(0xff6d00),
  transparent: true,
}));
accy.scale.set(0.2, 0.2, 0.2);
accy.position.set(-8, -26, 21);
scene.add(accy);

const wall = new THREE.Mesh(new THREE.PlaneGeometry(36.76, 27.05), new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('NewWall.png'),
  specular: new THREE.Color(0xff6d00),
  transparent: true,
}));
wall.scale.set(2, 1, 1);
wall.position.set(-8, -27, 18);
scene.add(wall);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(36.76, 27.05), new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('NewFloor.png'),
  specular: new THREE.Color(0xff6d00),
  transparent: true,
}));
floor.scale.set(2, 1, 1);
floor.position.set(-8, -25,19);
scene.add(floor);
*/

scene.add(path);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh(geometry, material);

  const [x, y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)

}
Array(200).fill().forEach(addStar);


function animate() {
  requestAnimationFrame( animate);
  path.rotateX(0.004);
  path.rotateY(0.001);
  path.rotateZ(0.0004);
  //controls.update();

  renderer.render(scene, camera);
}

animate()


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.y = t * 0.01;
  
}

document.body.onscroll = moveCamera;
moveCamera();



document.querySelectorAll('.image-container img').forEach(image => {
  image.onclick = () => {
    document.querySelector('.popup-img').style.display = 'block';
    document.querySelector('.popup-img img').src = image.getAttribute('src');
}});
  
document.querySelector('.popup-img span').onclick = () => {
  document.querySelector('.popup-img').style.display = 'none';
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      console.log(entry)
      if(entry.isIntersecting) {
          entry.target.classList.add('show');
      } else {
          entry.target.classList.remove('show');
      }
  });
});


const hiddenElements = document.querySelectorAll('.hidden, .hidden-accy, .hidden-boss');

hiddenElements.forEach((el) => observer.observe(el));