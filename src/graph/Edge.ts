import { Vertex } from './Vertex';

export class Edge {
  public id: string;
  public source: Vertex;
  public target: Vertex;
  public weight: number | undefined;

  constructor(id: string, source: Vertex, target: Vertex, weight?: number) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.weight = weight;
  }

  public getEdgeAsString(showIds: boolean = true): string {
    let edgeStr = '';
    edgeStr += showIds ? `[${this.id}: ` : `[`;
    edgeStr += `${this.source.getVertexAsString(showIds)}`;
    edgeStr += ` -${this.weight !== undefined ? this.weight + '-' : ''}> `;
    edgeStr += `${this.target.getVertexAsString(showIds)}`;
    edgeStr += `]`;
    return edgeStr;
  }

  public logEdge(showIds: boolean = true): void {
    console.log(this.getEdgeAsString(showIds));
  }
}
