import { getOriginalGraph, airports } from './airport.graph';
import {
  animSequence,
  setCy,
  clearAllStyles,
  IlogicBtn,
  addLogicButtons
} from '../../../extras/cyUtil';
import * as logicBtns from '../../../extras/logicButtons';

const afterAnimCallback = cy => {};

export function loadGraph() {
  const graph = getOriginalGraph();
  const cy = setCy(graph);
  const allBtns: IlogicBtn[] = [];
  allBtns.push(logicBtns.getReloadBtn(loadGraph));
  allBtns.push(logicBtns.getDfsBtn(graph, afterAnimCallback));
  allBtns.push(logicBtns.getDfsrBtn(graph, afterAnimCallback));
  allBtns.push(logicBtns.getBfsBtn(graph, afterAnimCallback));
  allBtns.push(logicBtns.getBfsrBtn(graph, afterAnimCallback));
  allBtns.push(logicBtns.getBfsPathBtn(graph, afterAnimCallback));
  allBtns.push(logicBtns.getSCCBtn(graph, afterAnimCallback, cy));
  allBtns.push(logicBtns.getMinEdgeToReachAllBtn(graph, afterAnimCallback));
  addLogicButtons(cy, allBtns);
  return cy;
}
