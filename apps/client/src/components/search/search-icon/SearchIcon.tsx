import styles from "./SearchIcon.module.css";
import { IoSearchSharp } from "react-icons/io5";

const SearchIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      aria-label="search"
      onClick={onClick}
      className={styles.search_icon__btn}
    >
      <IoSearchSharp
        title="searchIcon"
        size={"1.5rem"}
        className={styles.search_icon}
      />
    </button>
  );
};

export default SearchIcon;
