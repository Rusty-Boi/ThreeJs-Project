import * as TJS from "./Three JS/build/three.module.js"

// making camera
// const <Var> = new TJS.PerspectiveCamera(FOV, AspectRatio, Near, Far)


const scene = new TJS.Scene()
const cam = new TJS.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 10000)
const renderer = new TJS.WebGL1Renderer()

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

// append to html body
document.body.appendChild(renderer.domElement)
// domElement = document object model

// making torus geometry
const material = new TJS.MeshBasicMaterial({wireframe: true})
const geometry = new TJS.TorusGeometry(20, 4, 20, 100)
const torus = new TJS.Mesh(geometry, material)

const geometry3 = new TJS.TorusGeometry(20, 4, 20, 100)
const torus2 = new TJS.Mesh(geometry3, material)

const geometry2 = new TJS.SphereGeometry(10, 30, 30)
const ball = new TJS.Mesh(geometry2, material)

scene.add(torus, ball, torus2)
cam.position.setZ(50)

function animate(){
    requestAnimationFrame(animate)
    torus.rotation.x += 0.02
    torus.rotation.y += 0.03

    ball.rotation.y += 1

    torus2.rotation.x -= 0.03
    torus2.rotation.y -= 0.02

    renderer.render(scene, cam)
}

animate()
