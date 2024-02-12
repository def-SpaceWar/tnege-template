<script lang="ts">
    import { onMount } from "svelte";
    import { game } from "./lib/game";

    //import { WASM_LOADED } from "./main";
    //import { greet } from "./lib/tnege-wasm/tnege_wasm";
    //WASM_LOADED.then(() => {
    //    greet("Hello World!");
    //});

    let canvas: HTMLCanvasElement;

    onMount(() => {
        game(canvas);
    });
</script>

<h1>TNEGE: Template Project</h1>
<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        background-color: #000;
    }
</style>
