import { CustomBlockTransform } from "vite/dist/node/transform";
import { SharedConfig } from "vite/dist/node/config";
import { compilerBlockName, TemplateCompilers } from "./shared";

type BlockTransformType = SharedConfig["vueCustomBlockTransforms"];

export function getViteBlockTransform(templateCompilers: TemplateCompilers): BlockTransformType {
    const transformFunction: CustomBlockTransform = (ctx) => {
        const blockType = ctx.query.blockType;
        if (blockType !== compilerBlockName) {
            return "";
        }

        const compiler = ctx.query.compiler;
        if (typeof compiler !== "string") {
            console.warn(`Compiler ${compiler} not a valid compiler!`);
            return "";
        }

        const currCompiler = templateCompilers[compiler];
        if (!currCompiler) {
            console.warn(`Compiler ${compiler} not registered!`);
            return "";
        }

        const providedOptions = currCompiler.options ?? {
            prefixIdentifiers: true,
        };

        const compiledCode = currCompiler.compiler.compile(ctx.code, {
            mode: "module",
            ...providedOptions,
        }).code;

        return `
${compiledCode.replace("vue", "../../node_modules/vue/dist/vue.esm-browser.js")}

export default (comp) => {
    comp.template = ""
    comp.render = render
}
            `;
    };

    return {
        [compilerBlockName]: transformFunction,
    };
}
