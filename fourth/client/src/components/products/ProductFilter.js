import React , { useContext , useRef , useEffect }from 'react'
import ProductContext from '../../context/product/ProductContext';

export const ProductFilter = () => {

    const productContext = useContext(ProductContext);

    const { filterProducts , clearFilter , filtered } = productContext;

    const text = useRef('');
    
    useEffect(()=> {
        if(filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = (e) => {
        if(text.current.value !== '') {
            filterProducts(e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder='Filter Products' onChange={onChange}/>
        </form>
    )
}


export default ProductFilter;