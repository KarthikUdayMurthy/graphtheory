export const arrowPosition = 'target-';
export const inActiveGradient = {
  'background-fill': 'linear-gradient',
  'background-gradient-stop-colors': '#393939 #7f7f7f',
  'background-gradient-stop-positions': '0%, 100%',
  'background-gradient-direction': 'to-right'
};
export const activeGradient = {
  'background-fill': 'linear-gradient',
  'background-gradient-stop-colors': '#26c6da #00acc1',
  'background-gradient-stop-positions': '0%, 100%',
  'background-gradient-direction': 'to-right'
};

export const highlight1Gradient = {
  'background-fill': 'linear-gradient',
  'background-gradient-stop-colors': '#ffa726 #fb8c00',
  'background-gradient-stop-positions': '0%, 100%',
  'background-gradient-direction': 'to-right'
};

export const highlight2Gradient = {
  'background-fill': 'linear-gradient',
  'background-gradient-stop-colors': '#ec407a #d81b60',
  'background-gradient-stop-positions': '0%, 100%',
  'background-gradient-direction': 'to-right'
};

export const inActiveNodeStyle = {
  ...inActiveGradient,
  color: '#000',
  'font-family': 'Open Sans',
  'font-weight': '600',
  'text-valign': 'top',
  'text-halign': 'center',
  ghost: 'yes',
  'ghost-offset-x': '1',
  'ghost-offset-y': '1',
  'ghost-opacity': 0.33,
  label: 'data(value)',
  'transition-property': 'border-width border-color shape',
  'transition-duration': '0.3s',
  'transition-timing-function': 'ease-in-out-cubic'
};

export const activeNodeStyle = {
  ...activeGradient
};

export const selectedNodeStyle = {
  'border-width': 4,
  'border-style': 'solid',
  'border-color': '#ffc107',
  'border-opacity': 1
};

export const inActiveEdgeStyle = {
  width: 2,
  'line-color': '#aaa',
  [arrowPosition + 'arrow-color']: '#aaa',
  'curve-style': 'bezier',
  'line-style': 'solid',
  'source-endpoint': 'outside-to-node-or-label',
  'target-endpoint': 'outside-to-node-or-label'
};

export const activeEdgeStyle = {
  'line-color': '#673ab7',
  [arrowPosition + 'arrow-color']: '#673ab7'
};

export const inActiveNodeAnimationColor = {
  'background-color': '#7f7f7f'
};

export const activeNodeAnimationColor = {
  'background-color': '#26c6da'
};

export const getBaseStyleSheetJSON = isDirected => {
  return [
    {
      selector: 'node',
      style: {
        ...inActiveNodeStyle
      }
    },
    {
      selector: 'node:selected',
      style: {
        ...selectedNodeStyle
      }
    },
    {
      selector: 'edge',
      style: {
        ...inActiveEdgeStyle,
        [arrowPosition + 'arrow-shape']: isDirected ? 'triangle' : 'none'
      }
    },
    {
      selector: '.activeEdgeStyle',
      style: {
        ...activeEdgeStyle
      }
    },
    {
      selector: '.activeNodeStyle',
      style: {
        ...activeNodeStyle
      }
    },
    {
      selector: '.highlight1Gradient',
      style: {
        ...highlight1Gradient
      }
    },
    {
      selector: '.highlight2Gradient',
      style: {
        ...highlight2Gradient
      }
    },
    {
      selector: '.stack',
      style: {
        shape: 'rectangle'
      }
    }
  ];
};
