export const logout = () => {
  // Clear tokens and any other stored info
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  // redirect to login only if user is on a protected route
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};
