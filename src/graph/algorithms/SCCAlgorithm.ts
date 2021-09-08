import { Graph, Vertex, Edge } from '../index';
import { IAnimSequenceId, IAnimIdWithCallback } from '../../../extras/cyUtil';

export class SCCAlgorithm {
  private graph: Graph;
  private visited: { [key: string]: boolean } = {};
  private SCC: Array<Vertex> = [];

  public sequenceIds: Array<IAnimSequenceId> = [];
  public loopCounter: number = 0;
  public postOrderStack: Array<Vertex> = [];
  public SCCs: Array<Array<Vertex>> = [];

  constructor(
    graph: Graph,
    private stackCallback: (v, ind) => IAnimIdWithCallback['callback'],
    private stackPopCallback: (v) => IAnimIdWithCallback['callback']
  ) {
    this.graph = graph;

    this.graph.vertices.forEach(vertex => (this.visited[vertex.id] = false));
  }

  private dfsFirst(vertex: Vertex) {
    const { id, outgoingEdges } = vertex;
    if (this.visited[id]) return;

    this.loopCounter += 1;
    this.sequenceIds.push(id);
    this.visited[id] = true;

    outgoingEdges.forEach(({ id, target }) => {
      this.sequenceIds.push(id);
      this.dfsFirst(target);
    });
    this.postOrderStack.push(vertex);
    const postOrderStackLength = this.postOrderStack.length;
    this.sequenceIds.push({
      id,
      callback: this.stackCallback(vertex, postOrderStackLength - 1)
    });
  }

  private dfsSecond(vertex: Vertex) {
    const { id, incomingEdges } = vertex;
    if (this.visited[id]) return;

    this.loopCounter += 1;
    this.sequenceIds.push(id);
    this.visited[id] = true;
    this.SCC.push(vertex);

    incomingEdges.forEach(({ id, source }) => {
      this.sequenceIds.push(id);
      this.dfsSecond(source);
    });
  }

  public findSCCs() {
    this.graph.vertices.forEach(vertex => {
      if (!this.visited[vertex.id]) {
        this.dfsFirst(vertex);
      }
    });
    this.graph.vertices.forEach(vertex => (this.visited[vertex.id] = false));

    const reversePostOrderStack = this.postOrderStack.slice().reverse();
    reversePostOrderStack.forEach(vertex => {
      this.loopCounter += 1;
      this.sequenceIds.push({
        id: vertex.id,
        callback: this.stackPopCallback(vertex)
      });
      if (!this.visited[vertex.id]) {
        this.SCC = [];
        this.dfsSecond(vertex);
        this.SCCs.push(this.SCC);
      }
    });
  }
}
