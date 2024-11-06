export const selectAuthToken = (state) => state.login.token;
export const selectIsAuthenticated = (state) => Boolean(state.login.token);