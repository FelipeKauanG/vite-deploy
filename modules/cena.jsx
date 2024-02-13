import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

function cena(){
    // Cena
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    //Objetos
    const geometry = new THREE.SphereGeometry(2, 60)
    const material = new THREE.MeshPhongMaterial({color: 0x35089e})
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(0,0,0)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1, 1000)
    camera.position.set(5, 5, 5)

    // Luzes
    const ambientlight = new THREE.DirectionalLight(0xffffff)
    ambientlight.lookAt(sphere)

    // controles
    const controls = new OrbitControls( camera, renderer.domElement)

    //Chão
    const boxGround = new THREE.PlaneGeometry(300, 300)
    const groundMaterial = new THREE.MeshPhongMaterial({color: 0x828282, side: THREE.DoubleSide})
    const ground = new THREE.Mesh(boxGround, groundMaterial)
    ground.rotation.x = Math.PI/2
    ground.position.y = -2

    

    //Sombras
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    ambientlight.castShadow = true
    ground.receiveShadow = true
    sphere.castShadow = true


    // adicionando elementos para a cena
    scene.add(sphere)
    scene.add(ambientlight)
    scene.add(ground)

    function render(){
        requestAnimationFrame(render)
        renderer.render(scene, camera)
        controls.update()
    }
    render()
}

export default cena
