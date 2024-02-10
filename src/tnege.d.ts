interface Constructor<T> {
    new(...args: unknown[]): T;
}

type Component = { entity?: Entity; };

interface Entity {
    get id(): number;
    add(...cs: Component[]): this;
    query<T extends Component>(c: Constructor<T>): T[];
    destroy<T extends Component>(c: T): void;
    destroy<T extends Component>(c: Constructor<T>): void;
};

interface Scene {
    world?: Wrapper;
    add(...components: Component[]): Entity;
    query(id: number): Entity | undefined;
    destroy(id: number): this;
}

interface Wrapper {
    currentScene: Scene;
}

type System = (s: Scene) => void;
type Stepper = (w: Wrapper) => void;
