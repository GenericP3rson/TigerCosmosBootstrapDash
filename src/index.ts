import "./styles.css";
import { Graph, GraphConfigInterface } from "@cosmograph/cosmos";
import { InputNode, InputLink, getTigerGraphData } from "./tg_function";
import { HOST, GRAPHNAME, USERNAME, PASSWORD } from "./cred";

let vertices: string[] = [];
let edges: string[] = [];

const v_input = document.getElementById('vertices') as HTMLInputElement | null;

v_input?.addEventListener('input', function (event) {
  const target = event.target as HTMLInputElement;
  if (target.value != null && target.value.charAt(target.value.length-1) == ' ') {
    vertices = target.value.split(' ');
    vertices.pop();
    console.log(vertices, vertices.length);
    if (edges.length != 0) {
      createGraph(vertices, edges);
    }
  }
});

const e_input = document.getElementById('edges') as HTMLInputElement | null;

e_input?.addEventListener('input', function (event) {
  const target = event.target as HTMLInputElement;
  if (target.value != null && target.value.charAt(target.value.length-1) == ' ') {
    edges = target.value.split(' ');
    edges.pop();
    console.log(edges, edges.length);
    if (vertices.length != 0) {
      createGraph(vertices, edges);
    }
  }
});

async function createGraph(v_array: Array<string>, e_array: Array<string>) {
  getTigerGraphData(v_array, e_array, HOST, GRAPHNAME, USERNAME, PASSWORD).then((x) => {
    const type_to_colour : Map<string, string> = new Map();

    for (let v in v_array) {
      type_to_colour.set(v_array[v], 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')');
    }

    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const config: GraphConfigInterface<InputNode, InputLink> = {
      nodeColor: v => `${type_to_colour.get("" + v.v_type)}`,
      linkArrows: false,
      events: {
        onClick: (node) => {
          console.log("Clicked node: ", node);
        }
      }
    };
    const graph = new Graph(canvas, config);
    graph.setData(x.nodes, x.links);
    graph.zoom(0.9);
});
}
