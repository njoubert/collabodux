import uuid from 'uuid/v4';

import { createMutatorFactory } from '../../dux/mutator';
import { ITodo, ModelStateType } from './model';
import { moveArrayItem } from '../../utils/array-move';

const createMutator = createMutatorFactory<ModelStateType>();

export const setTitle = createMutator<{
  title: string;
}>((draft, { title }) => {
  draft.title = title;
});

export const setSubtitle = createMutator<{
  subtitle: string;
}>((draft, { subtitle }) => {
  draft.subtitle = subtitle;
});

export const setLongText = createMutator<{
  text: string;
}>((draft, { text }) => {
  draft.longtext = text;
});

export const setTodoDone = createMutator<{
  index: number;
  done: boolean;
}>((draft, { index, done }) => {
  if (draft.todos && draft.todos[index]) {
    draft.todos[index].done = done;
  }
});

export const setTodoLabel = createMutator<{
  index: number;
  label: string;
}>((draft, { index, label }) => {
  if (draft.todos && draft.todos[index]) {
    draft.todos[index].label = label;
  }
});

export const moveTodo = createMutator<{
  index: number;
  newIndex: number;
}>(({ todos }, { index, newIndex }) => {
  moveArrayItem(todos, index, newIndex);
});

export const addTodo = createMutator<void>((draft) => {
  const todo: ITodo = {
    key: uuid(),
    label: '',
    done: false,
  };
  if (draft.todos) {
    draft.todos.push(todo);
  } else {
    draft.todos = [todo];
  }
});
