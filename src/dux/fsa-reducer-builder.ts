import { Action, ActionCreator } from 'typescript-fsa';
import { Reducer } from '../client/automerger';
import { EditDoc } from 'automerge';

export type ActionPayloadHandler<State, Payload> = (
  state: EditDoc<State>,
  payload: Payload,
  action: Action<Payload>,
) => void;

export interface FsaReducerBuilder<State> {
  add<Payload extends any>(
    actionCreator: ActionCreator<Payload>,
    actionHandler: ActionPayloadHandler<State, Payload>,
  ): FsaReducerBuilder<State>;

  build(): Reducer<State, Action<any>>;
}

export function fsaReducerBuilder<State>(): FsaReducerBuilder<State> {
  const map = new Map<string, ActionPayloadHandler<State, any>>();
  return {
    add<Payload extends any>(
      actionCreator: ActionCreator<Payload>,
      actionHandler: ActionPayloadHandler<State, Payload>,
    ) {
      map.set(actionCreator.type, actionHandler);
      return this;
    },
    build(): Reducer<State, Action<any>> {
      return (state, action) => {
        const handler = map.get(action.type);
        if (handler) {
          handler(state, action.payload, action);
        }
      };
    },
  };
}
