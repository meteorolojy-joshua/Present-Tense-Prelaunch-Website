import {renderToString} from "react-dom/server";
import Home from "./App";
export function render(){return renderToString(<Home/>);}
