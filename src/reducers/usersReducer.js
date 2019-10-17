const initialState = {
    users: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'AGREGAR_USUARIO':
            return {
                ...state, 
                users: [...state.users, action.payload]
            }; 
        case 'BORRAR_USUARIO':
            return {
                ...state, 
                users:  state.users.filter(user => user.id !== action.payload)
            };
        default:
          return state;
    }
}
