import { useRef } from "react";
import styles from "./SearchBar.module.css";
import { IoArrowBack, IoSearchSharp } from "react-icons/io5";

const SearchBar = ({ onBack }: { onBack?: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusOnInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      {onBack && (
        <button className={styles.back_btn} onClick={onBack}>
          <IoArrowBack size={"1.5rem"} />
        </button>
      )}
      <div className={styles.search__container}>
        <button
          aria-label="search"
          onClick={focusOnInput}
          className={styles.search_icon__btn}
        >
          <IoSearchSharp
            title="searchBar"
            size={"1.5rem"}
            className={styles.search_icon}
          />
        </button>
        <div className={styles.search_input__box}>
          <input
            ref={inputRef}
            className={styles.search__input}
            type="search"
            id="search"
            placeholder="Search Files"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
