import { World, createScene, createStepper } from "./tnege/ecs";
import { Name, createRenderLoop, createUpdateLoop } from "./tnege/prelude";

type MyDeltas = UpdateDelta & RenderDelta;
const MY_DELTAS: MyDeltas = {
    update: 0,
    render: 0,
};

/** Delta Time */
export const dt = () => MY_DELTAS.update;
/** Seconds per Frame */
export const spf = () => MY_DELTAS.render;

export function game(canvas: HTMLCanvasElement) {
    const scene = createScene(),
        w = new World(scene);

    scene.add(new Name("The First Coming"));
    scene.add();
    scene.add();
    scene.destroy(0);
    scene.add(new Name("The Second Coming"));

    let updates = 0, renders = 0;
    const updateStepper = createStepper(),
        [updateLoop, stopUpdate] = createUpdateLoop(() => {
            updateStepper(w);
            console.log("update");
            updates++;
        }, MY_DELTAS),
        renderStepper = createStepper(),
        [renderLoop, stopRender] = createRenderLoop(() => {
            renderStepper(w);
            console.log("render");
            renders++;
        }, MY_DELTAS);

    updateLoop(10);
    renderLoop();
    setTimeout(() => {
        stopUpdate();
        stopRender();
        console.table({ updates, renders });
        console.log("Done!");
    }, 5000);
}
