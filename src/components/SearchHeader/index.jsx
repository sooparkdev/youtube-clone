import styles from "./SearchHeader.module.css";
import React from "react";
import logo from "../../assets/youtubeLogo.svg";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";

export default function SearchHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 900);
  const [showMobileSearchBox, setShowMobileSearchBox] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
        setShowMobileSearchBox(false);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.query.value;
    navigate(`/results?query=${inputValue}`);
  };

  useEffect(() => {
    if (location.search) {
      const queryParams = new URLSearchParams(location.search);
      setSearchText(queryParams.get("query") || "");
    } else {
      setSearchText("");
    }
  }, [location.search]);

  return (
    <header className={styles.headerContainer}>
      {!showMobileSearchBox && (
        <Link to="/">
          <img src={logo} alt="Icon" className={styles.brandLogo} />
        </Link>
      )}
      {isMobileView && showMobileSearchBox && (
        <button
          onClick={() => {
            setShowMobileSearchBox(false);
          }}
          className={`${styles.btn} ${styles.btnMobileBack}`}
        >
          <IoArrowBackOutline size={28} />
        </button>
      )}
      {(!isMobileView || showMobileSearchBox) && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="query"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className={styles.searchInputBox}
          />
          <button type="submit" className={`${styles.btn} ${styles.btnSearch}`}>
            <AiOutlineSearch size={28} />
          </button>
        </form>
      )}
      {isMobileView && !showMobileSearchBox && (
        <button
          type="submit"
          onClick={() => {
            setShowMobileSearchBox(true);
          }}
          className={`${styles.btn} ${styles.btnMobileSearch}`}
        >
          <AiOutlineSearch size={28} />
        </button>
      )}
    </header>
  );
}
