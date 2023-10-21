import * as TJS from "./Three JS/build/three.module.js"
//import texture
import sunTexture from './assets/textures/sunTexture.jpeg'
import mercuryTexture from './assets/textures/mercuryTexture.jpg'
import earthTexture from './assets/textures/earthTexture.jpg'
import venusTexture from './assets/textures/venusTexture.jpg'
import marsTexture from './assets/textures/marsTexture.jpg'
import jupiterTexture from './assets/textures/jupiterTexture.jpg'
import saturnTexture from './assets/textures/saturnTexture.jpg'
import saturnRingTexture from './assets/textures/saturnRingTexture.jpg'

//background texture
export const spaceTexture  = new TJS.TextureLoader().load('./assets/textures/spaceTexture.jpg')

//use this function to make planet object

export function makeSun(texture){
    const sphere = new TJS.SphereGeometry(100, 30, 30)
    const material = new TJS.MeshBasicMaterial({map: texture})
    const sun = new TJS.Mesh(sphere, material)
    return sun
}

export function makePlanet(radius, texture_image){
    const sphere = new TJS.SphereGeometry(radius, 30, 30)
    const material = new TJS.MeshStandardMaterial({map: texture_image})
    const planet = new TJS.Mesh(sphere, material)
    return planet
}

export function makePlanetRing(radius, ring_texture){
    const torus = new TJS.TorusGeometry(radius)
    const mats = new TJS.MeshStandardMaterial({map: ring_texture})
    const ring = new TJS.Mesh(torus, mats)
    return ring
}