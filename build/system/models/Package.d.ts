import Source from '../base/Source';
export declare namespace PackageSpace {
    type Config = {
        path: string;
    };
    type Data = {
        name: string;
        version: string;
        bin: {
            [key: string]: string;
        };
    };
}
export default class Package extends Source<PackageSpace.Config> {
    get data(): PackageSpace.Data;
    get name(): string;
    get version(): string;
    get cli(): string;
}
