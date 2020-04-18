import FunctionExport, { FunctionExportSpace } from '../exports/FunctionExport';
import VariableDeclaration, { VariableExportSpace } from '../exports/VariableExport';
import ClassExport, { ClassExportSpace } from '../exports/ClassExport';

export type ExportResultType = FunctionExportSpace.Result | VariableExportSpace.Result | ClassExportSpace.Result;
