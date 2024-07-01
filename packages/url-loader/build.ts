import { fromHere, readFile, shell, walkPaths, writeFile } from "@arktype/fs";
import { printNode, zodToTs } from "zod-to-ts";
import { constructUrlPropsSchema } from "./src/schema.js";

shell("pnpm tsup src/index.ts src/schema.ts --format esm,cjs --dts --clean");

const tsTypeSrc = printNode(
  zodToTs(constructUrlPropsSchema, "constructUrlPropsSchema").node
);

walkPaths(fromHere("dist"), {
  include: (path) => path.endsWith("ts"),
}).forEach((path) => {
  const originalSrc = readFile(path);
  writeFile(
    path,
    originalSrc.replace(
      "type ConstructUrlProps = z.infer<typeof constructUrlPropsSchema>;",
      `type ConstructUrlProps = ${tsTypeSrc};`
    )
  );
});
