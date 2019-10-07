import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import WrappedLink from '../../../components/WrappedLink/WrappedLink';
import './VariableMetaInfo.css'
import { getSingleVariableMeta, deleteVariable } from '../../../store/actions/variableActions';
import { Auth, allFeatuers } from '../../../libraries/Auth';

class VariableMetaInfo extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.dispatch(getSingleVariableMeta(this.props.match.params.id));
        }
    }

    componentDidUpdate() {
        if (this.props.alertMsg) {
            alert(this.props.alertMsg);
            this.props.history.replace({ pathname: '/' });
        }
    }

    handleEditVariableClick() {
        this.props.history.replace({ pathname: '/variable/edit/' + this.props.match.params.id });
    }

    handleDeleteVariableClick() {
        if (window.confirm('Do you really want to delete this variable meta information?')) {
            this.props.dispatch(deleteVariable(this.props.variableMeta._id));
        }
    }

    render() {
        if (!this.props.isAuthenticated ) {
            return <Redirect to="/login" />;
        }
        return (
            <React.Fragment>
                {this.props.variableMeta &&
                    <div className="container">
                        <WrappedLink to="/" buttonClasses={['btn', 'btn-primary', 'mr-3', 'add-variable-meta-button']}>
                            Back to variable list
                        </WrappedLink>
                        <div className="jumbotron variable-meta-info">
                            <h3 className="text-left varaible-heading">{this.props.variableMeta.variableName}</h3>
                            <table>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td className="text-right">
                                            Category:
                                        </td>
                                        <td className="text-left">
                                            {this.props.variableMeta.category}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right">
                                            CRF Data Type:
                                        </td>
                                        <td className="text-left">
                                            {this.props.variableMeta.crfDataType}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right">
                                            Description:
                                        </td>
                                        <td className="text-left">
                                            {this.props.variableMeta.description}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right">
                                            Value Lower Limit:
                                        </td>
                                        <td className="text-left">
                                            {this.props.variableMeta.valueLowerLimit}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right">
                                            Value Upper Limit:
                                        </td>
                                        <td className="text-left">
                                            {this.props.variableMeta.valueUpperLimit}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right">
                                            Required:
                                        </td>
                                        <td className="text-left">
                                            {this.props.variableMeta.isRequired ? "Yes" : "No"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right">
                                            Units:
                                    </td>
                                        <td className="text-left">
                                            {this.props.variableMeta.units}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-right">
                                            Form Name:
                                        </td>
                                        <td className="text-left">
                                            {this.props.variableMeta.formName}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="link-wrapper">
                                {this.props.isAuthenticated
                                    && Auth.hasAccess(this.props.authorizedRole, allFeatuers.delete) &&
                                    <button
                                        className="btn btn-danger"
                                        style={{ float: 'right', padding: '6px 12px' }}
                                        onClick={() => this.handleDeleteVariableClick()}>Delete</button>
                                }
                                {this.props.isAuthenticated && Auth.hasAccess(this.props.authorizedRole, allFeatuers.update)
                                    && <WrappedLink
                                        to={"/variable/edit/" + this.props.match.params.id}
                                        buttonClasses={['btn', 'btn-info', 'mr-2']}
                                        click={() => this.handleEditVariableClick()}>Modify</WrappedLink>}
                            </div>
                        </div>

                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        variableMeta: state.variables.singleVariableMeta,
        isAuthenticated: state.users.isAuthenticated,
        authorizedRole:state.users.authorizedRole,
        authenticatedUsername: state.users.authenticatedUsername,
        alertMsg: state.variables.alertMsg,
    };
};


export default connect(mapStateToProps)(VariableMetaInfo);
