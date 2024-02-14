import { World, createScene, createStepper } from "./tnege/ecs";
import {
    Name,
    createDelta,
    createRenderLoop,
    createUpdateLoop
} from "./tnege/prelude";

const du = createDelta(),
    dr = createDelta();

const scene = createScene(),
    w = new World(scene);

scene.add(new Name("The First Coming"));
scene.add();
scene.add();
scene.destroy(0);
scene.add(new Name("The Second Coming"));

export function game(canvas: HTMLCanvasElement) {
    let updates = 0, renders = 0;
    const updateStepper = createStepper(),
        [updateLoop, stopUpdate] = createUpdateLoop(() => {
            updateStepper(w);
            console.log("update");
            updates++;
        }, du),
        renderStepper = createStepper(),
        [renderLoop, stopRender] = createRenderLoop(() => {
            renderStepper(w);
            console.log("render");
            renders++;
        }, dr);

    updateLoop(10);
    renderLoop();
    setTimeout(() => {
        stopUpdate();
        stopRender();
        console.table({ updates, renders });
        console.log("Done!");
    }, 5000);
}
