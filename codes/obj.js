import * as TJS from "./Three JS/build/three.module.js"

const sunTexture = new TJS.TextureLoader().load('./assets/textures/sunTexture.jpeg')
const mercuryTexture = new TJS.TextureLoader().load('./assets/textures/mercuryTexture.jpg')
const venusTexture = new TJS.TextureLoader().load('./assets/textures/venusTexture.jpg')
const earthTexture = new TJS.TextureLoader().load('./assets/textures/earthTexture.jpg')
const marsTexture = new TJS.TextureLoader().load('./assets/textures/marsTexture.jpg')
const saturnTexture = new TJS.TextureLoader().load('./assets/textures/saturnTexture.jpg')
const saturnRingTexture = new TJS.TextureLoader().load('./assets/textures/saturnRingTexture.jpg')
const jupiterTexture = new TJS.TextureLoader().load('./assets/textures/jupiterTexture.jpg')
//background texture
export const spaceTexture  = new TJS.TextureLoader().load('./assets/textures/spaceTexture.jpg')

//use this function to make planet object

function makeSun(texture){
    const sphere = new TJS.SphereGeometry(100, 30, 30)
    const material = new TJS.MeshBasicMaterial({map: texture})
    const sun = new TJS.Mesh(sphere, material)
    return sun
}

function makePlanet(radius, texture_image){
    const sphere = new TJS.SphereGeometry(radius, 30, 30)
    const material = new TJS.MeshStandardMaterial({map: texture_image})
    const planet = new TJS.Mesh(sphere, material)
    return planet
}

function makePlanetRing(radius, ring_texture){
    const ringGeo = new TJS.RingGeometry(radius, 30, 32)
    const mats = new TJS.MeshBasicMaterial({map: ring_texture, side: TJS.DoubleSide})
    const ring = new TJS.Mesh(ringGeo, mats)
    return ring
}

export const sun = makeSun(sunTexture)
export const planet_mercury = makePlanet(5, mercuryTexture)
export const planet_venus = makePlanet(7, venusTexture)
export const planet_earth = makePlanet(9, earthTexture)
export const planet_mars = makePlanet(8, marsTexture)
export const planet_jupiter = makePlanet(20, jupiterTexture)
export const planet_saturn = makePlanet(15, saturnTexture)
export const saturn_ring = makePlanetRing(20, saturnRingTexture)