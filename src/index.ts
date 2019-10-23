import {
    Color,
    Font,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    Scene,
    Shape,
    ShapeGeometry,
    TextGeometry,
    WebGLRenderer,
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


        // Shape

        // mesh.position.set(0, 0, 0);
        const hexagon = this.getHexagon();
        this.scene.add(hexagon);

        // Center
        const hexagon_cnt_1 = this.getHexagon();
        hexagon_cnt_1.position.set(-86, 0, 0);
        this.scene.add(hexagon_cnt_1);

        const hexagon_cnt_2 = this.getHexagon();
        hexagon_cnt_2.position.set(86, 0, 0);
        this.scene.add(hexagon_cnt_2);

        // Top

        const hexagon_4 = this.getHexagon();
        hexagon_4.position.set(43 + 86, 70, 0);
        this.scene.add(hexagon_4);

        const hexagon_5 = this.getHexagon();
        hexagon_5.position.set(-43 -86, 70, 0);
        this.scene.add(hexagon_5);

        const hexagon_2 = this.getHexagon();
        hexagon_2.position.set(43, 70, 0);
        this.scene.add(hexagon_2);

        const hexagon3 = this.getHexagon();
        hexagon3.position.set(-43, 70, 0);
        this.scene.add(hexagon3);

        // Bottom
        const hexagon4 = this.getHexagon();
        hexagon4.position.set(-43, -70, 0);
        this.scene.add(hexagon4);

        const hexagon5 = this.getHexagon();
        hexagon5.position.set(43, -70, 0);
        this.scene.add(hexagon5);



        // Animate loop
        this.animate();
    }

    private getHexagon() {
        const x = 0, y = 0;

        const hexRadius = 40;
        const hexHeight = 25;
        const sideLength = 40;
        const hexRectangleHeight = sideLength + 2 * hexHeight;
        const hexRectangleWidth = 2 * hexRadius;

        //
        const shape = new Shape();
        shape.moveTo(x + hexRadius, y);
        shape.lineTo(x + hexRectangleWidth, y + hexHeight);
        shape.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        shape.lineTo(x + hexRadius, y + hexRectangleHeight);
        shape.lineTo(x, y + sideLength + hexHeight);
        shape.lineTo(x, y + hexHeight);


        const geometry = new ShapeGeometry(shape);
        geometry.center();
        const material = new MeshBasicMaterial({color: 0x000000});
        const mesh = new Mesh(geometry, material);

        return mesh;
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
        textGroup.position.set(0, this.renderer.domElement.height / 2 - 250, 0);

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
