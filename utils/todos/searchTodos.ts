import { format } from "date-fns";
import parseDate from "../parseDate";
import { Todo } from "../types";

export default function searchTodos(query: string, todos: Todo[]): Todo[] {
  if (query === "") return todos;
  const processedQuery = query.toLowerCase().trim();

  const isValidName = (t: Todo) =>
    t.name.toLowerCase().includes(processedQuery);
  const isValidDescription = (t: Todo) =>
    t.description?.toLowerCase().includes(processedQuery);
  const isValidDate = (t: Todo) => {
    if (!t.dueAt) return false;
    const formatSpec = (date: string, spec: string) => {
      return format(new Date(date), spec)
        .toLowerCase()
        .includes(processedQuery);
    };
    const parsedDate = parseDate(t.dueAt)
      .str.toLowerCase()
      .includes(processedQuery);
    const formattedNumerals = formatSpec(t.dueAt, "P");
    const formattedShort = formatSpec(t.dueAt, "PP");
    const formattedMedium = formatSpec(t.dueAt, "MMM do");
    const formattedLong = formatSpec(t.dueAt, "PPPP");
    const formattedTimeTwelve = formatSpec(t.dueAt, "p");
    const formattedTimeTwentyFour = formatSpec(t.dueAt, "kk:mm");
    return (
      parsedDate ||
      formattedNumerals ||
      formattedShort ||
      formattedMedium ||
      formattedLong ||
      formattedTimeTwelve ||
      formattedTimeTwentyFour
    );
  };

  const nameMatches: Todo[] = [];
  const descriptionMatches: Todo[] = [];
  const dateMatches: Todo[] = [];
  for (let i = 0; i < todos.length; i++) {
    const current = todos[i];
    if (isValidName(current)) nameMatches.push(current);
    else if (isValidDescription(current)) descriptionMatches.push(current);
    else if (isValidDate(current)) dateMatches.push(current);
  }

  return [...nameMatches, ...descriptionMatches, ...dateMatches];
}
