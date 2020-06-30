import { compilerBlockName, TemplateCompilers } from "./shared";

export function getLoaderBlockTransform(
    templateCompilers: TemplateCompilers,
): {
    resourceQuery: RegExp;
    loader: (source: string, map: any) => void;
} {
    const transformFunction = (source: string, map: any) => {
        // TODO
        return ``;
    };

    return {
        resourceQuery: new RegExp(`/blockType=${compilerBlockName}/`),
        loader: transformFunction,
    };
}
