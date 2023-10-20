import * as TJS from "./Three JS/build/three.module.js"
import { makePlanet } from "./obj.js"

//Windows height and width
const winH = window.innerHeight
const winW = window.innerWidth

//make scene
const main_scene = new TJS.Scene()

//make camera PerspectiveCamera(fov, aspect ratio, near, far)
const cam = new TJS.PerspectiveCamera(70, winW/winH, 0.1, 1000)
cam.position.setZ(400)

//make objects

const planet1 = makePlanet(100)
const planet2 = makePlanet(18)
const planet3 = makePlanet(20)

planet2.position.setX(180)
planet3.position.setX(300)

main_scene.add(planet1, planet2, planet3)

//make renderer
const renderer = new TJS.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement)
function animate() {
    requestAnimationFrame(animate)
    planet1.rotation.y += 0.005
    planet2.rotation.y += 0.001
    planet3.rotation.y += 0.001
    renderer.render(main_scene, cam)
}

animate()

