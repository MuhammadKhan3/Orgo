import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
// redux store
export const store = configureStore({
  reducer: {
      userSlice:userSlice.reducer
  },
})