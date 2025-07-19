export const logout = () => {
  // Clear tokens and any other stored info
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  // Optional: clear other user data
  localStorage.removeItem('user');

  // Redirect to LOgin page
  window.location.href = '/login';
};
