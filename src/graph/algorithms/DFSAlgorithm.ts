import { Graph, Vertex, Edge } from '../index';

export class DFSAlgorithm {
  private graph: Graph;
  private startingVertex: Vertex;
  private visited: { [key: string]: boolean } = {};

  public sequenceIds: Array<string> = [];
  public loopCounter: number = 0;

  constructor(graph: Graph, startingVertex: Vertex = graph.vertices[0]) {
    this.graph = graph;
    this.startingVertex = startingVertex;

    this.graph.vertices.forEach(vertex => (this.visited[vertex.id] = false));
  }

  dfs({ id, outgoingEdges }: Vertex = this.startingVertex) {
    if (this.visited[id]) return;

    this.loopCounter += 1;
    this.sequenceIds.push(id);
    this.visited[id] = true;

    outgoingEdges.forEach(({ id, target }) => {
      this.sequenceIds.push(id);
      this.dfs(target);
    });
  }

  dfsRecursive() {
    this.dfs(this.startingVertex);
    this.graph.vertices.forEach(vertex => {
      if (!this.visited[vertex.id]) {
        this.dfs(vertex);
      }
    });
  }
}
