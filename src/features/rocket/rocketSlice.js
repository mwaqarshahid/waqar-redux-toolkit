/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rocketItems: [],
  isLoading: true,
};

export const getRocketItems = createAsyncThunk(
  'rocket/getRocketItems',
  async (filter) => {
    const query = {};
    if (filter.date) {
      const date = new Date();
      const toDate = date.toISOString();
      if (filter.date === 'week') {
        date.setHours(-(24 * 7)); // day * 7 = week
      } else if (filter.date === 'month') {
        date.setHours(-(24 * 30)); // day * 30 = month
      } else if (filter.date === 'year') {
        date.setHours(-(24 * 365)); // full year
      }
      query.date_utc = {
        $gte: toDate,
        $lte: date.toISOString(),
      };
    }
    if (filter.launchStatus) {
      query.success = filter.launchStatus === 'success' ? true : false;
    }
    if (filter.upcomingStatus) {
      query.upcoming = filter.upcomingStatus;
    }
    if (filter.search) {
      query.$text = {
        $search: filter.search,
      };
    }
    try {
      const hasFilter = Object.keys(query).length > 0;
      const finalUrl = process.env.REACT_APP_URL + (hasFilter ? '/query' : '');
      const getQuery = hasFilter ? axios.post : axios.get;
      const resp = await getQuery(finalUrl, {
        query,
      });
      const data = resp.data.docs ?? resp.data;
      return data;
    } catch (error) {
      return error;
    }
  },
);

const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRocketItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRocketItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rocketItems = action.payload;
      })
      .addCase(getRocketItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default rocketSlice.reducer;
