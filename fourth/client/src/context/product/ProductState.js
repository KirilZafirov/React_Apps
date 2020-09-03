import React, { useReducer } from 'react'; 
import ProductContext from './ProductContext';
import productReducer from './ProductReducer';
import axios from 'axios';

import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_PRODUCT,
    FILTER_PRODUCTS,
    CLEAR_FILTER,
    PRODUCT_ERROR,
    CLEAR_PRODUCTS,
    GET_PRODUCTS,
    baseApiUrl
} from '../types'; 

const ProductState = props => {
 
    const initialState = {
        products: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state , dispatch ] = useReducer(productReducer , initialState); 
 

    const getProducts = async () => {
       
        try {
            const res = await axios.get(`${baseApiUrl}/api/products`);
         
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            }); 
        } catch (err) {  
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.msg
            });
        }
    } 

    const addProduct = async (product) => {
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        try {
            const res = await axios.post(`${baseApiUrl}/api/products` , product , config);

            dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.msg
            });
        }

      
    } 

    const deleteProduct = async (id) => {
        try {
            
            await axios.delete(`${baseApiUrl}/api/products/${id}`);

            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            });

        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.msg
            });
        }
    } 

      const updateProduct = async (product) => { 
        try {
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            } 
            
            const res = await axios.put(`${baseApiUrl}/api/products/${product._id}`, product , config );

            dispatch({
                type: UPDATE_PRODUCT,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.msg
            });
        }  
    }
 
    const setCurrent = (product) => {
        dispatch({
            type: SET_CURRENT,
            payload: product
        })
    }

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }
   

    const filterProducts = (text) => {
        dispatch({
            type: FILTER_PRODUCTS,
            payload: text
        })
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }
 
    const clearProducts = () => {
        dispatch({type : CLEAR_PRODUCTS });
    }
    return (
        <ProductContext.Provider 
        value={{
            products: state.products,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addProduct,
            deleteProduct , 
            updateProduct,
            setCurrent,
            clearCurrent,
            filterProducts,
            clearFilter,
            getProducts,
            clearProducts
        }}>
            { props.children }
        </ProductContext.Provider>
    )
};

export default ProductState;