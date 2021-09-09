import { Graph, Vertex, Edge } from '../index';
import { SCCAlgorithm } from './SCCAlgorithm';
import { IAnimSequenceId, IAnimIdWithCallback } from '../../../extras/cyUtil';

export class MinEdgesToReachAll extends SCCAlgorithm {
  public newEdges: Edge[] = [];
  private currentGraph: Graph;

  constructor(
    graph: Graph,
    stackCallback: (v, ind) => IAnimIdWithCallback['callback'],
    stackPopCallback: (v) => IAnimIdWithCallback['callback']
  ) {
    super(graph, stackCallback, stackPopCallback);
    this.currentGraph = graph;
  }

  addEdgesToReachAll(startingVertex: Vertex, SCCs: Array<Array<Vertex>> = []) {
    if (SCCs.length === 0) {
      super.findSCCs();
      SCCs = super.SCCs;
    }
    SCCs.slice().forEach(scc => {
      let hasZeroIncomingEdges: boolean = false;
      if (scc.length === 1) {
        if (scc[0].id === startingVertex.id) {
          hasZeroIncomingEdges = false;
        } else {
          hasZeroIncomingEdges = scc[0].incomingEdges.length === 0;
        }
      } else {
        const thisSccIds = scc.map(({ id }) => id);
        if (thisSccIds.indexOf(startingVertex.id) >= 0) {
          hasZeroIncomingEdges = false;
        } else {
          hasZeroIncomingEdges =
            scc.filter(({ incomingEdges }) => {
              // return true if atleast one incoming edge coming from outside this scc
              return (
                incomingEdges.filter(
                  // filter out incoming edges coming from this scc
                  ({ source }) => thisSccIds.indexOf(source.id) < 0
                ).length > 0
              );
            }).length === 0;
        }
      }
      if (hasZeroIncomingEdges) {
        this.newEdges.push(
          new Edge(this.currentGraph.nextId(), startingVertex, scc[0])
        );
      }
    });
  }
}
