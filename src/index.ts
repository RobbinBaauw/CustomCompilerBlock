import { CustomBlockTransform } from "vite/dist/node/transform";
import { SharedConfig } from "vite/dist/node/config";
import { CompilerOptions } from "@vue/compiler-sfc";

const blockName = "compiler";

type BlockTransformType = SharedConfig["vueCustomBlockTransforms"];
export type TemplateCompilerOptions = {
    compilerPackage: string;
    options?: CompilerOptions;
};
export type TemplateCompilers = Record<string, TemplateCompilerOptions>;

export const getCustomBlockTransforms = (templateCompilers: TemplateCompilers): BlockTransformType => {
    const transformFunction: CustomBlockTransform = (ctx) => {
        const blockType = ctx.query.blockType;
        if (blockType === blockName) {
            const compiler = ctx.query.compiler;
            const currCompiler = templateCompilers[compiler as string];

            const compilerOptions = JSON.stringify(currCompiler.options);

            const code = `
                import Compiler from "${currCompiler.compilerPackage}"

                if (!document.compilerCache) 
                    document.compilerCache = {}
                    
                const compilerName = "${currCompiler.compilerPackage}"
                if (!document.compilerCache[compilerName]) 
                    document.compilerCache[compilerName] = { 
                        compiler: Compiler,
                        options: JSON.parse(${compilerOptions})
                    }
                   
                export default Comp => {
                    Comp.compiler = document.compilerCache["${currCompiler.compilerPackage}"].compiler
                    Comp.compilerOptions = {
                        ...document.compilerCache["${currCompiler.compilerPackage}"].options,
                        ...Comp.compilerOptions
                    }
                }
            `;
            console.log(code);
            return code;
        }

        return "";
    };

    return {
        [blockName]: transformFunction,
    };
};
