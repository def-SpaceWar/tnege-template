class _E implements Entity {
    constructor(private _id: number, private components: Component[] = []) {
        const size = components.length;
        for (let i = 0 ; i < size; i++) components[i].entity = this;
    }
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

class _S implements Scene {
    private entities: (Entity | undefined)[] = [];
    private nextId = 0;
    private emptyIds: number[] = [];
    wrapper?: Wrapper;

    constructor() { }

    add(...components: Component[]): Entity {
        if (this.emptyIds.length > 0) {
            const id = this.emptyIds.pop()!;
            return this.entities[id] = new _E(id, components);
        }

        const newE = new _E(this.nextId++, components);
        this.entities.push(newE);
        return newE;
    }

    *iterate() {
        for (let i = 0; i < this.entities.length; i++) {
            const e = this.entities[i];
            if (e) yield this.entities[i]!;
        }
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
    return new _S();
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
        scene.wrapper = this;
    }

    get currentScene(): Scene {
        return this.scene;
    }

    set currentScene(scene: Scene) {
        this.scene = scene;
        scene.wrapper = this;
    }
}
