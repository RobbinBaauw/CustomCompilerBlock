import { UserConfig } from "vite";
import { getCustomBlockTransforms } from "../src";

const config: UserConfig = {
    vueCustomBlockTransforms: getCustomBlockTransforms({
        vugel: {
            compilerPackage: "vugel/esm",
        },
    }),
    optimizeDeps: {
        include: ["vugel/esm"],
    },
};

export default config;
