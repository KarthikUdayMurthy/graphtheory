import { Graph, Vertex, Edge } from '../index';
export class BFSAlgorithm {
  private graph: Graph;
  private startingVertex: Vertex;
  private visited: { [key: string]: boolean } = {};
  private nodeQueue: Vertex[] = [];

  public sequenceIds: Array<string> = [];
  public loopCounter: number = 0;

  constructor(graph: Graph, startingVertex: Vertex = graph.vertices[0]) {
    this.graph = graph;
    this.startingVertex = startingVertex;

    this.graph.vertices.forEach(vertex => (this.visited[vertex.id] = false));
  }

  public bfs(vertex: Vertex = this.startingVertex) {
    this.loopCounter += 1;
    this.nodeQueue.push(vertex);
    this.visited[vertex.id] = true;
    this.sequenceIds.push(vertex.id);

    while (this.nodeQueue.length !== 0) {
      let { outgoingEdges } = this.nodeQueue.shift();
      outgoingEdges.forEach(({ id: edgeId, target }) => {
        if (!this.visited[target.id]) {
          this.loopCounter += 1;
          this.nodeQueue.push(target);
          this.visited[target.id] = true;
          this.sequenceIds.push(edgeId);
          this.sequenceIds.push(target.id);
        }
      });
    }
  }

  public shortPath(
    start: Vertex = this.startingVertex,
    end: Vertex = this.graph.vertices[this.graph.vertices.length - 1]
  ) {
    this.bfs(start);
    const endNodeIndex = this.sequenceIds.findIndex(seqId => seqId === end.id);
    if (endNodeIndex < 0) {
      this.sequenceIds = [];
    } else {
      this.sequenceIds = this.sequenceIds.slice(0, endNodeIndex + 1);
    }
  }

  public bfsRecursive() {
    this.bfs(this.startingVertex);
    this.graph.vertices.forEach(vertex => {
      if (!this.visited[vertex.id]) {
        this.bfs(vertex);
      }
    });
  }
}
