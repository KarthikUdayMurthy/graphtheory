import { Edge } from './Edge';

export class Vertex {
  public value: any;
  public id: string;
  public incomingEdges: Edge[] = [];
  public outgoingEdges: Edge[] = [];

  constructor(
    id: string,
    value: any,
    incomingEdges: Edge[] = [],
    outgoingEdges: Edge[] = []
  ) {
    this.id = id;
    this.value = value;
    this.incomingEdges = incomingEdges;
    this.outgoingEdges = outgoingEdges;
  }
  public getVertexAsString(showIds: boolean = true): string {
    if (showIds) {
      return `(${this.id}, ${this.value})`;
    } else {
      return `(${this.value})`;
    }
  }
  public logVertex(showIds: boolean = true): void {
    console.log(this.getVertexAsString(showIds));
  }
}
