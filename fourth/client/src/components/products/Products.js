import React, { Fragment, useContext, useEffect } from 'react'
import ProductContext from '../../context/product/ProductContext';
import ProductItem from './ProductItem'; 
import Spinner from '../layout/Spinner';

const Products = () => {

    const productContext = useContext(ProductContext);

    const { products, filtered, getProducts, loading } = productContext;

    useEffect(() => {
        getProducts();
        //eslint-disable-next-line
    }, []);

    if (products !== null && products.length === 0 && !loading) {
        return <h4>Please add a product</h4>
    };

    return (
        <Fragment>
            {products !== null && !loading ? (<Fragment>
                {filtered !== null ?
                    filtered.length > 0 ?
                        filtered.map(product =>
                            (
                                <ProductItem key={product._id} product={product} />
                            )
                        ) :
                        (

                            <h4>No products for that filter</h4>
                        ) :
                        products.map(product =>
                        (
                            <ProductItem key={product._id} product={product} />
                        )
                    )}
            </Fragment>) : <Spinner />}
        </Fragment>
    )
}

export default Products;