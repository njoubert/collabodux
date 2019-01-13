import {
  addTodo,
  loadState,
  removeUsers,
  setLongText,
  setSubtitle,
  setTitle,
  setTodoDone,
  setTodoLabel,
  setUserFocus,
  setUserName,
} from './actions';
import { fsaReducerBuilder } from './fsa-reducer-builder';
import { IModelState, ITodo, IUser } from './model';
import shallowequal from 'shallowequal';
import { EditDoc } from 'automerge';

export const reducer = fsaReducerBuilder<IModelState>()
  .add(loadState, (state) => {
    if (!state.todos) {
      state.todos = [];
    }
    if (!state.title) {
      state.title = '';
    }
    if (!state.subtitle) {
      state.subtitle = '';
    }
    if (!state.users) {
      state.users = {};
    }
  })
  .add(
    setTitle,
    (draft, { priorTitle, title }) => {
      draft.title = title;
    },
  )
  .add(
    setSubtitle,
    (draft, { priorSubtitle, subtitle }) => {
      draft.subtitle = subtitle;
    },
  )
  .add(
    setLongText,
    (draft, { priorText, text }) => {
      draft.longtext = text;
    },
  )
  .add(
    addTodo,
    (draft) => {
      const todo: ITodo = {
        label: '',
        done: false,
      };
      if (draft.todos) {
        draft.todos.push(todo);
      } else {
        draft.todos = [todo];
      }
    },
  )
  .add(
    setTodoLabel,
    (draft, { index, priorLabel, label }) => {
      if (draft.todos && draft.todos[index]) {
        draft.todos[index].label = label;
      }
    },
  )
  .add(
    setTodoDone,
    (draft, { index, done }) => {
      if (draft.todos && draft.todos[index]) {
        draft.todos[index].done = done;
      }
    },
  )
  .add(
    removeUsers,
    (draft, { users }) => {
      users.forEach((user) => {
        delete draft.users[user];
      });
    },
  )
  .add(
    setUserName,
    (draft, { session, priorUsername, username }) => {
      const user = ensureUser(draft, session);
      user.username = username;
    },
  )
  .add(
    setUserFocus,
    (draft, { session, focus, select }) => {
      const user = ensureUser(draft, session);
      user.focus = focus;
      if (!shallowequal(user.select, select)) {
        user.select = select;
      }
    },
  )
  .build();

function ensureUser(draft: EditDoc<IModelState>, session: string): EditDoc<IUser> {
  if (!draft.users[session]) {
    draft.users[session] = {
      username: '',
      focus: undefined,
      select: undefined,
    };
  }
  return draft.users[session];
}
