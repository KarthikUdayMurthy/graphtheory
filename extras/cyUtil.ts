import cytoscape from './cytoscape.min';
import { Graph } from '../src/graph';
import { getBaseStyleSheetJSON, arrowPosition } from './cyStyles';

export * from './cyAnim';

function getEles(graph) {
  const eles = [];
  graph.vertices.forEach(data => eles.push({ data }));
  graph.edges.forEach(edge => {
    const {
      id,
      source: { id: source },
      target: { id: target },
      weight
    } = edge;
    eles.push({ data: { id, source, target, weight } });
  });
  return eles;
}

export function setCy(graph: Graph) {
  const container = document.getElementById('cy');
  container.innerHTML = '';

  const baseStyles = getBaseStyleSheetJSON(graph.isDirected);

  const cy = cytoscape({
    container,

    elements: getEles(graph),

    selectionType: 'additive',
    // wheelSensitivity: 0.33,

    style: baseStyles,

    layout: {
      name: 'cose',

      // Called on `layoutready`
      ready: function() {},

      // Called on `layoutstop`
      stop: function() {},

      // Whether to animate while running the layout
      // true : Animate continuously as the layout is running
      // false : Just show the end result
      // 'end' : Animate with the end result, from the initial positions to the end positions
      animate: false,

      // Easing of the animation for animate:'end'
      animationEasing: 'ease-out',

      // The duration of the animation for animate:'end'
      animationDuration: undefined,

      // A function that determines whether the node should be animated
      // All nodes animated by default on animate enabled
      // Non-animated nodes are positioned immediately when the layout starts
      animateFilter: function(node, i) {
        return true;
      },

      // The layout animates only after this many milliseconds for animate:true
      // (prevents flashing on fast runs)
      animationThreshold: 250,

      // Number of iterations between consecutive screen positions update
      refresh: 0,

      // Whether to fit the network view after when done
      fit: true,

      // Padding on fit
      padding: 0,

      // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      boundingBox: undefined,

      // Excludes the label when calculating node bounding boxes for the layout algorithm
      nodeDimensionsIncludeLabels: false,

      // Randomize the initial positions of the nodes (true) or use existing positions (false)
      randomize: false,

      // Extra spacing between components in non-compound graphs
      componentSpacing: 40,

      // Node repulsion (non overlapping) multiplier
      nodeRepulsion: function(node) {
        return 2048;
      },

      // Node repulsion (overlapping) multiplier
      nodeOverlap: 4,

      // Ideal edge (non nested) length
      idealEdgeLength: function(edge) {
        return 32;
      },

      // Divisor to compute edge forces
      edgeElasticity: function(edge) {
        return 32;
      },

      // Nesting factor (multiplier) to compute ideal edge length for nested edges
      nestingFactor: 1.2,

      // Gravity force (constant)
      gravity: 1,

      // Maximum number of iterations to perform
      numIter: 1000,

      // Initial temperature (maximum node displacement)
      initialTemp: 1000,

      // Cooling factor (how the temperature is reduced between consecutive iterations
      coolingFactor: 0.99,

      // Lower temperature threshold (below this point the layout will end)
      minTemp: 1.0
    }
  });

  addLogicButtons(cy);
  return cy;
}

export function clearAllStyles(cy, clearQueue: boolean = true) {
  const eles = cy.elements();
  eles.forEach(ele => {
    clearQueue && ele.clearQueue();
    ele.removeStyle();
    ele.classes([]);
  });
}

export interface IlogicBtn {
  text: string;
  onClick: (cy, e) => any;
  classNames?: string;
}

export function addLogicButtons(cy, btns: IlogicBtn[] = []) {
  const btnsPanel = document.getElementById('btnsPanel');
  btnsPanel.innerHTML = '';

  const fitBtn: IlogicBtn = {
    text: 'Fit',
    onClick: cy => {
      cy.center();
      cy.fit();
    }
  };

  btns.unshift(fitBtn);

  btns.forEach(btn => {
    const btnElement = document.createElement('button');
    btnElement.appendChild(document.createTextNode(btn.text));
    btnElement.addEventListener('click', e => {
      btn.onClick(cy, e);
    });
    btnsPanel.appendChild(btnElement);
  });

  setTimeout(() => {
    cy.center();
    cy.fit();
  }, 1000);
}

export function reverseAllEdges(cy, copyOldStyles: boolean = false) {
  cy.edges().forEach(edge => {
    const id = edge.id();
    const source = edge.target().id();
    const target = edge.source().id();
    const weight = edge.data('weight');
    const classes = edge.classes();
    const styleLc = edge.style('line-color');
    const styleAc = edge.style(arrowPosition + 'arrow-color');
    edge.remove();
    const newEdge = cy.add({
      data: {
        id,
        source,
        target,
        weight
      }
    });

    if (copyOldStyles) {
      newEdge.classes(classes);
      newEdge.style({
        'line-color': styleLc,
        [arrowPosition + 'arrow-color']: styleAc
      });
    }
  });
}

export { getBaseStyleSheetJSON };
