import {
  IlogicBtn,
  animSequence,
  clearAllStyles,
  IAnimIdWithCallback,
  reverseAllEdges
} from '../cyUtil';
import { Graph, Vertex } from '../../src/graph';
import { SCCAlgorithm, MinEdgesToReachAll } from '../../src/graph/algorithms';
import { addHistoryContent, IHistoryContent } from '../../index';
import { getSCCBtn, stackCallback, stackPopCallback } from './sccBtns';

export const getMinEdgeToReachAllBtn = (
  graph: Graph,
  afterAnimCallback: (cy) => void = () => {},
  cy
): IlogicBtn => {
  const getMinEdgeToReachAllBtn: IlogicBtn = {
    text: 'Add Edges To Reach All',
    onClick: (cy, e) => {
      const startNode =
        graph.vertices.find(v => v.id === cy.$(':selected').id()) ||
        graph.vertices[0];

      const afterSCCAnim = () => {
        cy.$(`#${startNode.id}`).select();
        clearAllStyles(cy);
        const minEdgeAlgo = new MinEdgesToReachAll(
          graph,
          stackCallback,
          stackPopCallback
        );
        minEdgeAlgo.addEdgesToReachAll(startNode, sccAlgo.SCCs);
        console.log(minEdgeAlgo.newEdges);
      };
      const sccBtn = getSCCBtn(graph, afterSCCAnim, cy);
      const sccAlgo = sccBtn.onClick(cy, e) as SCCAlgorithm;
    }
  };
  return getMinEdgeToReachAllBtn;
};
