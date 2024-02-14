export class Transform2D implements Component {
    entity?: Entity;
    private arr: Float32Array;

    constructor(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number
    ) {
        this.arr = new Float32Array([a, b, c, d, e, f]);
    }

    get a() { return this.arr[0]; }
    get b() { return this.arr[1]; }
    get c() { return this.arr[2]; }
    get d() { return this.arr[3]; }
    get e() { return this.arr[4]; }
    get f() { return this.arr[5]; }

    set a(val: number) { this.arr[0] = val; }
    set b(val: number) { this.arr[1] = val; }
    set c(val: number) { this.arr[2] = val; }
    set d(val: number) { this.arr[3] = val; }
    set e(val: number) { this.arr[4] = val; }
    set f(val: number) { this.arr[5] = val; }
}

export class Render2D implements Component {
    entity?: Entity;
    // TODO: implementation
}

export function createCanvas2DRenderSystem(canvas: HTMLCanvasElement): System {
    const ctx = canvas.getContext("2d");
    if (!ctx) alert("Context not loaded");

    return s => {
    };
}
