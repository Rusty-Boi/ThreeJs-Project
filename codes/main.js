import * as TJS from "../../Three JS/build/three.module.js"
import { OrbitControls } from "../../Three JS/examples/jsm/controls/OrbitControls.js"
import { EffectComposer } from "../Three JS/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "../Three JS/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "../Three JS/examples/jsm/postprocessing/UnrealBloomPass.js"
import { GUI } from "../Three JS/examples/jsm/libs/dat.gui.module.js"
import {CSS2DRenderer} from "../Three JS/examples/jsm/renderers/CSS2DRenderer.js"
import { planet_data } from "../data.js"

import { earth_moon, makeOrbit, planet_earth, planet_jupiter, planet_mars, planet_mercury, planet_neptune, planet_saturn, planet_uranus, planet_venus, saturn_ring, spaceTexture, sun, uranus_ring } from "./obj.js"


//Windows height and width
const winH = window.innerHeight
const winW = window.innerWidth
const textureLoader = new TJS.TextureLoader()

//make scene
const main_scene = new TJS.Scene()

//make camera PerspectiveCamera(fov, aspect ratio, near, far)
const cam = new TJS.PerspectiveCamera(70, winW/winH, 0.1, 100000)

cam.position.setZ(1000)
cam.position.setY(400)
cam.lookAt(0, 0, 0)

//make objects
const mercuryObj = new TJS.Object3D()
mercuryObj.add(planet_mercury)
planet_mercury.name = 'mercury'

const venusObj = new TJS.Object3D()
venusObj.add(planet_venus)
planet_venus.name = 'venus'

const earthObj = new TJS.Object3D()
earthObj.add(planet_earth)
const moonObj = new TJS.Object3D()
moonObj.add(earth_moon)
planet_earth.add(moonObj)
planet_earth.name = 'earth'

const marsObj = new TJS.Object3D()
marsObj.add(planet_mars)
planet_mars.name = 'mars'

const jupiterObj = new TJS.Object3D()
jupiterObj.add(planet_jupiter)
planet_jupiter.name = 'jupiter'

const saturnObj = new TJS.Object3D()
saturnObj.add(planet_saturn, saturn_ring)
planet_saturn.name = 'saturn'

const uranusObj = new TJS.Object3D()
uranusObj.add(planet_uranus, uranus_ring)
planet_uranus.name = 'uranus'

const neptuneObj = new TJS.Object3D()
neptuneObj.add(planet_neptune)
planet_neptune.name = 'neptune'

sun.name = 'sun'

function createOrbits(){
  let inrad = 249.6
  let outrad = 250.4
  for(let i = 0; i < 8; i++){
    const orbit = makeOrbit((inrad - 1) + i * 100, (outrad + 1) + i * 100)
    // const orbitHitboxMaterial = new TJS.MeshBasicMaterial({color: 0xffffff,})  
    // const orbitHitbox = makeOrbit((inrad - 10) + i * 100, (outrad + 10) + i * 100)
    // orbitHitbox.material = orbitHitboxMaterial
    orbit.name = planet_data[i].name  
    main_scene.add(orbit)
  }
}
createOrbits()

//set planet position
saturn_ring.rotateX(Math.PI * 0.4)

//set background texture
// main_scene.background = spaceTexture

// main_scene.add(mercuryObj, venusObj, earthObj, marsObj, jupiterObj, saturnObj, uranusObj, neptuneObj)

const skybox_geo = new TJS.BoxGeometry(10000, 10000, 10000)
const skybox_materials = []
function skyboxMaterialPath(){
  const materialPath = []
  const basePath = './assets/skybox/'
  const face = ['front', 'back', 'top', 'bottom', 'right', 'left']
  // const name = 'bluecloud'
  // const face = ['ft', 'bk', 'up', 'dn', 'rt', 'lf']
  const fileType = '.png'
  for(let i in face){
    materialPath.push(`${basePath}${face[i]}${fileType}`)
  }
  return materialPath
}

function skyboxMaterialLoad(path){
  for(let i in path){
    skybox_materials.push(new TJS.MeshBasicMaterial({map: textureLoader.load(path[i]), side: TJS.DoubleSide}))
  }
}

skyboxMaterialLoad(skyboxMaterialPath())
const skybox = new TJS.Mesh(skybox_geo, skybox_materials)
main_scene.add(sun, skybox, mercuryObj, venusObj, earthObj, marsObj, jupiterObj, saturnObj, uranusObj, neptuneObj)

//set sun light
const pointLight = new TJS.PointLight(0xffffff, 2, 3000)
main_scene.add(pointLight)

//make renderer
const renderer = new TJS.WebGLRenderer()
renderer.setSize(winW, winH)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)
const orbit = new OrbitControls(cam, renderer.domElement)
orbit.update()

