import React , { useState , useContext , useEffect } from 'react'
import ProductContext from '../../context/product/ProductContext';

const ProductForm = () => {

    const productContext = useContext(ProductContext);

    const { addProduct , clearCurrent , current , updateProduct} = productContext;

    useEffect(()=> {
        if(current !==null) {
            setProduct(current);
        } else {
            setProduct({
                name:'',
                email:'',
                phone:'',
                type:'personal'
            })
        }
    }, [productContext , current ]);

    const [ product , setProduct ] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal'
    });

    const { name , email ,  phone , type } = product; 

 
    const onChange = (e) =>  setProduct({
        ...product,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault(); 

        if(current === null) {
            addProduct(product);
        } else {
            updateProduct(product);
        }
        
        //todo
        setProduct({
            name:'',
            email:'',
            phone:'',
            type:'personal'
        })
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Update Product' : 'Add Product'}</h2>
            <input type="text" placeholder="Name"   name="name" value={name} onChange={onChange}/>
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange}/>
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange}/>
            <h5>
            Product Type
            </h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange}/>
            Personal{ ' ' }
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange}/>
            Professional{ ' ' }
            <div>
            <input type="submit" 
                    value={current ? 'Update Product' : 'Add Product'} 
                    className='btn btn-primary btn-block'/>
            </div>
            {
                current && <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
                </div>
            }
        </form>
    )
}

export default ProductForm;
