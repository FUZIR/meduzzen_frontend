export function isAdminUser(userId, admins) {
  if (Array.isArray(admins)) {
    return admins.find((admin) => admin.id === userId);
  } else {
    if (admins !== null && admins !== undefined) {
      console.warn('Expected admins to be an array, but received:', admins);
    }
    return null;
  }
}