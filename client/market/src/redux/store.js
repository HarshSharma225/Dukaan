import {configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import productReducer from "./productSlice"
import userReducer from "./userSlice"

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user"] // only persist user slice
// };
// const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        // user: persistedUserReducer,
        product: productReducer,
        user: userReducer
    },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [
    //       "persist/PERSIST",
    //       "persist/REHYDRATE",
    //       "persist/PAUSE",
    //       "persist/FLUSH",
    //       "persist/PURGE",
    //       "persist/REGISTER"
    //     ]
    //   }
    // })
})

// export const persistor = persistStore(store);

export default store;