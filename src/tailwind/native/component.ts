import { CustomPluginFunction } from "./types";

export const component: CustomPluginFunction = ({ addVariant }) => {
  addVariant("group-isolate-hover", "&::group-isolate-hover");
  addVariant("group-isolate-active", "&::group-isolate-active");
  addVariant("group-isolate-focus", "&::group-isolate-focus");
};
