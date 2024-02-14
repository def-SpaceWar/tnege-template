export function createCanvasWebGL2RenderSystem(
    canvas: HTMLCanvasElement
): System {
    const gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL not loaded");

    return s => {
    };
}
