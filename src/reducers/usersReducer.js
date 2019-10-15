const initialState = {
    users: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'AGREGAR_USUARIO':
            return {
                ...state, 
                users: [...state.users, action.payload]
            }
    
        default:
          return state;
    }
}