//post-processing

//bloom objects
const bloomComposer = new EffectComposer(renderer)
const renderPass = new RenderPass(main_scene, cam)
const bloomPass = new UnrealBloomPass(
    new TJS.Vector2(window.innerWidth, window.innerHeight),
    1,
    1.4,
    0.51
)

bloomComposer.addPass(renderPass)
bloomComposer.addPass(bloomPass)

//debugging GUI

// var bloomParams = {
//     strength: 1,
//     radius: 1.4,
//     threshold: 0.51,
// };

// var gui = new GUI();
// gui.add(bloomParams, 'strength', 0, 2).onChange(function (value) {
//   bloomPass.strength = value
// })
// gui.add(bloomParams, 'radius', 0, 5).onChange(function (value) {
//   bloomPass.radius = value
// })
// gui.add(bloomParams, 'threshold', 0, 1).onChange(function (value) {
//   bloomPass.threshold = value
// })

renderer.toneMapping = TJS.LinearToneMapping
renderer.toneMappingExposure = 1.04

const Overlay = new CSS2DRenderer()
Overlay.setSize(winW, winH)
Overlay.domElement.classList.add('overlay', 'card')
Overlay.domElement.style.position = 'absolute'
// Overlay.domElement.style.top = '80%'
Overlay.domElement.style.bottom = '0%'


// window.addEventListener('keydown', function(event){
//   if(event.key === '1'){
//     document.body.appendChild(Overlay.domElement)
//   }
// })



function getData(name){
  let cardDesc
  let cardTitle
  let cardDesc2 
  let idxNo
  for(let i in planet_data){
    if(name == planet_data[i].name){
      idxNo = parseInt(i) + 1
      cardDesc = planet_data[i].desc
      cardDesc2 = planet_data[i].desc2
      cardTitle = planet_data[i].title
      Overlay.domElement.innerHTML = `
      <div class="content">
      <div class="outer-square">
          
          <img class="gambar" src="${planet_data[i].imgPath}" alt="Merkurius">
          <h4>${cardTitle}</h4>
          <h1>${idxNo}</h1>
          <p class="subHead">Tata Surya</p>
          <hr>
  
          <div class="inner-square left">
              <p class="text1">${cardDesc}</p>
          </div>
          
          <div class="inner-square right">
              <p class="text2">${cardDesc2}</p>
                  <a href="https://spaceplace.nasa.gov/all-about-mercury/en/">https://spaceplace.nasa.gov/all-about-mercury/en/</a>
          </div>
      </div>
      <div class="btn btn-secondary close-btn" onclick="removeUI()">
        X Close
      </div>
      `
      document.body.appendChild(Overlay.domElement)
    }
  }
  
}

const raycaster = new TJS.Raycaster()
const mouse = new TJS.Vector2()

window.addEventListener('click', onMouseClick)
// window.addEventListener('mousemove', changeColor, false)

function getMouseCoord(e){
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, cam)
}

// function changeColor(event){
//   getMouseCoord(event)
//   const intersects = raycaster.intersectObjects(main_scene.children, true);
//   let Hovered
//     if (intersects.length > 0) {
//         Hovered = intersects[0].object
//         Hovered.material.opacity = 1.0
//     } else {
//       Hovered.material.opacity = 0.1
//     }
// }

function onMouseClick(event) {
    // Mendapatkan koordinat mouse dalam bentuk normalized device coordinates (NDC)
    getMouseCoord(event)

    // Dapatkan objek yang terkena oleh ray
    const intersects = raycaster.intersectObjects(main_scene.children, true);

    if (intersects.length > 0) {
        // Objek diklik, tampilkan informasi di UI
        const clickedObject = intersects[0].object;
        getData(clickedObject.name)
    }
}


//animate objects
function animate() {
    requestAnimationFrame(animate)

    sun.rotateY(0.0004)

    planet_mercury.rotateY(0.0004)
    mercuryObj.rotateY(0.004)  

    planet_venus.rotateY(0.0002)
    venusObj.rotateY(0.0015)

    planet_earth.rotateY(0.007)
    earthObj.rotateY(0.001)
    moonObj.rotateY(0.009)

    planet_mars.rotateY(0.008)
    marsObj.rotateY(0.0008)

    planet_jupiter.rotateY(0.0004)
    jupiterObj.rotateY(0.0002)

    planet_saturn.rotateY(0.0038)
    saturnObj.rotateY(0.00009)

    planet_uranus.rotateY(0.003)
    uranusObj.rotateY(0.00004)

    planet_neptune.rotateY(0.032)
    neptuneObj.rotateY(0.0001)

    bloomComposer.render()
    Overlay.render(main_scene, cam)
}

animate()

