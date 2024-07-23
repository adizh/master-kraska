export const navigateToAdmin = () => {
  setTimeout(() => {
    window.location.reload();
  }, 400);
  return navigateTo("/admin");
};
