import * as TJS from "./Three JS/build/three.module.js"
import { makePlanet } from "./obj.js"

//Windows height and width
const winH = window.innerHeight
const winW = window.innerWidth

//make scene
const main_scene = new TJS.Scene()

//make camera PerspectiveCamera(fov, aspect ratio, near, far)
const cam = new TJS.PerspectiveCamera(90, winH/winW, 0.1, 10000)
cam.position.setZ(70)

//make objects

const planet1 = makePlanet(15)
const planet2 = makePlanet(30)
main_scene.add(planet1)
main_scene.add(planet2)

//make renderer
const renderer = new TJS.WebGL1Renderer()
renderer.setSize(winW, winH)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement)
function animate() {
    requestAnimationFrame(animate)
    planet1.rotation.y += 0.005
    planet2.rotation.y += 0.001
    renderer.render(main_scene, cam)
}

animate()

