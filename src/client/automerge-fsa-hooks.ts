import { Action, ActionCreator } from 'typescript-fsa';
import { Automerger } from './automerger';

type ActionProposer<Payload> = Payload extends void
  ? () => void
  : (action: Payload) => void;

export function usePropose<
  State,
  BaseAction,
  Payload,
  TAction extends BaseAction & Action<Payload>
>(
  automerger: Automerger<State, BaseAction>,
  actionCreator: ActionCreator<Payload>,
) {
  return ((payload: Payload) => {
    automerger.propose(actionCreator(payload) as TAction);
  }) as ActionProposer<Payload>;
}
