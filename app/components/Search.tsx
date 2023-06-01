'use client';

import { HiMagnifyingGlass } from "react-icons/hi2";
import useBoardStore from "@/app/store/BoardStore";

const Search = () => {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  return (
    <form className="flex w-1/2 sm:w-fit items-center space-x-2 bg-white/90 rounded-lg p-2 shadow-md flex-1 md:flex-initial">
      <HiMagnifyingGlass size={32} className="h-4 text-gray-400"/>
      <input
        type="text"
        placeholder="Search tasks"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className="flex-1 outline-none bg-transparent"
      />
      <button type="submit" hidden>Search</button>
    </form>
  );
}
export default Search;