"use client";

import { useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import Loader from "../common/Loader";

const SearchInput = ({
  onSearch,
  isLoading = false,
}: {
  onSearch: any;
  isLoading?: boolean;
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    emitSearch();
  }, [searchInput]);

  const emitSearch = () => {
    onSearch(searchInput);
  };

  const handleChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handlePress = (e: any) => {
    if (e.key === "Enter") {
      emitSearch();
    }
  };

  const handleInputFocus = (e: any) => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = (e: any) => {
    setSearchInput("");
    if (searchInputRef.current) searchInputRef.current?.blur();
  };

  return (
    <div className="relative w-[80%] h-[40px] text-white rounded-[10px]">
      <input
        ref={searchInputRef}
        className="relative w-[100%] h-[100%] bg-secondary-dark text-white outline-none pl-10 pr-8 rounded-[10px]
                            border-transparent border-2 focus:border-tertiary-dark hover:border-2 "
        type="text"
        onChange={handleChange}
        placeholder="Search"
        value={searchInput}
        onKeyDown={handlePress}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
      />
      {isFocused ? (
        !isLoading ? (
          <XMarkIcon
            onClick={handleClear}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute top-2 right-0 h-6 w-6 text-gray-500 cursor-pointer mr-2"
          />
        ) : (
          <div className="absolute top-2 right-0 h-6 w-6 text-gray-500 cursor-pointer mr-1 ">
            <Loader />
          </div>
        )
      ) : null}
      <MagnifyingGlassIcon
        onClick={handleClear}
        className="absolute top-2 left-0 h-6 w-6 text-gray-500 cursor-pointer ml-2"
      />
    </div>
  );
};

export default SearchInput;
