import styles from "./Navbar.module.css";
import Profile from "../profile/Profile";
import SearchBar from "../search/search-bar/SearchBar";
import SearchIcon from "../search/search-icon/SearchIcon";
import UploadBtn from "../upload-btn/UploadBtn";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isWide, setIsWide] = useState(false);
  const [showOverlaySearchBar, setShowOverlaySearchBar] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsWide(window.innerWidth >= 480);
    checkWidth();

    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const handleSearchIconClick = () => {
    setShowOverlaySearchBar(true);
  };

  const handleBack = () => {
    setShowOverlaySearchBar(false);
  };

  return (
    <nav className={styles.navbar}>
      {showOverlaySearchBar && !isWide && (
        <div className={styles.search_overlay}>
          <SearchBar onBack={handleBack} />
        </div>
      )}
      <img
        className={styles.logo__img}
        src="src/assets/photo-gallery-high-resolution-logo-transparent-cropped.svg"
        alt="Photo_Gallery_logo"
      />
      <div className={styles.tab_btns_container}>
        {isWide ? (
          <div className={styles.search_bar_box}>
            <SearchBar />
          </div>
        ) : (
          <SearchIcon onClick={handleSearchIconClick} />
        )}
        <UploadBtn />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
