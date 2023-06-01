'use client';
import Image from "next/image";
import useUserImageStore from "@/app/store/UserImageStore";

const Avatar = () => {
  const currentUserImage = useUserImageStore((state) => state.userImage);

  return (
    <div className="h-10 w-10">
      <Image
        width={40}
        height={40}
        src= {currentUserImage || "/images/profile-placeholder.svg"}
        alt="avatar"
        className="rounded-full object-cover h-10 w-10"
      />
    </div>

  );
}
export default Avatar;