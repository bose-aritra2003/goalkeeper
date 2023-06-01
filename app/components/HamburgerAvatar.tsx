'use client';

import { Menu, Transition } from '@headlessui/react';
import Avatar from "@/app/components/Avatar";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { HiUserCircle, HiHome, HiArrowLeftCircle } from "react-icons/hi2";
import useUserImageStore from "@/app/store/UserImageStore";
import {useEffect} from "react";

export const HamburgerAvatar = ({ image }: { image: string | null | undefined }) => {
  const router = useRouter();
  const setUserImage = useUserImageStore((state) => state.setUserImage);

  useEffect(() => {
    setUserImage(image);
  }, [setUserImage]);

  const handleUpload = async (result: any) => {
    try {
      await fetch(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: result?.info?.secure_url,
        }),
      });
      toast.success('Profile picture updated');
      setUserImage(result?.info?.secure_url);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }

  return (
    <Menu as="div" className="relative text-right">
      {({open}) => (
        <div>
          <Menu.Button
            className="bg-transparent w-full rounded-full transition-all ease-in-out"
          >
            <Avatar />
          </Menu.Button>
          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-blue-100 rounded-lg bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

              <div className="p-1.5">
                <Menu.Item>
                  <button
                    onClick={() => router.push('/')}
                    className="text-gray-900 hover:bg-blue-100 hover:text-gray-900 group flex w-full items-center justify-between rounded-md p-1.5 cursor-pointer"
                  >
                    <HiHome size={20} className="text-blue-900"/>
                    <p>Home</p>
                  </button>
                </Menu.Item>
              </div>

              <div className="p-1.5">
                <Menu.Item>
                  <button className="text-gray-900 hover:bg-blue-100 hover:text-gray-900 group items-center rounded-md p-1.5 cursor-pointer">
                    <CldUploadButton
                      options={{ maxFiles: 1 }}
                      onUpload={ handleUpload }
                      uploadPreset="s16ksfrg"
                    >
                      <div className="flex w-[88px] justify-between items-center">
                        <HiUserCircle size={20} className="text-blue-900"/>
                        <p>Photo</p>
                      </div>
                    </CldUploadButton>
                  </button>
                </Menu.Item>
              </div>

              <div className="p-1.5">
                <Menu.Item>
                  <div
                    onClick={async () => await signOut()}
                    className="text-gray-900 hover:bg-blue-100 hover:text-gray-900 group flex w-full items-center justify-between rounded-md p-1.5 cursor-pointer"
                  >
                    <HiArrowLeftCircle size={20} className="text-blue-900"/>
                    <p>Logout</p>
                  </div>
                </Menu.Item>
              </div>

            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
}
export default HamburgerAvatar;