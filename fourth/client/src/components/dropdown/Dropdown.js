import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Dropdown = ({ ddItem , mobileId }) => {

    const ddId = mobileId ? `${ddItem._id}_${ddItem.type}_${mobileId}` : `${ddItem._id}_${ddItem.type}`;
    return (
        <Fragment>
            {ddItem && (
                <Fragment>
                    <ul id={ddId} className="dropdown-content">
                        {ddItem && ddItem.category.map(cat =>
                            <li key={cat._id}>
                                <Link to={`/product-details/${ddItem.type}/${cat.type}`}>{cat.name}</Link>
                            </li>
                        )
                        }
                    </ul>
                    <a href="#!" className="dropdown-trigger" data-target={ddId}>
                        <i className="material-icons right">arrow_drop_down</i>
                        {/* <Link to={`/product-details/${ddItem.type}`}> */}
                            <span className='hide-sm right'>{ddItem.type}</span>
                        {/* </Link> */}
                    </a>
                </Fragment>
            )}

        </Fragment>
    )
}

Dropdown.propTypes = {
    ddItem: PropTypes.object.isRequired,
    mobileId: PropTypes.bool.isRequired,
};

export default Dropdown;