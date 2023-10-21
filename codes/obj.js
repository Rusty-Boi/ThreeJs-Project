// import * as TJS from "./Three JS/build/three.module.js"
import * as TJS from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js"

//background texture
export const spaceTexture  = new TJS.TextureLoader().load('./assets/textures/spaceTexture.jpg')

//use this function to make planet object

export function makePlanet(radius, texture_image){
    const sphere = new TJS.SphereGeometry(radius, 30, 30)
    const material = new TJS.MeshBasicMaterial({map: texture_image})
    const planet = new TJS.Mesh(sphere, material)
    return planet
}