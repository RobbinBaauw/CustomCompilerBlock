import { UserConfig } from "vite";
import { getViteBlockTransform } from "../src";
import * as Vugel from "vugel";

const config: UserConfig = {
    vueCustomBlockTransforms: getViteBlockTransform({
        vugel: {
            compiler: Vugel,
        },
    }),
    optimizeDeps: {
        include: ["vugel"],
    },
};

export default config;
