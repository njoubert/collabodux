import { useMappedLocalState, useSessions } from '../client/automerge-hooks';
import { IModelState, IUser } from './model';
import { Automerger } from '../client/automerger';

export function useUserMap<Action, Patch>(
  automerger: Automerger<IModelState, Action>,
): Record<string, IUser> {
  const sessions = useSessions(automerger);
  const users = useMappedLocalState(automerger, ({ users }) => users);
  const map: Record<string, IUser> = {};
  for (const session of sessions) {
    map[session] = users[session] || {};
  }
  return map;
}
