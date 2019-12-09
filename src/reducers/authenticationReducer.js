let user = JSON.parse(localStorage.getItem("user")); // => Obtengo el valor del localStorage si existe algun valor almacenado
const initialState = user ? { LoggedIn: true, user } : {}; // => creo mi state inicial partiendo de ese valor, si existe cambiar el estado loggedIn a true e caso contario devualeve el state user vacio

// Funcion principal del Auth
export default function authentication(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST": // =>
      return {
        user: action.user,
        loggedIn: true
      };
    case "LOGIN_SUCCESS": // => Tengo este tipo cuando el login es satisfactorio
      return {
        loggedIn: true,
        user: action.user
      };
    case "LOGIN_FAILURE": // => Tengo este tipo cuando el login fallo retorna el state vacio
      return {};
    case "LOGOUT": // => Tengo este tipo cuando se cierra la session retorna el state vacio
      return {};
    default:
      return state;
  }
}
