export const selectAuthToken = (state) => state.login.token;
export const selectIsAuthenticated = (state) => Boolean(state.login.token);
export const selectUserId = (state) => state.login.userId;

export const selectEntities = (state) => state.users.entities || [];
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;

export const selectExpirationDate = (state) => state.login.expirationDate;