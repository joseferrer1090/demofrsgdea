const initialState = {
    users: [], 
    original: {}, 
    assigned: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'AGREGAR_USUARIO':
            return {
                ...state, 
                users: [...state.users, action.payload], 
                assigned: null
            }; 
        case 'BORRAR_USUARIO':
            return {
                ...state, 
                users:  state.users.filter(user => user.id !== action.payload), 
                original: {}, 
                assigned: false
            };
        case 'AGREGAR_ORIGINAL':
            return {
                ...state,
                original: action.payload, 
                assigned: true
            };
        default:
          return state;
    }
}
