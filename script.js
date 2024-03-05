const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  4,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(300, 1, 5);
const material = new THREE.MeshBasicMaterial({ color: "green" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const deno_geometry = new THREE.BoxGeometry(1, 5, 2);
const color_deno = new THREE.MeshBasicMaterial({ color: "purple" });
const deno = new THREE.Mesh(deno_geometry, color_deno);
scene.add(deno);

const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: "black" });
const line = new THREE.LineSegments(edges, lineMaterial);
scene.add(line);

const cord = new THREE.EdgesGeometry(deno_geometry);
const line_color = new THREE.LineBasicMaterial({ color: "black" });
const line_deno = new THREE.LineSegments(cord, line_color);
deno.add(line_deno);

const help = new THREE.AxesHelper(4);
scene.add(help);

// /
////////////////////////cactus/////////////////////////////////////
const cactus_geometry = new THREE.BoxGeometry(1, 2, 2);
const cactus_material = new THREE.MeshBasicMaterial({ color: 0x286c05 });
const cactus = new THREE.Mesh(cactus_geometry, cactus_material);
scene.add(cactus);

const line_cactus_geometry = new THREE.EdgesGeometry(cactus_geometry);
const line_cactus_material = new THREE.LineBasicMaterial({ color: "black" });
const line_cactus = new THREE.LineSegments(
  line_cactus_geometry,
  line_cactus_material
);
cactus.add(line_cactus);

cactus.position.x = 100;
cactus.position.y = 1.5;

deno.position.x = -7;

camera.position.z = 12;
camera.position.x = -10;
camera.position.y = 8;
camera.rotateY(THREE.MathUtils.degToRad(-30));
camera.rotateX(THREE.MathUtils.degToRad(-20));

deno.position.y = 3;

const jumpUp = new TWEEN.Tween(deno.position).to({ y: 7 }, 400);
const jumpDown = new TWEEN.Tween(deno.position).to({ y: 3 }, 400);
jumpUp.chain(jumpDown);

document.addEventListener("mousedown", function (event) {
  if (event.button === 0) { 
    jumpUp.start();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") { 
    jumpUp.start();
  }
});


const moveCactus = () => {
  const move = new TWEEN.Tween(cactus.position)
    .to({ x: -21 }, 1300)
    .onComplete(() => {
      cactus.position.x = 100;
      moveCactus();
    })
    .start();
    
};

moveCactus();

function animate() {
  requestAnimationFrame(animate);

  TWEEN.update();

  renderer.render(scene, camera);
}

animate();
