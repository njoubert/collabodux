import { Connection } from '../client/ws';
import { reducer } from './reducer';
import { loadState } from './actions';
import { Automerger } from '../client/automerger';

export const connection = new Connection(
  new WebSocket(`ws://${location.hostname}:4000`),
  // new WebSocket(`wss://collabodux1.now.sh:443`),
);

export const automerger = new Automerger(
  connection,
  loadState,
  reducer,
);
