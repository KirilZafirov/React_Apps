import React, { Fragment, useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/ProductContext';
import M from 'materialize-css/dist/js/materialize.min.js';
import Dropdown from '../dropdown/Dropdown';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const productContext = useContext(ProductContext);

    const { isAuthenticated, logout, user } = authContext;

    const { clearProducts } = productContext;

    const loading = false;
    const language = 'mk';
    const subCategory = [
        {
            _id: 113,
            type: 'sub-category1',
            name: ' sub-category name'
        },
        {
            _id: 213,
            type: 'sub-category2',
            name: ' sub-category name 2'
        },
        {
            _id: 313,
            type: 'sub-category3',
            name: ' sub-category name 3'
        },
    ];
    const productTypesMk = [{
        _id: 1,
        type: 'Печатени Работи',
        category: [
            {
                _id: 11,
                type: 'category1',
                name: ' category name',
                subCategory: subCategory
            },
            {
                _id: 21,
                type: 'category2',
                name: ' category name 2',
                subCategory: subCategory
            },
            {
                _id: 31,
                type: 'category3',
                name: ' category name 3',
                subCategory: subCategory
            },
        ],
    }, {
        _id: 2,
        type: 'Канцелариски Материјали',
        category: [
            {
                _id: 12,
                type: 'category1',
                name: ' category name',
                subCategory: subCategory
            },
            {
                _id: 22,
                type: 'category2',
                name: ' category name 2',
                subCategory: subCategory
            },
            {
                _id: 32,
                type: 'category3',
                name: ' category name 3',
                subCategory: subCategory
            }
        ],
    }, {
        _id: 3,
        type: 'Хигиенски Средства',
        category: [
            {
                _id: 13,
                type: 'category1',
                name: ' category name',
                subCategory: subCategory
            },
            {
                _id: 23,
                type: 'category2',
                name: ' category name 2',
                subCategory: subCategory
            },
            {
                _id: 33,
                type: 'category3',
                name: ' category name 3',
                subCategory: subCategory
            }
        ]
    }];
    const productTypesEn = [{
        _id: 1,
        type: 'Printed Materials',
        category: [],
        subCategory: []
    }, {
        _id: 2,
        type: 'Office Materials',
        category: [],
        subCategory: []
    }, {
        _id: 3,
        type: 'Cleaning and Hygiene products',
        category: [],
        subCategory: []
    }];

    const productTypes = language === 'mk' ? productTypesMk : productTypesEn;

    const onLogout = () => {
        logout();
        clearProducts();
    }

    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }, []);

    const productLinks = (
        <Fragment>
            {
                productTypes && productTypes.map(p =>
                    (
                        <li key={p._id}>
                            <Dropdown ddItem={p} mobileId={false} />
                        </li>
                    )
                )
            }
        </Fragment>
    )

    const productLinksMobile = (
        <Fragment>
            {
                productTypes && productTypes.map(p =>
                    (
                        <li key={p._id}>
                            <Dropdown ddItem={p} mobileId={true} />
                        </li>
                    )
                )
            }
        </Fragment>
    )

    const authLinks = (
        <Fragment>
            <li className="waves-effect">
                Hello {user && user.name}
            </li>
            <li>
                <a href='#!' onClick={onLogout} className="waves-effect">
                    <i className='fas fa-sign-out-alt'></i>
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    )
    const guestLinks = (
        <Fragment>
            {productLinks}
            <li>
                <Link to='/about' className="waves-effect waves-blue">About</Link>
            </li>
            {/* <li>
                <Link to='/register'>Register</Link>
            </li> */}
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )
    const guestLinksMobile = (
        <Fragment>

            {productLinksMobile}
            <li>
                <Link to='/about'>
                    <span className='hide-sm right'>About</span>
                    <i className="material-icons">folder_shared</i>
                </Link>
            </li>
            {/* <li>
                <Link to='/register'>
                    <span className='hide-sm right'>Register</span>
                    <i className="material-icons">perm_identity</i>
                </Link>
            </li> */}
            <li>
                <Link to='/login'>
                    <span className='hide-sm right'>Login</span>
                    <i className="material-icons">login</i>
                </Link>
            </li>
        </Fragment>
    )

    return (
        <header>
            <nav style={{ marginBottom: '30px' }} className='blue'>
                <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-med-and-down"><i className="material-icons">menu</i></a>
                <div className="nav-wrapper right">
                    <ul id="nav-mobile" className="hide-on-med-and-down">
                        {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </div>
            </nav>
            <ul id="slide-out" className="sidenav">
                {isAuthenticated ? authLinks : guestLinksMobile}
            </ul>
        </header>

    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Riki Junior',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;