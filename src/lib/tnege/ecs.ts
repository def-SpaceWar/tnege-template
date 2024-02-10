const _E = class implements Entity {
    constructor(private _id: number, private components: Component[] = []) { }
    get id() { return this._id; }

    add(...cs: Component[]): this {
        const size = cs.length;
        for (let i = 0; i < size; i++) cs[i].entity = this;
        this.components.push(...cs);
        return this;
    }

    query<T extends Component>(c: Constructor<T>): T[] {
        return this.components.filter(comp => comp instanceof c) as T[];
    }

    destroy<T extends Component>(c: T | Constructor<T>): void {
        switch (typeof c) {
            case 'object':
                for (let i = 0; i < this.components.length; i++)
                    if (this.components[i] === c) this.components.splice(i--, 1);
                break;
            default:
                for (let i = 0; i < this.components.length; i++)
                    if (this.components[i] instanceof c) this.components.splice(i--, 1);
                return;
        }
    }
};

const _S = class implements Scene {
    private entities: (Entity | undefined)[] = [];
    private nextId = 0;
    private emptyIds: number[] = [];
    world?: Wrapper;

    constructor() { }

    add(...components: Component[]): Entity {
        const newE = new _E(this.emptyIds.length > 0 ? this.emptyIds.pop()! : this.nextId, components);
        this.entities.push(newE);
        return newE;
    }

    query(id: number): Entity | undefined {
        return this.entities[id];
    }

    destroy(id: number): this {
        if (!this.entities[id]) return this;
        this.emptyIds.push(id);
        this.entities[id] = undefined;
        return this;
    }
};

export function createScene() {
    const scene = new _S();
    return scene;
}

export function createStepper(...systems: System[]): Stepper {
    const size = systems.length;
    return w => {
        const currentScene = w.currentScene;
        for (let i = 0; i < size; i++) systems[i](currentScene);
    };
}

export class World implements Wrapper {
    constructor(private scene: Scene = new _S()) {
        scene.world = this;
    }

    get currentScene(): Scene {
        return this.scene;
    }

    set currentScene(scene: Scene) {
        this.scene = scene;
        scene.world = this;
    }
}
