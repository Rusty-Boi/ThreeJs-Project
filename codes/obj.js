// import * as TJS from "./Three JS/build/three.module.js"
import * as TJS from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js"

const sunTexture = new TJS.TextureLoader().load('./assets/textures/sunTexture.jpeg')
const mercuryTexture = new TJS.TextureLoader().load('./assets/textures/mercuryTexture.jpg')
const venusTexture = new TJS.TextureLoader().load('./assets/textures/venusTexture.jpg')
const earthTexture = new TJS.TextureLoader().load('./assets/textures/earthTexture.jpg')
const moonTexture = new TJS.TextureLoader().load('./assets/textures/moonTexture.jpg')
const marsTexture = new TJS.TextureLoader().load('./assets/textures/marsTexture.jpg')
const saturnTexture = new TJS.TextureLoader().load('./assets/textures/saturnTexture.jpg')
const saturnRingTexture = new TJS.TextureLoader().load('./assets/textures/saturnRingTexture.jpg')
const jupiterTexture = new TJS.TextureLoader().load('./assets/textures/jupiterTexture.jpg')
const uranusTexture = new TJS.TextureLoader().load('./assets/textures/uranusTexture.jpg')
const uranusRingTexture = new TJS.TextureLoader().load('./assets/textures/uranusRingTexture.png')
//background texture
export const spaceTexture  = new TJS.TextureLoader().load('./assets/textures/spaceTexture.jpg')

//use this function to make planet object

function makeSun(texture){
    const sphere = new TJS.SphereGeometry(100, 30, 30)
    const material = new TJS.MeshBasicMaterial({map: texture})
    const sun = new TJS.Mesh(sphere, material)
    return sun
}

function makePlanet(radius, texture_image, pos){
    const sphere = new TJS.SphereGeometry(radius, 30, 30)
    const material = new TJS.MeshStandardMaterial({map: texture_image})
    const planet = new TJS.Mesh(sphere, material)
    planet.position.setX(pos)
    return planet
}

function makePlanetRing(radius, out_radius, ring_texture, pos){
    const ringGeo = new TJS.RingGeometry(radius, out_radius, 32)
    const mats = new TJS.MeshBasicMaterial({map: ring_texture, side: TJS.DoubleSide})
    const ring = new TJS.Mesh(ringGeo, mats)
    ring.position.setX(pos)
    return ring
}

export function makeOrbit(in_radius, out_radius){
    const ringGeo = new TJS.RingGeometry(in_radius, out_radius, 60)
    const mats = new TJS.MeshBasicMaterial({color: '#d3d3d3', side: TJS.DoubleSide})
    const orbits = new TJS.Mesh(ringGeo, mats)
    orbits.rotateX(Math.PI/2)
    return orbits
}

export const sun = makeSun(sunTexture)
export const planet_mercury = makePlanet(5, mercuryTexture, 250)
export const planet_venus = makePlanet(7, venusTexture, 350)
export const planet_earth = makePlanet(9, earthTexture, 450)
export const earth_moon = makePlanet(1.5, moonTexture, 20)
export const planet_mars = makePlanet(8, marsTexture, 550)
export const planet_jupiter = makePlanet(20, jupiterTexture, 650)
export const planet_saturn = makePlanet(15, saturnTexture, 750)
export const saturn_ring = makePlanetRing(20, 30, saturnRingTexture, 750)
export const planet_uranus = makePlanet(12, uranusTexture, 850)
export const uranus_ring = makePlanetRing(14, 24, uranusRingTexture, 850)