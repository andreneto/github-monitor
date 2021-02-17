import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import repositoryAPI from '../services/api/repository';

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async () => {
    const response = await repositoryAPI.listRepositories();
    return response.data;
  }
);

export const addRepository = createAsyncThunk(
  'repositories/addRepository',
  async (fullName) => {
    const response = await repositoryAPI.addRepository(fullName);
    return response.data;
  }
);

export const fetchCommitsFromRepository = createAsyncThunk(
  'repositories/fetchCommitsFromRepository',
  async (repositoryId) => {
    const response = await repositoryAPI.listCommitsFromRepository(
      repositoryId
    );
    return response.data;
  }
);

const initialState = {
  repositories: [],
  commits: [],
  successMessage: false,
};

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.fulfilled, (state, action) => ({
        ...state,
        repositories: action.payload,
      }))
      .addCase(addRepository.fulfilled, (state, action) => ({
        ...state,
        repositories: [...state.repositories, action.payload],
      }))
      .addCase(fetchCommitsFromRepository.fulfilled, (state, action) => ({
        ...state,
        commits: action.payload,
      }));
  },
});

export default repositoriesSlice.reducer;
