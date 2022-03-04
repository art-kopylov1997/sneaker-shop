import styles from "./SearchInput.module.scss";
import { RemoveIcon } from "../../icons/RemoveIcon";

function SearchInput({ searchValue, setSearchValue, onChangeSearchInput }) {
  return (
    <div className={styles.root}>
      <img src="../assets/icons/search.svg" alt="Search" />
      <input
        onChange={onChangeSearchInput}
        placeholder="Поиск..."
        value={searchValue}
      />
      {searchValue && (
        <span
          className={styles.wrapperButtonRemove}
          onClick={() => setSearchValue("")}
        >
          <RemoveIcon />
        </span>
      )}
    </div>
  );
}

export default SearchInput;
