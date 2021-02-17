import { reducer as formReducer } from 'redux-form';

// Reducers
import commitReducer from './CommitReducer';
import repositoryReducer from './RepositoryReducer';

// Combine Reducers
const reducers = {
  form: formReducer,
  commitState: commitReducer,
  repositoryState: repositoryReducer,
};

export default reducers;
