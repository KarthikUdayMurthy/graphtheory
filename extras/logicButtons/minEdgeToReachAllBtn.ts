import { IlogicBtn, animSequence, clearAllStyles, addEdge } from '../cyUtil';
import { Graph, Vertex } from '../../src/graph';
import { SCCAlgorithm, MinEdgesToReachAll } from '../../src/graph/algorithms';
import { addHistoryContent, IHistoryContent } from '../../index';
import { getSCCBtn, stackCallback, stackPopCallback } from './sccBtns';

export const getMinEdgeToReachAllBtn = (
  graph: Graph,
  afterAnimCallback: (cy) => void = () => {}
): IlogicBtn => {
  const getMinEdgeToReachAllBtn: IlogicBtn = {
    text: 'Add Edges To Reach All',
    onClick: (cy, e) => {
      const startNode =
        graph.vertices.find(v => v.id === cy.$(':selected').id()) ||
        graph.vertices[0];

      const afterSCCAnim = () => {
        cy.$(`#${startNode.id}`).select();
        // clearAllStyles(cy);
        const minEdgeAlgo = new MinEdgesToReachAll(
          graph,
          stackCallback,
          stackPopCallback
        );
        minEdgeAlgo.getEdgesToReachAll(startNode, sccAlgo.SCCs);
        if (minEdgeAlgo.newEdges.length === 0) {
          const alreadyReachableMsg = `All vertices are already reachable from vertex ${
            startNode.value
          }`;
          addHistory(
            'Add Edges To Reach All',
            minEdgeAlgo,
            startNode,
            alreadyReachableMsg
          );
          alert(alreadyReachableMsg);
          return;
        } else {
          const newEdgeIds = minEdgeAlgo.newEdges.map(newEdge => {
            addEdge(cy, newEdge);
            return newEdge.id;
          });
          animSequence(cy, newEdgeIds.slice(), cy => {
            cy.$(`#${newEdgeIds.join(',#')}`).addClass('edgeHighlight1');
            afterAnimCallback(cy);
          });
          addHistory('Add Edges To Reach All', minEdgeAlgo, startNode);
        }
      };

      const sccBtn = getSCCBtn(graph, afterSCCAnim, cy);
      const sccAlgo = sccBtn.onClick(cy, e) as SCCAlgorithm;
    }
  };
  return getMinEdgeToReachAllBtn;
};

const addHistory = (
  actionName: string,
  minEdgeAlgo: MinEdgesToReachAll,
  startNode: Vertex,
  alreadyReachableMsg: string = ''
) => {
  const historyContent: IHistoryContent[] = [];
  historyContent.push({
    label: 'Starting Vertex',
    value: startNode.getVertexAsString()
  });
  historyContent.push({
    label: 'Loop Count',
    value: minEdgeAlgo.loopCounter.toString()
  });
  historyContent.push({
    label: 'Sequence IDs',
    value: `['${minEdgeAlgo.newEdges.map(({ id }) => id).join("', '")}']`
  });
  if (alreadyReachableMsg) {
    historyContent.push({
      label: 'New Edges',
      value: alreadyReachableMsg
    });
  } else {
    historyContent.push({
      label: 'New Edges',
      value: `[<br/>&emsp;${minEdgeAlgo.newEdges
        .map(edge => edge.getEdgeAsString())
        .join(', <br/>&emsp;')}<br/>]`
    });
  }
  addHistoryContent(
    actionName,
    (document.getElementById('selGraph') as HTMLSelectElement).value,
    historyContent
  );
};
