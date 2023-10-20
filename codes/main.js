import * as TJS from "./Three JS/build/three.module.js"

//Windows height and width
const winH = window.innerHeight
const winW = window.innerWidth

//make scene
const main_scene = new TJS.Scene()

//make camera PerspectiveCamera(fov, aspect ratio, near, far)
const cam = new TJS.PerspectiveCamera(90, winH/winW, 0.1, 10000)

//make renderer
const renderer = new TJS.WebGL1Renderer()
renderer.setSize(winW, winH)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild