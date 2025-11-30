import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter";
import fetchMutilDate from "./features/fetchMutilDate";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    fetchMutilDate: fetchMutilDate,
  },
});

export default store;