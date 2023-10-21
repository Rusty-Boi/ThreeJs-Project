import * as TJS from "./Three JS/build/three.module.js"
import { OrbitControls } from "./Three JS/examples/jsm/controls/OrbitControls.js"
import { planet_earth, planet_jupiter, planet_mars, planet_mercury, planet_saturn, planet_venus, saturn_ring, spaceTexture, sun } from "./obj.js"

//Windows height and width
const winH = window.innerHeight
const winW = window.innerWidth

//make scene
const main_scene = new TJS.Scene()

//make camera PerspectiveCamera(fov, aspect ratio, near, far)
const cam = new TJS.PerspectiveCamera(70, winW/winH, 0.1, 100000)

cam.position.setZ(750)
cam.position.setY(400)
cam.lookAt(0, 0, 0)

//make objects
const mercuryObj = new TJS.Object3D()
mercuryObj.add(planet_mercury)
const venusObj = new TJS.Object3D()
venusObj.add(planet_venus)
const earthObj = new TJS.Object3D()
earthObj.add(planet_earth)
const marsObj = new TJS.Object3D()
marsObj.add(planet_mars)
const jupiterObj = new TJS.Object3D()
jupiterObj.add(planet_jupiter)
const saturnObj = new TJS.Object3D()
saturnObj.add(planet_saturn, saturn_ring)

//set planet position
planet_mercury.position.setX(200)
planet_venus.position.setX(300)
planet_earth.position.setX(400)
planet_mars.position.setX(500)
planet_jupiter.position.setX(700)
planet_saturn.position.setX(900)
saturn_ring.position.setX(900)
saturn_ring.rotateX(Math.PI / 1.65)


//set background texture
main_scene.background = spaceTexture
main_scene.add(sun, mercuryObj, venusObj, earthObj, marsObj, jupiterObj, saturnObj)

//set sun light
const pointLight = new TJS.PointLight(0xffffff, 2, 3000)
main_scene.add(pointLight)

//make renderer
const renderer = new TJS.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)
const orbit = new OrbitControls(cam, renderer.domElement)
orbit.update()

//animate objects
function animate() {
    requestAnimationFrame(animate)

    sun.rotateY(0.0005)

    planet_mercury.rotateY(0.05)
    mercuryObj.rotateY(0.008)  

    planet_venus.rotateY(0.01)
    venusObj.rotateY(0.007)

    planet_earth.rotateY(0.007)
    earthObj.rotateY(0.004)

    planet_mars.rotateY(0.008)
    marsObj.rotateY(0.003)

    planet_jupiter.rotateY(0.001)
    jupiterObj.rotateY(0.0005)

    planet_saturn.rotateY(0.001)
    saturnObj.rotateY(0.0004)

    renderer.render(main_scene, cam)
}

animate()

