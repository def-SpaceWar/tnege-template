import './app.css'
import App from './App.svelte'
import init from './lib/tnege-wasm/tnege_wasm';
export const WASM_LOADED = init();

const app = new App({
    target: document.getElementById('app')!,
});

export default app;
