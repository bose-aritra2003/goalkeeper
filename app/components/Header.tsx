'use client';

import Brand from "@/app/components/Brand";
import Summary from "@/app/components/Summary";
import Search from "@/app/components/Search";
import TimePicker from "@/app/components/TimePicker";
import HamburgerAvatar from "@/app/components/HamburgerAvatar";

const Header = ({ image }: { image: string | null | undefined }) => {

  return (
    <header className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row items-center p-5 bg-gray-500/10 backdrop-blur-sm shadow-sm">
        <Brand priority />
        <div className="flex items-center space-x-3 flex-1 justify-center lg:justify-end w-full">
          <TimePicker />
          <Search />
          <HamburgerAvatar image={image}/>
        </div>
      </div>
      <Summary />
    </header>
  );
}
export default Header;