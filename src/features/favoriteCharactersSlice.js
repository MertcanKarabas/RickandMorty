import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteCharacters: [],
  showLimitReachedMessage: false,
};

const favoriteCharactersSlice = createSlice({
  name: 'favoriteCharacters',
  initialState,
  reducers: {
    addFavoriteCharacter: (state, action) => {
      if (state.favoriteCharacters.length < 10 && !state.favoriteCharacters.includes(action.payload)) {
        state.favoriteCharacters.push(action.payload);
        state.showLimitReachedMessage = false;
      } else {
        state.showLimitReachedMessage = true;
      }
    },
    removeFavoriteCharacter: (state, action) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(
        character => character !== action.payload
      );
      state.showLimitReachedMessage = false;
    },
    resetLimitReachedMessage: (state) => {
      state.showLimitReachedMessage = false; // Limit uyarı mesajını sıfırla
    },
  },
});

export const { addFavoriteCharacter, removeFavoriteCharacter, resetLimitReachedMessage } = favoriteCharactersSlice.actions;

export default favoriteCharactersSlice.reducer;
