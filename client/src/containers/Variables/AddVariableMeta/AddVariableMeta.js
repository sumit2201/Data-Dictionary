import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextAreaInput from '../../../components/InputFields/textAreaInput/textAreaInput';
import TextInput from '../../../components/InputFields/textInput/textInput';
import SelectInput from '../../../components/InputFields/selectInput/selectInput';
import { addVariable, getSingleVariableMeta, editVariable } from '../../../store/actions/variableActions';
import "./AddVariableMeta.css";
import WrappedLink from '../../../components/WrappedLink/WrappedLink';
import { Auth, allFeatuers } from '../../../libraries/Auth';
const FIELDS = [
    { name: 'variableName', type: 'text', label: 'Variable Name' },
    {
        name: 'category', type: 'select', label: 'Category',
        values: [
            {
                value: "Calculated"
            },
            {
                value: "Original"
            },
            {
                value: "Derived"
            }
        ]
    },
    {
        name: 'crfDataType', type: 'select', label: 'CRF Data Type',
        values: [
            {
                value: "Number"
            },
            {
                value: "Text"
            },
            {
                value: "Date"
            },
            {
                value: "Time"
            }
        ]
    },
    { name: 'description', type: 'textArea', label: 'Description' },
    { name: 'valueLowerLimit', type: 'number', label: 'Value Lower Limit' },
    { name: 'valueUpperLimit', type: 'number', label: 'Value Upper Limit' },
    {
        name: 'isRequired', type: 'select', label: 'Required',
        values: [
            {
                value: "1",
                title: "Yes",
            },
            {
                value: "0",
                title: "No",
            }
        ]
    },
    { name: 'units', type: 'text', label: 'Units' },
    { name: 'formName', type: 'text', label: 'Form Name(Enter comma separated values)' }
];

class AddVariableMeta extends Component {
    state = {
        variableMeta: {},
        errors: {},
        isUpdate: false,
        isDataProcessed: false,
    };

    constructor(props) {
        super(props);
        if (this.props.match.params.id) {
            this.state.isUpdate = true;
        } else {
            this.state.variableMeta = this.getDefaultVariableMetaFieldValues();
        }
    }

    getDefaultVariableMetaFieldValues() {
        return {
            variableName: "",
            category: "Calculated",
            crfDataType: "Number",
            description: "",
            valueLowerLimit: 0,
            valueUpperLimit: 10,
            isRequired: 0,
            units: "",
            formName: ""
        }
    }

    hasAccessForVariableNameUpdate = (fieldObj) =>{
        let disabled = false;
        if(fieldObj.name==="variableName" && !Auth.hasAccess(this.props.authorizedRole,allFeatuers.create)){
            disabled = true;
        }
        return disabled;
    }

    formBuilder(fieldArray) {
        return fieldArray.map((fieldObj) => {
            switch (fieldObj.type) {
                case "text":
                case "number":
                    return <TextInput key={fieldObj.name}
                        type={fieldObj.type} name={fieldObj.name} label={fieldObj.label}
                        defaultValue={this.state.variableMeta[fieldObj.name]} 
                        errors={this.state.errors} disabled={this.hasAccessForVariableNameUpdate(fieldObj)}
                        onChange={this.handleInputChange} />
                case "textArea":
                    return <TextAreaInput key={fieldObj.name}
                        type={fieldObj.type} name={fieldObj.name} label={fieldObj.label}
                        defaultValue={this.state.variableMeta[fieldObj.name]} onChange={this.handleInputChange}
                    />
                case "select":
                    return <SelectInput values={fieldObj.values} key={fieldObj.name}
                        type={fieldObj.type} name={fieldObj.name} label={fieldObj.label}
                        defaultValue={this.state.variableMeta[fieldObj.name]} disabled={fieldObj.disabled}
                        errors={this.state.errors}
                        onChange={this.handleInputChange} />
                default:
                    return <React.Fragment/>;
            }
        });
    }

    componentDidMount() {
        if (this.state.isUpdate) {
            this.props.dispatch(getSingleVariableMeta(this.props.match.params.id));
        }
    }

    componentDidUpdate(){
        if(this.props.alertMsg){
            alert(this.props.alertMsg);
            this.props.history.replace({ pathname: '/' });
        }
    }

    handleValidation = (field, value) => {
        let error = {};
        if (value === '') {
            error[field] = 'This field is required';
        } else {
            error[field] = '';
        }
        return error;
    }

    handleInputChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        const errors = { ...this.state.errors, ...this.handleValidation(field, value) }

        this.setState((prevState) => {
            return {
                ...prevState,
                variableMeta: {
                    ...prevState.variableMeta,
                    [field]: value
                },
                errors: { ...errors }
            };
        });
    }

 
    static getDerivedStateFromProps(props, state) {
        // isDateProcessed flag insures that we only set 
        // state once when data is arrived from server
        if (props.variableMeta._id && !state.isDataProcessed) {
            state.variableMeta = props.variableMeta
            state.isDataProcessed = true;
        }
        return state;
    }

    handleAddVariableMetaRequest = (e) => {
        e.preventDefault();
        let errors = { ...this.state.errors };
        const formValuesValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
        if (!formValuesValid) {
            return;
        } else {
            if (this.state.isUpdate) {
                this.props.dispatch(editVariable(this.state.variableMeta))
            } else {
                this.props.dispatch(addVariable(this.state.variableMeta));
            }

        }
    }

    render() {
        const feature = this.state.isUpdate ? allFeatuers.update : allFeatuers.create;
        if (!this.props.isAuthenticated ) {
            return <Redirect to="/login" />;
        }else if(!Auth.hasAccess(this.props.authorizedRole,feature)){
            alert("You are not authorized to view this resource");
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
                <WrappedLink to="/" buttonClasses={['btn', 'btn-primary', 'mr-3','add-variable-meta-button']}>
                    Back to variable list
                </WrappedLink>
                <div className="jumbotron form-parent">
                    <h3 className="text-left form-heading">
                        {!this.state.isUpdate ? 'Add Variable Meta' : 'Update Variable Meta'}
                    </h3>
                    <form onSubmit={this.handleAddVariableMetaRequest} >
                        {this.formBuilder(FIELDS)}
                        <button className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.users.isAuthenticated,
        authenticatedUsername: state.users.authenticatedUsername,
        authorizedRole:state.users.authorizedRole,
        variableMeta: { ...state.variables.singleVariableMeta },
        alertMsg: state.variables.alertMsg
    };
}


export default connect(mapStateToProps)(AddVariableMeta);
