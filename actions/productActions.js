import axios from 'axios';
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILS, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAILS} from '../constants/productConstant';

export const listProducts = (id) => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(`http://localhost:4000/api/v1/users/imagelist/${id}`)
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAILS,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const listProductDetails = (data) => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILS,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}
export const getProductById = (id) => async(dispatch, getState) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`http://localhost:4000/api/v1/images/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        typeof window !== "undefined" && localStorage.setItem('products',JSON.stringify(getState().productDetails.products))
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILS,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}
