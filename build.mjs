import {createRequire} from "node:module";
import {fileURLToPath} from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import {existsSync} from "node:fs";
import {builtinModules} from "node:module";
const root=fileURLToPath(new URL(".",import.meta.url));
const require=createRequire(import.meta.url);
// Optional local dependency reuse; normal use is npm install then npm run build.
const dependencyRoot=process.env.PRESENT_TENSE_NODE_MODULES;
const esbuild=dependencyRoot?require(path.join(dependencyRoot,"esbuild")):require("esbuild");
const shared={absWorkingDir:root,tsconfigRaw:{compilerOptions:{jsx:"react-jsx"}},bundle:true,jsx:"automatic",alias:{"@":path.join(root,"src")},nodePaths:dependencyRoot?[dependencyRoot]:[],define:{"process.env.NODE_ENV":'"production"'},logLevel:"info"};
// The local preview sandbox prevents native tools from inspecting ancestor
// directories. Resolve modules through Node when reusing local dependencies.
if(dependencyRoot)shared.plugins=[{name:"local-module-resolution",setup(build){
 build.onResolve({filter:/.*/},args=>{
  if(builtinModules.includes(args.path)||args.path.startsWith("node:"))return {path:args.path,external:true};
  let requested=args.path.startsWith("@/")?path.join(root,"src",args.path.slice(2)):args.path;
  if(requested.startsWith(".")||path.isAbsolute(requested)){
   const candidate=path.resolve(args.resolveDir||root,requested);
   for(const suffix of ["",".tsx",".ts",".js",".jsx",".json","/index.tsx","/index.ts","/index.js"])if(existsSync(candidate+suffix))return {path:candidate+suffix,namespace:"local-file"};
  }
  const lookup=createRequire(path.join(args.resolveDir||root,"package.json"));
  let resolved;try{resolved=lookup.resolve(requested);}catch{resolved=createRequire(path.join(dependencyRoot,"../package.json")).resolve(requested);}
  const esmSibling=resolved.replace(/\.js$/,".mjs");
  const esmDirectory=resolved.replace(/([\\/])cjs([\\/])/,"$1esm$2");
  if(esmSibling!==resolved&&existsSync(esmSibling))resolved=esmSibling;
  else if(esmDirectory!==resolved&&existsSync(esmDirectory))resolved=esmDirectory;
  return {path:resolved,namespace:"local-file"};
 });
 build.onLoad({filter:/.*/,namespace:"local-file"},async args=>({contents:await fs.readFile(args.path,"utf8"),loader:args.path.endsWith(".tsx")?"tsx":args.path.endsWith(".ts")?"ts":args.path.endsWith(".json")?"json":"jsx",resolveDir:path.dirname(args.path)}));
}}];
const docs=path.join(root,"docs");
await fs.mkdir(path.join(docs,"assets"),{recursive:true});
await fs.cp(path.join(root,"public"),docs,{recursive:true});
await fs.writeFile(path.join(docs,".nojekyll"),"");
await esbuild.build({...shared,entryPoints:["./src/main.tsx"],outfile:path.join(docs,"assets/app.js"),format:"iife",platform:"browser",minify:true});
const css=await esbuild.transform(await fs.readFile(path.join(root,"src/styles.css"),"utf8"),{loader:"css",minify:true});
await fs.writeFile(path.join(docs,"assets/site.css"),css.code);
await fs.mkdir(path.join(root,".build"),{recursive:true});
await esbuild.build({...shared,entryPoints:[path.join(root,"src/render.tsx")],outfile:path.join(root,".build/render.cjs"),format:"cjs",platform:"node",logLevel:"warning"});
const {render}=require(path.join(root,".build/render.cjs"));
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Present Tense — Make room for yourself</title><meta name="description" content="Stay connected to yourself under pressure, and bring what you feel and want into everyday situations and decisions. Present Tense is in development."><link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./assets/site.css"></head><body><div id="root">${render()}</div><noscript><p class="wrap small-note">Enable JavaScript to try the interactive leaf demonstration. Signups aren’t open yet.</p></noscript><script src="./config.js"></script><script defer src="./assets/app.js"></script></body></html>`;
await fs.writeFile(path.join(docs,"index.html"),html);
console.log("GitHub Pages files are ready in docs/.");
