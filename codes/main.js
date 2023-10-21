import * as TJS from "./Three JS/build/three.module.js"
import { makePlanet, spaceTexture } from "./obj.js"


//Windows height and width
const winH = window.innerHeight
const winW = window.innerWidth

//make scene
const main_scene = new TJS.Scene()

//make camera PerspectiveCamera(fov, aspect ratio, near, far)
const cam = new TJS.PerspectiveCamera(70, winW/winH, 0.1, 100000)
cam.position.setZ(750)
cam.position.setY(400)
cam.lookAt(0,0,0)

//object texture
const earthTexture = new TJS.TextureLoader().load('./assets/textures/earthTexture.png')
const sunTexture = new TJS.TextureLoader().load('./assets/textures/sunTexture.jpeg')
const mercuryTexture = new TJS.TextureLoader().load('./assets/textures/mercuryTexture.jpg')
const venusTexture = new TJS.TextureLoader().load('./assets/textures/venusTexture.jpg')
const marsTexture = new TJS.TextureLoader().load('./assets/textures/marsTexture.jpg')
const saturnTexture = new TJS.TextureLoader().load('./assets/textures/saturnTexture.jpg')
const saturnRingTexture = new TJS.TextureLoader().load('./assets/textures/saturnRingTexture.jpg')

//make objects

const sun = makePlanet(100, sunTexture)
const planet_mercury = makePlanet(10, mercuryTexture)
const planet_venus = makePlanet(14, venusTexture)
const planet_earth = makePlanet(18, earthTexture)
const planet_mars = makePlanet(17, marsTexture)

// const planet3 = makePlanet(20)

planet_earth.position.setX(400)
planet_mercury.position.setX(200)
planet_venus.position.setX(300)
planet_mars.position.setX(500)
// planet3.position.setX(300)

main_scene.background = spaceTexture
sun.add(planet_mercury, planet_venus, planet_earth, planet_mars)
main_scene.add(sun)


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
    renderer.render(main_scene, cam)
}

animate()

