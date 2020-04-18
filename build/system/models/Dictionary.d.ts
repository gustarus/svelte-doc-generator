import Source from '../base/Source';
import { ItemType } from '../types/ItemType';
export declare namespace IndexSpace {
    type Config = {
        items: ItemType[];
    };
}
export default class Dictionary extends Source<IndexSpace.Config> {
    items: ItemType[];
    generate(): void;
}
