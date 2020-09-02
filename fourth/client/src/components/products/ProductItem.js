import React , { useContext }from 'react';
import PropTypes from 'prop-types';
import ProductContext from '../../context/product/ProductContext';

const ProductItem = ({ product }) => {

    const productContext = useContext(ProductContext);
    const { deleteProduct,  setCurrent , clearCurrent } = productContext;
    const { name, _id, email, phone, type } = product;

    const onDelete = () => {
        deleteProduct(_id);
        clearCurrent();
    }
 
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '}
                <span 
                style={{float:'right'}}
                className={'badge ' + 
                (type === 'professional' ? ' badge-success' : 'badge-primary')
                }>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (<li>
                <i className="fas fa-envelope-open"></i>{email}
                </li>
                )}
                  {phone && (<li>
                <i className="fas fa-phone"></i>{phone}
                </li>
                )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(product)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductItem;