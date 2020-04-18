import Package from './Package';
import Documentation from './Documentation';
import Base from '../base/Base';
import Variable from './Variable';
export declare namespace GeneratorSpace {
    type Config = {
        name: string;
        package: Package;
        directory: string;
        documentation: Documentation;
    };
}
export default class Generator extends Base<GeneratorSpace.Config> {
    readonly fileNameIndex = "index.js";
    readonly fileNameDocumentation = "Documentation.svelte";
    name: string;
    package: Package;
    directory: string;
    documentation: Documentation;
    get pathToIndex(): string;
    get pathToDocumentation(): string;
    get variables(): Variable[];
    generate(): void;
}
