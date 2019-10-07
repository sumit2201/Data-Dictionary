import React from 'react';
import './Variable.css';
import WrappedLink from '../WrappedLink/WrappedLink';
import { allFeatuers, Auth } from '../../libraries/Auth';

const Variable = (props) => {
    return (
        <li className="Variable">
            <strong>{props.variableName}</strong>
            <div className="link-wrapper">
                {Auth.hasAccess(props.authorizedRole, allFeatuers.update) &&
                    <WrappedLink
                        to={'/variable/edit/' + props.id}
                        buttonClasses={['btn', 'btn-info', 'action-button']}>Modify</WrappedLink>
                }
                <WrappedLink
                    to={'/variable/view/' + props.id}
                    buttonClasses={['btn', 'btn-info', 'action-button']}>View</WrappedLink>
                {Auth.hasAccess(props.authorizedRole, allFeatuers.delete) &&
                    <button
                        className="btn btn-danger"
                        style={{ float: 'right', padding: '6px 12px' }}
                        onClick={() => props.handleDeleteVariableClick(props.id)}>Delete</button>
                }
            </div>
        </li>
    );
}

export default Variable;
