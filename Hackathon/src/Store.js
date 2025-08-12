// import { create } from "zustand";

// const AppStore = (set, get) => ({
//   userId:"",
//   setUserId:(Id) => set({userId : Id })
// });

// const useAppStore = create(AppStore);

// export default useAppStore;

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

 const useAppStore = create()(
  persist(
    (set) => ({
        userId:"",
        setUserId:(Id) => set({userId : Id })
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
    },
  ),
)
export default useAppStore