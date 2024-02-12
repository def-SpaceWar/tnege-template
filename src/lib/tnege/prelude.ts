export class Name implements Component {
    entity?: Entity;
    constructor(public name: string) { }
}

export function createUpdateLoop(f: () => void, deltas?: UpdateDelta): [updateLoop: (ms: number) => Promise<void>, stopUpdateLoop: () => void] {
    let resolve: () => void;
    const promise = new Promise<void>(res => resolve = res),
        updateLoop = deltas
            ? async (ms: number) => {
                let before = performance.now() / 1000;
                const interval = setInterval(() => {
                    f();
                    const now = performance.now() / 1000;
                    deltas.update = now - before;
                    before = now;
                }, ms);
                await promise;
                clearInterval(interval);
            }
            : async (ms: number) => {
                const interval = setInterval(f, ms);
                await promise;
                clearInterval(interval);
            },
        stopUpdateLoop = () => resolve();
    return [updateLoop, stopUpdateLoop];
}

export function createRenderLoop(f: () => void, deltas?: RenderDelta): [renderLoop: () => Promise<void>, stopRenderLoop: () => void] {
    let resolve: () => void;
    const promise = new Promise<void>(res => resolve = res),
        renderLoop = deltas
            ? async () => {
                let id = Infinity,
                    before = performance.now() / 1000;
                const callback = () => {
                    f();
                    const now = performance.now() / 1000;
                    deltas.render = now - before;
                    before = now;
                    id = requestAnimationFrame(callback);
                };
                callback();
                await promise;
                cancelAnimationFrame(id);
            }
            : async () => {
                let id = Infinity;
                const callback = () => {
                    f();
                    id = requestAnimationFrame(callback);
                };
                callback();
                await promise;
                cancelAnimationFrame(id);
            },
        stopRenderLoop = () => resolve();
    return [renderLoop, stopRenderLoop]
}
