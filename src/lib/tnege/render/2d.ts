function createWebGL2System(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL not loaded");
    //
}

class Rectangle implements Component {
    entity?: Entity;
    private arr: Float32Array;

    constructor(x: number, y: number, w: number, h: number) {
        this.arr = new Float32Array(4);
        this.arr[0] = x;
        this.arr[1] = y;
        this.arr[2] = w;
        this.arr[3] = h;
    }

    get x() {}
    get y() {}
    get w() {}
    get h() {}
}

function createCanvas2DRenderSystem(canvas: HTMLCanvasElement): System {
    const ctx = canvas.getContext("2d");
    if (!ctx) alert("Ctontext not loaded");

   	return s => {
   	};
}
