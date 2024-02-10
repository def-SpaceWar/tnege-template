<script lang="ts">
    import { WASM_LOADED } from "./main";
    import { greet } from "./lib/tnege-wasm/tnege_wasm";

    WASM_LOADED.then(() => {
        greet("Hello World!");
    });
</script>

<h1>TNEGE: Template Project</h1>
