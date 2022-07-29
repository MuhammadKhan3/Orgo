import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './slice/chatSlice'
import companySlice from './slice/companySlice'
import jobSlice from './slice/jobSlice'
import userSlice from './slice/userSlice'
// redux store
export const store = configureStore({
  reducer: {
      userSlice:userSlice.reducer,companySlice:companySlice.reducer,jobSlice:jobSlice.reducer,chatSlice:chatSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})