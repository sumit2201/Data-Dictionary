import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import WrappedLink from '../../components/WrappedLink/WrappedLink';
import './Home.css';
import { getAllVariablesMeta, deleteVariable } from '../../store/actions/variableActions';
import Variable from '../../components/Variable/Variable';
import { Auth, allFeatuers } from '../../libraries/Auth';
const SEARCH_WAIT_TIMEOUT = 200;
class Home extends Component {
    
    searchTimer = null;

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(getAllVariablesMeta());
        }
    }

    componentDidUpdate() {
        if (this.props.alertMsg) {
            alert(this.props.alertMsg);
            // refresh list
            window.location.reload();
        }
    }

    handleSearchRequest = (e) => {
        const searchText = e.target.value;
        // Debounce search to prevent multiple requests
        if (this.searchTimer !== null) {
            clearTimeout(this.searchTimer);
        }
        this.searchTimer = setTimeout(() => {
            this.executeSearch(searchText);
        }, SEARCH_WAIT_TIMEOUT);
    }

    executeSearch(searchText) {
        // keeping fetchObj parameter as object, which can contain parameters for lazy loading or incremental rendering
        // for variable name list
        const fetchObj = {
            searchText,
        }
        this.props.dispatch(getAllVariablesMeta(fetchObj))
    }

    handleDeleteVariableClick = (variableId) => {
        if (window.confirm('Do you really want to delete this variable meta information?')) {
            this.props.dispatch(deleteVariable(variableId));
        }
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        let allVariables = this.props.allVariables || [];
        allVariables = allVariables.map(singleVariable => (
            <Variable
                key={singleVariable._id}
                id={singleVariable._id}
                variableName={singleVariable.variableName}
                handleDeleteVariableClick={this.handleDeleteVariableClick}
                authorizedRole={this.props.authorizedRole} />
        ));


        return (
            <div className="container">
                <br />
                <div className="Header">
                    <input type="text" name="searchVariable" className="search-value"
                        onKeyUp={this.handleSearchRequest} placeholder="Search by variable name" />
                    { Auth.hasAccess(this.props.authorizedRole,allFeatuers.create) && 
                    <div className="link-wrapper">
                        <WrappedLink to="/variable/add" buttonClasses={['btn', 'btn-primary', 'mr-3', 'add-variable-meta-button']}>Add Variable Meta</WrappedLink>
                    </div>
                    }

                </div>
                <br />
                <div>
                    <section className="jumbotron">
                        <div className="Variables">
                            {allVariables}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allVariables: state.variables.allVariablesMeta,
        isAuthenticated: state.users.isAuthenticated,
        authorizedRole: state.users.authorizedRole,
        alertMsg:state.variables.alertMsg
    };
};


export default connect(mapStateToProps)(Home);
