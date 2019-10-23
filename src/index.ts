import {
    DirectionalLight,
    FontLoader,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    TextGeometry,
    WebGLRenderer,
    Font,
    Object3D,
    Color,
} from "three";

// Fonts
import BoldFont from "../public/fonts/BoosterNextFY-Bold_Bold.json";

//
class Main {
    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;
    private scene: Scene;

    constructor() {
        this.init();
    }

    public async init() {
        this.scene = new Scene();
        this.scene.background = new Color(0xffffff);

        this.camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 10, 1000);
        this.camera.position.z = 300;
        this.camera.lookAt(this.scene.position);


        // Renderer settings
        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        // Text group
        this.scene.add(this.getTextGroup());

        // Animate loop
        this.animate();
    }

    private getTextGroup(): Object3D {
        const textGeo = new TextGeometry('Stellar Skirmish', {
            font: new Font(BoldFont),
            size: 15,
            height: 0,
        });

        textGeo.center();
        const textMaterial = new MeshBasicMaterial({color: 0xcccccc});
        const textMesh = new Mesh(textGeo, textMaterial);

        textMesh.position.set(0, 50, 0);


        // Add text object group
        const textGroup = new Object3D();
        textGroup.add(textMesh);
        console.log(this.renderer.domElement.height/2);
        textGroup.position.set(0,this.renderer.domElement.height/2 - 250,0);

        return textGroup;
    }

    public animate() {
        requestAnimationFrame(this.animate.bind(this));

        // this.mesh.rotation.x += 0.02;
        // this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    }
}


new Main();