import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commitAPI from '../services/api/commit';

export const fetchCommitList = createAsyncThunk(
  'commits/fetchCommitList',
  async ({ page = 1, repositoryId = '', authorEmail = '' }) => {
    const response = await commitAPI.listCommits({
      page,
      repositoryId,
      authorEmail,
    });
    return response.data;
  }
);

const initialState = {
  commits: [],
  commitCount: 0,
  filters: {
    authorEmail: '',
    repositoryId: '',
  },
  currentPageNumber: 1,
  prevPage: null,
  nextPage: null,
};

const commitsSlice = createSlice({
  name: 'commits',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCommitList.fulfilled, (state, action) => ({
      ...state,
      commits: action.payload.results,
      commitCount: action.payload.count,
      prevPage: action.payload.previous,
      nextPage: action.payload.next,
    }));
  },
});

export default commitsSlice.reducer;
