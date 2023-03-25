import postcssGlobalData from "@csstools/postcss-global-data";
import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    postcssGlobalData({
      files: ["./src/styles/breakpoints.css"],
    }),
    postcssPresetEnv({ stage: 1 }),
  ],
};
