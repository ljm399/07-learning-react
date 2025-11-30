import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchMutilDataAction = createAsyncThunk('fetchMutilDataAction', async (extraInfo, { dispatch, getState} ) => {
  const res = await axios.get('http://123.207.32.32:8000/home/multidata')
  // return res.data

  //方式二: 拿到数据直接就地获取与处理,不用 extraReducers
  const banners = res.data.banner.list;
  const recommends = res.data.data.recommend.list;
  dispatch(fetchBannersAction(banners));
  dispatch(fetchRecommendsAction(recommends));

}) // 第一个参数是action的名称，第二个参数是异步请求的函数

const fetchMutilDataSlice = createSlice({
  name: 'fetchMutilData',
  initialState: {    
    banners: [],
    recommends: []
  },
  reducers: {
    fetchBannersAction(state, { payload }) {
      state.banners = payload;
    },
    fetchRecommendsAction(state, { payload }) {
      state.recommends = payload;
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchMutilDataAction.pending, (state, action) => {
  //       console.log("pending")
  //     })
  //     .addCase(fetchMutilDataAction.fulfilled, (state, action) => {
  //       console.log("fulfilled")
  //       state.banners = action.payload.data.banner.list;
  //       state.recommends = action.payload.data.recommend.list;
  //     })
  //     .addCase(fetchMutilDataAction.rejected, (state, action) => {
  //       console.log("rejected")
  //     })
  // }
  // extraReducers: {
  //   [fetchMutilDataAction.pending]: (state, { payload }) => {
  //     console.log("pending")
  //   },
  //   [fetchMutilDataAction.fulfilled]: (state, { payload }) => {
  //     console.log("fulfilled")
  //     state.banners = payload.data.banner.list;
  //     state.recommends = payload.data.recommend.list;
  //   },
  //   [fetchMutilDataAction.rejected]: (state, { payload }) => {
  //     console.log("rejected")
  //   }
  // }
})

export const { fetchBannersAction, fetchRecommendsAction } = fetchMutilDataSlice.actions;
export default fetchMutilDataSlice.reducer;