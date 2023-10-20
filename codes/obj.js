import * as TJS from "./Three JS/build/three.module.js"

export function makePlanet(radius){
    const sphere = new TJS.SphereGeometry(radius, 20, 20)
    const material = new TJS.MeshBasicMaterial({wireframe:true, color:"#ffffff"})
    const planet = new TJS.Mesh(sphere, material)
    return planet
}