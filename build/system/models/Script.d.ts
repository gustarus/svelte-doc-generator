import { ImportDeclaration } from 'estree';
import { Script as SvelteScript } from 'svelte/types/compiler/interfaces';
import FunctionExport, { FunctionExportSpace } from '../exports/FunctionExport';
import VariableExport, { VariableExportSpace } from '../exports/VariableExport';
import ClassExport, { ClassExportSpace } from '../exports/ClassExport';
import { ExportType } from '../types/ExportType';
import Source, { SourceSpace } from '../base/Source';
export declare namespace ScriptSpace {
    type Config = {
        data: SvelteScript;
    };
    type Definition = {
        code: string;
        variables: {
            [key: string]: VariableExportSpace.Result;
        };
        functions: {
            [key: string]: FunctionExportSpace.Result;
        };
        classes: {
            [key: string]: ClassExportSpace.Result;
        };
        start: SourceSpace.Position;
        end: SourceSpace.Position;
    };
}
export default class Script extends Source<ScriptSpace.Config> {
    data: SvelteScript;
    get exports(): ExportType[];
    get imports(): ImportDeclaration[];
    get variables(): VariableExport[];
    get functions(): FunctionExport[];
    get classes(): ClassExport[];
    get start(): SourceSpace.Position;
    get end(): SourceSpace.Position;
    get code(): string;
    get definition(): ScriptSpace.Definition;
    private static filterExports;
    private static collectExports;
}
