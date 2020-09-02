import React, { useEffect } from 'react';
import TechItem from './TechItem';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getTechs } from '../../actions/techActions';

const TechListModal = ({ tech: { techs , loading} , getTechs}) => { 

    useEffect(() => {
        getTechs();
        // eslint-disable-next-line
    }, []);

   

    return (
        <div id='tech-list-modal' className='modal'>
            <div className='modal-content'>
                <h4 > Technicians List</h4>
                <ul className='collection'>
                    {!loading && techs?.length === 0 ? (<p className="center"> No Techs to show...</p>) :
                        (
                            techs !== null && techs.map(tech => <TechItem key={tech.id} tech={tech} />)
                        )}
                </ul>

            </div>
        </div>
    )
}

TechListModal.propTypes = {
    tech: PropTypes.object.isRequired,
    getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    tech: state.tech 
});

export default connect(mapStateToProps , {getTechs})(TechListModal);
