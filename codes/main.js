import * as TJS from "./Three JS/build/three.module.js"
import { makePlanet, makePlanetRing, makeSun, spaceTexture } from "./obj.js"


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
const venusObj = new TJS.Object3D()
const earthObj = new TJS.Object3D()
const marsObj = new TJS.Object3D()
const jupiter = new TJS.Object3D()
const saturnObj = new TJS.Object3D()

const sun = makeSun(sunTexture)
const planet_mercury = makePlanet(10, mercuryTexture)

mercuryObj.add(planet_mercury)
const planet_venus = makePlanet(14, venusTexture)
const planet_earth = makePlanet(18, earthTexture)
const planet_mars = makePlanet(17, marsTexture)
const planet_jupiter = makePlanet(40)
const planet_saturn = makePlanet(30, saturnTexture)
const saturn_ring = makePlanetRing(34, saturnRingTexture)

//set planet position
planet_earth.position.setX(400)
planet_mercury.position.setX(200)
planet_venus.position.setX(300)
planet_mars.position.setX(500)
planet_saturn.position.setX(800)
saturn_ring.position.setX(800)

//set background texture
main_scene.background = spaceTexture

//add planets to sun orbit
main_scene.add(
    planet_venus, 
    planet_earth, 
    planet_mars, 
    planet_saturn, 
    saturn_ring)
main_scene.add(mercuryObj)
main_scene.add(sun)

const pointLight = new TJS.PointLight(0xffffff, 2, 300)
main_scene.add(pointLight)

//make renderer
const renderer = new TJS.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

//animate objects
function animate() {
    requestAnimationFrame(animate)
    sun.rotation.y += 0.0005  
    planet_mercury.rotation.y += 0.05
    planet_earth.rotation.y += 0.005
    planet_venus.rotation.y += 0.01
    planet_mars.rotation.y += 0.006
    mercuryObj.rotateY(0.005)
    renderer.render(main_scene, cam)
}

animate()

