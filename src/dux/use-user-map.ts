import { useMappedLocalState, useSessions } from '../client/collabodux-hooks';
import { IModelState, IUser } from './model';
import { Collabodux } from '../client/collabodux';

export function useUserMap<Action>(
  collabodux: Collabodux<IModelState, Action>,
): Record<string, IUser> {
  const sessions = useSessions(collabodux);
  const users = useMappedLocalState(collabodux, ({ users }) => users);
  const map: Record<string, IUser> = {};
  for (const session of sessions) {
    map[session] = users[session] || {};
  }
  return map;
}
