import {
  IlogicBtn,
  animSequence,
  clearAllStyles,
  IAnimIdWithCallback,
  reverseAllEdges
} from '../cyUtil';
import { Graph, Vertex } from '../../src/graph';
import { SCCAlgorithm } from '../../src/graph/algorithms';
import { addHistoryContent, IHistoryContent } from '../../index';

let moduleGraph: Graph;
let moduleCy;

const stackCallback = (
  vertex: Vertex,
  stackIndex: number
): IAnimIdWithCallback['callback'] => {
  return ele => {
    ele.addClass('stack');
    ele.removeClass('activeNodeStyle');
    ele.addClass('inActiveNodeStyle');
    ele.data({ value: vertex.value + '-' + stackIndex });

    if (stackIndex === moduleGraph.vertices.length - 1) {
      reverseAllEdges(moduleCy);
    }
  };
};

const stackPopCallback = (vertex: Vertex): IAnimIdWithCallback['callback'] => {
  return ele => {
    ele.removeClass('stack');
    ele.data({ value: vertex.value.split('-')[0] });
  };
};

export const getSCCBtn = (
  graph: Graph,
  afterAnimCallback: (cy) => void = () => {},
  cy
): IlogicBtn => {
  moduleGraph = graph;
  moduleCy = cy;

  const sccBtn: IlogicBtn = {
    text: 'Find SCCs',
    onClick: cy => {
      cy.nodes().unselect();
      clearAllStyles(cy);
      const sccAlgo = new SCCAlgorithm(graph, stackCallback, stackPopCallback);
      sccAlgo.findSCCs();

      animSequence(cy, sccAlgo.sequenceIds.slice(), () => {
        reverseAllEdges(cy, true);
        sccAlgo.SCCs.slice().forEach(scc => {
          const ids = '#' + scc.map(v => v.id).join(',#');
          const len = scc.length;
          cy.$(ids).addClass(
            len > 1 ? 'highlight1Gradient' : 'highlight2Gradient'
          );
        });
        afterAnimCallback(cy);
      });
      addHistory('Find SCCs', sccAlgo);
    }
  };
  return sccBtn;
};

const addHistory = (actionName: string, sccAlgo: SCCAlgorithm) => {
  const historyContent: IHistoryContent[] = [];
  historyContent.push({
    label: 'Loop Count',
    value: sccAlgo.loopCounter.toString()
  });
  historyContent.push({
    label: 'Stack',
    value: `[${sccAlgo.postOrderStack
      .map(p => p.getVertexAsString())
      .join(', ')}]`
  });
  historyContent.push({
    label: 'Strongly Connected Components',
    value: `[<br/>${sccAlgo.SCCs.map(
      s => `&emsp;[ ${s.map(v => v.getVertexAsString()).join(', ')} ]`
    ).join(', <br/>')}<br/>]`
  });
  historyContent.push({
    label: 'Sequence IDs',
    value: `['${sccAlgo.sequenceIds
      .map(s => (typeof s === 'string' ? `${s}` : `{${s.id}}`))
      .join("', '")}']`
  });
  addHistoryContent(
    actionName,
    (document.getElementById('selGraph') as HTMLSelectElement).value,
    historyContent
  );
};
