import { Vertex } from './Vertex';
import { Edge } from './Edge';

export class Graph {
  public vertices: Vertex[] = [];
  public edges: Edge[] = [];
  public isDirected: boolean;

  private currentId: number = -1;

  constructor(isDirected: boolean = false) {
    this.isDirected = isDirected;
  }

  public addVertex(vertex: Vertex): Vertex {
    let existingVertexIndex = this.vertices.findIndex(v => v.id === vertex.id);
    if (existingVertexIndex < 0) {
      this.vertices.push(vertex);
      return vertex;
    } else {
      return this.vertices[existingVertexIndex];
    }
  }

  public addEdge(edge: Edge): [Vertex, Vertex, Edge] {
    let sourceVertex = this.addVertex(edge.source);
    let targetVertex = this.addVertex(edge.target);
    this.edges.push(edge);
    sourceVertex.outgoingEdges.push(edge);
    targetVertex.incomingEdges.push(edge);
    edge.source = sourceVertex;
    edge.target = targetVertex;
    return [sourceVertex, targetVertex, edge];
  }

  public nextId(): string {
    this.currentId += 1;
    return this.currentId.toString();
  }

  public logAllVertices(showIds: boolean = true): void {
    console.log(
      this.vertices.map(vertex => vertex.getVertexAsString(showIds)).join('\n')
    );
  }

  public logAllEdges(showIds: boolean = true): void {
    console.log(
      this.edges.map(edge => edge.getEdgeAsString(showIds)).join('\n')
    );
  }
}
