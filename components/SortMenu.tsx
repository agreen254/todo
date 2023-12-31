import { sortingMap } from "@/utils/maps";
import { todoSortPossibilities } from "@/utils/types";

const SortMenu = () => {
  return (
    <div>
      {todoSortPossibilities.map((ele) => (
        <p key={ele}>{sortingMap.get(ele) || ele}</p>
      ))}
    </div>
  );
};

export default SortMenu;
