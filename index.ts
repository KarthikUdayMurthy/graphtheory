// Import stylesheets
import './style.css';

import * as testGraphs from './src/testGraphs';

// Write TypeScript code!

let selectedNodeIds = [];
let maxSelection = 2;

function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(fn, 1);
    });
  }
}

function init() {
  setTimeout(onGraphChange, 500);
  document.getElementById('selGraph').addEventListener('change', onGraphChange);

  const btnsPanelTrigger = document.getElementById('btnsPanelTrigger');
  const btnsPanel = document.getElementById('btnsPanel');
  btnsPanel.style.display = 'none';
  btnsPanelTrigger.addEventListener('click', toggleMenu);
  btnsPanel.addEventListener('click', onMenuItemClick);
  document.body.addEventListener('click', dismissMenuWhenClickedOutside);

  const historyWrap = document.getElementById('historyWrap');

  document.getElementById('historyBtn').addEventListener('click', () => {
    historyWrap.style.display = 'flex';
    setTimeout(() => {
      document.getElementById('historyModal').scrollTop = 0;
    }, 1);
  });
  document.getElementById('historyClose').addEventListener('click', () => {
    historyWrap.style.display = 'none';
  });
}

docReady(init);

function onGraphChange() {
  document.getElementById('selectedActionName').innerHTML = '';
  document.getElementById('animControls').style.display = 'none';
  const selGraph = document.getElementById('selGraph') as HTMLSelectElement;
  selGraph.disabled = true;
  setTimeout(() => {
    selGraph.disabled = false;
  }, 1000);
  const graphModuleName = selGraph.value || 'demo';
  const cy = testGraphs[graphModuleName].loadGraph();
  setEventListeners(cy);
}

export function setEventListeners(cy) {
  selectedNodeIds = [];
  cy.nodes().on('select', e => {
    if (selectedNodeIds.length >= maxSelection) {
      selectedNodeIds.forEach(selId => cy.$(`#${selId}`).unselect());
    }
    selectedNodeIds.push(e.target.id());
  });

  cy.nodes().on('unselect', e => {
    selectedNodeIds = selectedNodeIds.filter(selId => selId !== e.target.id());
  });
}

export function getSelectedNodeIds() {
  return selectedNodeIds;
}

export function setMaxSelection(num: number) {
  maxSelection = num;
}

export function toggleMenu() {
  const btnsPanel = document.getElementById('btnsPanel');
  if (btnsPanel.style.display === 'none') {
    btnsPanel.style.display = 'flex';
  } else {
    btnsPanel.style.display = 'none';
  }
}

export interface IHistoryContent {
  label: string;
  value: string;
}

export function addHistoryContent(
  actionName: string,
  graphName: string,
  historyContent: IHistoryContent[] = []
) {
  const timeStamp = new Date().toTimeString().split(' ')[0];
  const hdrText = `${timeStamp} - ${graphName}`;
  historyContent.unshift({ label: 'Action', value: actionName });

  const hcDiv = document.createElement('div');
  hcDiv.setAttribute('class', 'historyContent');

  const hdr = document.createElement('h1');
  hdr.appendChild(document.createTextNode(hdrText));
  hcDiv.appendChild(hdr);

  historyContent.forEach(({ label, value }) => {
    const l = document.createElement('label');
    l.appendChild(document.createTextNode(label));
    const s = document.createElement('span');
    s.innerHTML = value;
    hcDiv.appendChild(l);
    hcDiv.appendChild(s);
  });

  document.getElementById('historyModal').prepend(hcDiv);
  document.getElementById('noHistory').style.display = 'none';
}

function onMenuItemClick(e) {
  const btnsPanel = document.getElementById('btnsPanel');
  const selectedActionName = document.getElementById('selectedActionName');
  btnsPanel.style.display = 'none';
  selectedActionName.innerHTML = (e.target as HTMLButtonElement).innerHTML;
}

function dismissMenuWhenClickedOutside(e) {
  const btnsPanel = document.getElementById('btnsPanel');
  if (
    !e.target.matches('#btnsPanelTrigger') &&
    (!e.target.matches('#btnsPanel') &&
      !e.target.matches('#selectedActionName'))
  ) {
    btnsPanel.style.display = 'none';
  }
}
