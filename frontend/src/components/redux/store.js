import { configureStore } from '@reduxjs/toolkit'
import companySlice from './slice/companySlice'
import userSlice from './slice/userSlice'
// redux store
export const store = configureStore({
  reducer: {
      userSlice:userSlice.reducer,companySlice:companySlice.reducer
  },
})