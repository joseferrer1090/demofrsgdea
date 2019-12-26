export function authHeader() {
  let user = JSON.parent(localStorage.getItem("user"));

  if (user && user.token) {
    return {
      Authorization: `bearer ${user.token}`
    };
  } else {
    return {};
  }
}
