import { CompilerOptions, TemplateCompiler } from "@vue/compiler-sfc";

export const compilerBlockName = "compiler";

export type TemplateCompilerOptions = {
    compiler: TemplateCompiler;
    options?: CompilerOptions;
};
export type TemplateCompilers = Record<string, TemplateCompilerOptions>;
