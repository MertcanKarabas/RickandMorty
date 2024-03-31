import { configureStore } from '@reduxjs/toolkit';
import favoriteCharactersReducer from '../features/favoriteCharactersSlice';
import searchReducer from '../features/searchSlice';

export default configureStore({
  reducer: {
    favoriteCharacters: favoriteCharactersReducer,
    search: searchReducer,
  },
});
