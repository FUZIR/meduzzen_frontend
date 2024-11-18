export const selectIsAuthenticated = (state) => state.login.isAuthenticated;
export const selectUserId = (state) => state.login.userId;
export const selectExpirationDate = (state) => state.login.expirationDate;

export const selectUserState = (state) => state.users;

