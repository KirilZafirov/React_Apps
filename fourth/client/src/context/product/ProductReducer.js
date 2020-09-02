import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_PRODUCT,
    FILTER_PRODUCTS,
    CLEAR_FILTER,
    PRODUCT_ERROR,
    GET_PRODUCTS,
    CLEAR_PRODUCTS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [ action.payload , ...state.products],
                loading: false
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => product._id === action.payload._id ? action.payload : product),
                loading: false
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(c => c._id !== action.payload),
                loading: false
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_PRODUCTS:
            return {
                ...state,
                filtered: state.products.filter(product => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return product.name.match(regex) || product.email.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: null,
                current: null,
                filtered: null,
                error: null
            }; 
        default:
            return state;
    }
}