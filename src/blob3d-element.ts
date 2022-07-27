import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as THREE from "three";
import { Perlin } from './helpers/perlin';

@customElement('blob3d-element')
export class Blob3dElement extends LitElement {
    static override styles = css``;


    @property({ type: Object, reflect: false })
    renderer?: THREE.WebGLRenderer;

    @property({ type: Object, reflect: false })
    scene?: THREE.Scene;

    @property({ type: Object, reflect: false })
    camera?: THREE.PerspectiveCamera;

    @property({ type: Object, reflect: false })
    blob?: THREE.Mesh;

    @property({ type: Object, reflect: false })
    perlinGenerator?: Perlin;

    @property({ type: Number })
    blobColor: number = 0xff0000;

    @property({ type: Number })
    blobColorEmission: number = 0.75;

    @property({ type: Number })
    lightColor: number = 0x00ff00;

    @property({ type: Number })
    lightColorEmission: number = 0.25;

    @property({ type: Number })
    blobSpeed: number = 0.003;

    @property({ type: Number })
    blobSpikeness: number = 1;

    @property({ type: Number })
    size: number = 300;

    @property({ type: Boolean })
    useSimpleMaterial = false;

    protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);

        this.perlinGenerator = new Perlin(0);

        this.initialize3d()
        requestAnimationFrame(this.render3d.bind(this));

    }

    protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);

        if (_changedProperties.has("useSimpleMaterial")) {
            this.blob!.material = this.useSimpleMaterial ? new THREE.MeshBasicMaterial({
                color: this.blobColor,
            }) : new THREE.MeshPhongMaterial({
                emissive: this.blobColor,
                emissiveIntensity: this.blobColorEmission,
                shininess: 0,
            });
        }
    }


    initialize3d() {
        var canvas = this.shadowRoot!.getElementById("blob-scene");
        if (!canvas) return false;

        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })

        this.renderer!.setPixelRatio(window.devicePixelRatio);
        this.renderer!.setClearColor(0x000000, 0.0);
        this.renderer!.setSize(this.size, this.size);


        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(30, this.size / this.size, 0.1, 1000)
        this.camera!.position.z = 5;


        var light = new THREE.DirectionalLight(this.lightColor, this.lightColorEmission);
        light.position.set(0, 0, 100);
        this.scene.add(light);
        // var light2 = new THREE.DirectionalLight(this.blobColor, 0.5);
        // light2.position.set(0, 0, 500);
        // this.scene.add(light2);


        let blobGeometry = new THREE.SphereGeometry(1, 128, 128);
        // @ts-ignore
        blobGeometry.setAttribute("basePosition", new THREE.BufferAttribute().copy(blobGeometry.attributes.position));
        var blobMaterial = new THREE.MeshPhongMaterial({
            emissive: this.blobColor,
            emissiveIntensity: this.blobColorEmission,
            shininess: 0,
        });



        this.blob = new THREE.Mesh(blobGeometry, blobMaterial);
        this.scene.add(this.blob);

        this.onWindowResize();

        return true;


    }


    onWindowResize() {
        this.camera!.aspect = this.size / this.size;
        this.camera!.updateProjectionMatrix();
        this.renderer!.setSize(this.size, this.size);
    }

    setNewPoints() {
        const basePositionAttribute = this.blob!.geometry.getAttribute("basePosition");
        const positionAttribute = this.blob!.geometry.getAttribute('position');
        // let newPositionAttribute = [];
        const vertex = new THREE.Vector3();
        var time = performance.now() * this.blobSpeed;
        var k = this.blobSpikeness;
        for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {

            vertex.fromBufferAttribute(basePositionAttribute, vertexIndex);


            var perlin = this.perlinGenerator!.perlin3(
                vertex.x * k + time,
                vertex.y * k,
                vertex.z * k);

            vertex.normalize().multiplyScalar(1 + 0.3 * perlin);

            positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);

        }

        this.blob!.geometry.attributes.position.needsUpdate = true; // required after the first render
        this.blob!.geometry.computeBoundingSphere();
    }
    render3d() {
        this.setNewPoints();
        requestAnimationFrame(this.render3d.bind(this));
        this.renderer!.render(this.scene!, this.camera!);
    }



    override render() {
        return html`
            <canvas id="blob-scene"></canvas>
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'blob3d-element': Blob3dElement;
    }
}