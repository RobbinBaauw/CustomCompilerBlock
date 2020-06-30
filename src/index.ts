import { CustomBlockTransform } from "vite/dist/node/transform";
import { SharedConfig } from "vite/dist/node/config";
import { CompilerOptions, TemplateCompiler } from "@vue/compiler-sfc";

const blockName = "compiler";

type BlockTransformType = SharedConfig["vueCustomBlockTransforms"];
export type TemplateCompilerOptions = {
    compiler: TemplateCompiler;
    options?: CompilerOptions;
};
export type TemplateCompilers = Record<string, TemplateCompilerOptions>;

export const getCustomBlockTransforms = (templateCompilers: TemplateCompilers): BlockTransformType => {
    const transformFunction: CustomBlockTransform = (ctx) => {
        const blockType = ctx.query.blockType;
        if (blockType === blockName) {
            const compiler = ctx.query.compiler;
            const currCompiler = templateCompilers[compiler as string];

            const providedOptions = currCompiler.options ?? {
                prefixIdentifiers: true,
            };

            const compiledCode = currCompiler.compiler.compile(ctx.code, {
                mode: "module",
                ...providedOptions,
            }).code;

            const code = `
${compiledCode}

export default Comp => {
    Comp.render = render
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
