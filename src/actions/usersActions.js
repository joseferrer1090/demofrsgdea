 export const  agregarUserAction = (user) =>{
    return {
        type: 'AGREGAR_USUARIO', 
         payload: user
    };
};

export const borrarUserAction = (id) => {
    return {
        type: 'BORRAR_USUARIO', 
        payload: id
    };
};

export const agregarOriginal = (id) => {
    return {
        type: 'AGREGAR_ORIGINAL', 
        payload: id
    }
};