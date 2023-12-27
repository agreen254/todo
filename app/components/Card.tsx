import { DateTime } from "luxon";
import { Todo } from "../types";

const Card = ({ t }: { t: Todo }) => {
  const timeRemaining = DateTime.now().diff(t.createdAt, "days");
  const handleDueColor = () => {
    if (timeRemaining.days > 5) {
      return "text-green-500";
    } else if (timeRemaining.days > 1) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  };

  return (
    <div className="my-6 border-2 rounded-sm border-blue-500">
      <h2>{t.name}</h2>
      <p>{t.description}</p>
      {t.tags.map((tag) => (
        <p key={t.id + tag}>{tag}</p>
      ))}
      <p className={handleDueColor()}>Sample Due Date</p>
    </div>
  );
};

export default Card;
