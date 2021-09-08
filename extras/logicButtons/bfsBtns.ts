import { IlogicBtn, animSequence, clearAllStyles } from '../cyUtil';
import { Graph, Vertex } from '../../src/graph';
import { BFSAlgorithm } from '../../src/graph/algorithms';
import {
  getSelectedNodeIds,
  addHistoryContent,
  IHistoryContent
} from '../../index';

export const getBfsBtn = (
  graph: Graph,
  afterAnimCallback: (cy) => void = () => {}
): IlogicBtn => {
  const bfsBtn: IlogicBtn = {
    text: 'BFS',
    onClick: cy => {
      const startNode =
        graph.vertices.find(v => v.id === cy.$(':selected').id()) ||
        graph.vertices[0];
      cy.nodes().unselect();
      cy.$(`#${startNode.id}`).select();
      clearAllStyles(cy);
      const bfsAlgo = new BFSAlgorithm(graph, startNode);
      bfsAlgo.bfs();
      animSequence(cy, bfsAlgo.sequenceIds.slice(), afterAnimCallback);
      addHistory('BFS', bfsAlgo, startNode);
    }
  };
  return bfsBtn;
};

export const getBfsrBtn = (
  graph: Graph,
  afterAnimCallback: (cy) => void = () => {}
): IlogicBtn => {
  const bfsBtn: IlogicBtn = {
    text: 'BFS Recursive',
    onClick: cy => {
      const startNode =
        graph.vertices.find(v => v.id === cy.$(':selected').id()) ||
        graph.vertices[0];
      cy.nodes().unselect();
      cy.$(`#${startNode.id}`).select();
      clearAllStyles(cy);
      const bfsAlgo = new BFSAlgorithm(graph, startNode);
      bfsAlgo.bfsRecursive();
      animSequence(cy, bfsAlgo.sequenceIds.slice(), afterAnimCallback);
      addHistory('BFS Recursive', bfsAlgo, startNode);
    }
  };
  return bfsBtn;
};

export const getBfsPathBtn = (
  graph: Graph,
  afterAnimCallback: (cy) => void = () => {}
): IlogicBtn => {
  const bfsBtn: IlogicBtn = {
    text: 'BFS Short Path',
    onClick: cy => {
      const startNode =
        graph.vertices.find(v => v.id === getSelectedNodeIds()[0]) ||
        graph.vertices[0];
      const endNode =
        graph.vertices.find(v => v.id === getSelectedNodeIds()[1]) ||
        graph.vertices[graph.vertices.length - 1];
      cy.nodes().unselect();
      cy.$(`#${startNode.id}, #${endNode.id}`).select();
      clearAllStyles(cy);
      const bfsAlgo = new BFSAlgorithm(graph, startNode);
      bfsAlgo.shortPath(startNode, endNode);
      let noPathMsg = '';
      if (bfsAlgo.sequenceIds.length === 0) {
        noPathMsg = `No Path Found between ${startNode.value} and ${
          endNode.value
        }`;
        addHistory('BFS Short Path', bfsAlgo, startNode, endNode, noPathMsg);
        alert(noPathMsg);
        return;
      }
      animSequence(cy, bfsAlgo.sequenceIds.slice(), afterAnimCallback);
      addHistory('BFS Short Path', bfsAlgo, startNode, endNode);
    }
  };
  return bfsBtn;
};

const addHistory = (
  actionName: string,
  bfsAlgo: BFSAlgorithm,
  startNode: Vertex,
  endNode?: Vertex,
  noPathMsg?: string
) => {
  const historyContent: IHistoryContent[] = [];
  historyContent.push({
    label: 'Starting Vertex',
    value: startNode.getVertexAsString()
  });
  if (endNode) {
    historyContent.push({
      label: 'Ending Vertex',
      value: endNode.getVertexAsString()
    });
  }
  historyContent.push({
    label: 'Loop Count',
    value: bfsAlgo.loopCounter.toString()
  });
  historyContent.push({
    label: 'Sequence IDs',
    value: `['${bfsAlgo.sequenceIds.join("', '")}']`
  });
  if (noPathMsg) {
    historyContent.push({
      label: 'Path',
      value: noPathMsg
    });
  }
  addHistoryContent(
    actionName,
    (document.getElementById('selGraph') as HTMLSelectElement).value,
    historyContent
  );
};
