import { todoSortPossibilities } from "@/utils/todoTypes";

const SortMenu = () => {
  return (
    <div>
      {todoSortPossibilities.map((p) => (
        <p>{p}</p>
      ))}
    </div>
  );
};

export default SortMenu;
