import { create } from "zustand";

interface UserImageState {
  userImage: string | null;
  setUserImage: (image: string | null | undefined) => void;
}

const useUserImageStore = create<UserImageState>()((set) => ({
  userImage: null,
  setUserImage: (image) => set({ userImage: image }),
}));
export default useUserImageStore;