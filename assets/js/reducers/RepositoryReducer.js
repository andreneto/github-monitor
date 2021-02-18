import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import repositoryAPI from '../services/api/repository';

export const fetchRepositoryList = createAsyncThunk(
  'repositories/fetchRepositoryList',
  async () => {
    const response = await repositoryAPI.listRepositories();
    return response.data;
  }
);

export const fetchRepository = createAsyncThunk(
  'repositories/fetchRepository',
  async (id) => {
    const response = await repositoryAPI.getRepository(id);
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
  repositoryCount: 0,
  prevPage: null,
  nextPage: null,
  loading: true,
  currentRepository: null,
  currentCommitList: [],
  successMessage: false,
};

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setCurrentRepository: (state, action) => ({
      ...state,
      currentRepository: state.repositories.find(
        (repository) => repository.id === parseInt(action.payload, 10)
      ),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoryList.fulfilled, (state, action) => ({
        ...state,
        repositories: action.payload.results,
        repositoryCount: action.payload.count,
        prevPage: action.payload.previous,
        nextPage: action.payload.next,
        loading: false,
      }))
      .addCase(fetchRepository.fulfilled, (state, action) => ({
        ...state,
        currentRepository: action.payload,
        loading: false,
      }))
      .addCase(addRepository.fulfilled, (state, action) => ({
        ...state,
        repositories: [...state.repositories, action.payload],
        repositoryCount: state.repositoryCount + 1,
        loading: false,
        successMessage: true,
      }))
      .addCase(fetchCommitsFromRepository.fulfilled, (state, action) => ({
        ...state,
        commits: action.payload,
      }));
  },
});

export const { setCurrentRepository } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
