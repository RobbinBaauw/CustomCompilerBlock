import { UserConfig } from "vite";
import { getCustomBlockTransforms } from "../src";
import * as Vugel from "vugel";

const config: UserConfig = {
    vueCustomBlockTransforms: getCustomBlockTransforms({
        vugel: {
            compiler: Vugel,
        },
    }),
};

export default config;
