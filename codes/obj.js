import * as TJS from "./Three JS/build/three.module.js"

//use this function to make planet object
export function makePlanet(radius){
    const sphere = new TJS.SphereGeometry(radius, 30, 30)
    const material = new TJS.MeshBasicMaterial({wireframe:true, color:"#ffffff"})
    const planet = new TJS.Mesh(sphere, material)
    return planet
}