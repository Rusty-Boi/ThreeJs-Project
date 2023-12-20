import * as TJS from "../node_modules/three/build/three.module.js"
// import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js"
// import { EffectComposer } from "../Three JS/examples/jsm/postprocessing/EffectComposer.js"
// import { RenderPass } from "../Three JS/examples/jsm/postprocessing/RenderPass.js"
// import { UnrealBloomPass } from "../Three JS/examples/jsm/postprocessing/UnrealBloomPass.js"
// import { GUI } from "../Three JS/examples/jsm/libs/dat.gui.module.js"

import { earth_moon, makeOrbit, planet_earth, planet_jupiter, planet_mars, planet_mercury, planet_neptune, planet_saturn, planet_uranus, planet_venus, saturn_ring, spaceTexture, sun, uranus_ring } from "./obj.js"


//Windows height and width
const winH = window.innerHeight
const winW = window.innerWidth

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

const venusObj = new TJS.Object3D()
venusObj.add(planet_venus)

const earthObj = new TJS.Object3D()
earthObj.add(planet_earth)
const moonObj = new TJS.Object3D()
moonObj.add(earth_moon)
planet_earth.add(moonObj)

const marsObj = new TJS.Object3D()
marsObj.add(planet_mars)

const jupiterObj = new TJS.Object3D()
jupiterObj.add(planet_jupiter)

const saturnObj = new TJS.Object3D()
saturnObj.add(planet_saturn, saturn_ring)

const uranusObj = new TJS.Object3D()
uranusObj.add(planet_uranus, uranus_ring)

// const mercury_orbit = makeOrbit(249.6,250.4)
// main_scene.add(mercury_orbit)

//set planet position
saturn_ring.rotateX(Math.PI * 0.4)

//set background texture
main_scene.background = spaceTexture
main_scene.add(sun, mercuryObj, venusObj, earthObj, marsObj, jupiterObj, saturnObj, uranusObj)

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
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(main_scene, cam)
composer.addPass(renderPass)

const bloomPass = new UnrealBloomPass(
    new TJS.Vector2(window.innerWidth, window.innerHeight),
    1,
    0.75,
    0.51
)

bloomPass.ignoreObjects = [planet_earth, planet_mercury, planet_mars, planet_venus, planet_jupiter, planet_saturn, skybox]
composer.addPass(bloomPass)

var bloomParams = {
    strength: 1,
    radius: 0.75,
    threshold: 0.51,
};

var gui = new GUI();
gui.add(bloomParams, 'strength', 0, 2).onChange(function (value) {
  bloomPass.strength = value
})
gui.add(bloomParams, 'radius', 0, 5).onChange(function (value) {
  bloomPass.radius = value
})
gui.add(bloomParams, 'threshold', 0, 1).onChange(function (value) {
  bloomPass.threshold = value
})

// var toneMapParam = {
//     exposure: 1.04
// }

// gui.add(toneMapParam, 'exposure', 0, 5).onChange(function(value){
//     renderer.toneMappingExposure = value
// })

renderer.toneMapping = TJS.LinearToneMapping
renderer.toneMappingExposure = 1.04

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

    // composer.render()

    composer.render()
    renderer.setSize(winW, winH)
    // renderer.render(main_scene, cam)
}

animate()

