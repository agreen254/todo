import { Todo } from "@/utils/types";
import TodoCardComplete from "./TodoCardComplete";
import TodoCardContextMenu from "./TodoCardContextMenu";
import TodoCardPin from "./TodoCardPin";

const CardActions = ({ t }: { t: Todo }) => {
  return (
    <span className="flex justify-end">
      <span>
        <TodoCardPin t={t} />
      </span>
      <span>
        <TodoCardComplete t={t} />
      </span>
      <span>
        <TodoCardContextMenu t={t} />
      </span>
    </span>
  );
};

export default CardActions;
