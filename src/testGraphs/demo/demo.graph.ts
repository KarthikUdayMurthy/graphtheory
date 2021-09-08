import { Edge, Graph, Vertex } from '../../graph';

const graph = new Graph(true);

const a = graph.addVertex(new Vertex(graph.nextId(), 'a'));
const b = graph.addVertex(new Vertex(graph.nextId(), 'b'));
const c = graph.addVertex(new Vertex(graph.nextId(), 'c'));
const d = graph.addVertex(new Vertex(graph.nextId(), 'd'));
const e = graph.addVertex(new Vertex(graph.nextId(), 'e'));
const f = graph.addVertex(new Vertex(graph.nextId(), 'f'));
const g = graph.addVertex(new Vertex(graph.nextId(), 'g'));

graph.addEdge(new Edge(graph.nextId(), a, b));
graph.addEdge(new Edge(graph.nextId(), b, c));
graph.addEdge(new Edge(graph.nextId(), d, b));
graph.addEdge(new Edge(graph.nextId(), c, d));
graph.addEdge(new Edge(graph.nextId(), c, e));
graph.addEdge(new Edge(graph.nextId(), d, f));
graph.addEdge(new Edge(graph.nextId(), d, g));

// graph.addEdge(new Edge(graph.nextId(), a, c));
// graph.addEdge(new Edge(graph.nextId(), c, b));
// graph.addEdge(new Edge(graph.nextId(), b, a));
// graph.addEdge(new Edge(graph.nextId(), a, d));
// graph.addEdge(new Edge(graph.nextId(), d, e));

// graph.logAllVertices();

export { graph };
