import { Edge, Graph, Vertex } from '../../graph';

export const airports = [
  'BGI',
  'BUD',
  'CDG',
  'DEL',
  'DOH',
  'DSM',
  'EWR',
  'EYW',
  'HND',
  'ICN',
  'JFK',
  'LGA',
  'LHR',
  'ORD',
  'SAN',
  'SFO',
  'SIN',
  'TLV'
];
const routes = [
  ['DSM', 'ORD'],
  ['ORD', 'BGI'],
  ['BGI', 'LGA'],
  ['SIN', 'CDG'],
  ['CDG', 'SIN'],
  ['CDG', 'BUD'],
  ['DEL', 'DOH'],
  ['DEL', 'CDG'],
  ['TLV', 'DEL'],
  ['EWR', 'HND'],
  ['HND', 'ICN'],
  ['HND', 'JFK'],
  ['ICN', 'JFK'],
  ['JFK', 'LGA'],
  ['EYW', 'LHR'],
  ['LHR', 'SFO'],
  ['SFO', 'SAN'],
  ['SFO', 'DSM'],
  ['SAN', 'EYW']

  // ['LGA', 'TLV'],
  // ['LGA', 'EYW'],
  // ['LGA', 'EWR']
];

const graph = new Graph(true);

airports.forEach(airport => graph.addVertex(new Vertex(airport, airport)));

routes.forEach(route =>
  graph.addEdge(
    new Edge(
      graph.nextId(),
      new Vertex(route[0], route[0]),
      new Vertex(route[1], route[1])
    )
  )
);

export { graph };
