import { IlogicBtn, animSequence, clearAllStyles } from '../cyUtil';
import { Graph, Vertex } from '../../src/graph';
import { DFSAlgorithm } from '../../src/graph/algorithms';
import { addHistoryContent, IHistoryContent } from '../../index';

export const getDfsBtn = (
  graph: Graph,
  afterAnimCallback: (cy) => void = () => {}
): IlogicBtn => {
  const dfsBtn: IlogicBtn = {
    text: 'DFS',
    onClick: cy => {
      const startNode =
        graph.vertices.find(v => v.id === cy.$(':selected').id()) ||
        graph.vertices[0];
      cy.nodes().unselect();
      cy.$(`#${startNode.id}`).select();
      clearAllStyles(cy);
      const dfsAlgo = new DFSAlgorithm(graph, startNode);
      dfsAlgo.dfs();
      animSequence(cy, dfsAlgo.sequenceIds.slice(), afterAnimCallback);
      addHistory('DFS', dfsAlgo, startNode);
    }
  };
  return dfsBtn;
};

export const getDfsrBtn = (
  graph: Graph,
  afterAnimCallback: (cy) => void = () => {}
): IlogicBtn => {
  const dfsBtn: IlogicBtn = {
    text: 'DFS Recursive',
    onClick: cy => {
      const startNode =
        graph.vertices.find(v => v.id === cy.$(':selected').id()) ||
        graph.vertices[0];
      cy.nodes().unselect();
      cy.$(`#${startNode.id}`).select();
      clearAllStyles(cy);
      const dfsAlgo = new DFSAlgorithm(graph, startNode);
      dfsAlgo.dfsRecursive();
      animSequence(cy, dfsAlgo.sequenceIds.slice(), afterAnimCallback);
      addHistory('DFS Recursive', dfsAlgo, startNode);
    }
  };
  return dfsBtn;
};

const addHistory = (
  actionName: string,
  dfsAlgo: DFSAlgorithm,
  startNode: Vertex
) => {
  const historyContent: IHistoryContent[] = [];
  historyContent.push({
    label: 'Starting Vertex',
    value: startNode.getVertexAsString()
  });
  historyContent.push({
    label: 'Loop Count',
    value: dfsAlgo.loopCounter.toString()
  });
  historyContent.push({
    label: 'Sequence IDs',
    value: `['${dfsAlgo.sequenceIds.join("', '")}']`
  });
  addHistoryContent(
    actionName,
    (document.getElementById('selGraph') as HTMLSelectElement).value,
    historyContent
  );
};
