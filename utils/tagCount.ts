import { Todo } from "./types";

export default function tagCount(todos: Todo[], name: string) {
  // tags of one todo
  function todoTags(todo: Todo) {
    const tags = todo.tags;
    if (!tags) {
      return [];
    } else {
      return tags.reduce((names: string[], tag) => {
        return [...names, tag.name];
      }, []);
    }
  }

  // tags of all todos
  function allTagNames(todos: Todo[]) {
    return todos.reduce((names: string[], t) => {
      return [...names, ...todoTags(t)];
    }, []);
  }

  const names = allTagNames(todos);
  return names.filter((n) => n === name).length;
}
