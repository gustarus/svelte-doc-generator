import Source from '../base/Source';
import { ItemType } from '../types/ItemType';
export declare namespace RouterSpace {
    type Config = {
        routes: ItemType[];
    };
}
export default class Router extends Source<RouterSpace.Config> {
    routes: ItemType[];
    generate(): void;
}
