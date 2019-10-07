import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Login from './containers/Users/Login/Login';
import NavigationBar from './containers/NavigationBar/NavigationBar';
import AddVariableMeta from './containers/Variables/AddVariableMeta/AddVariableMeta';
import VariableMetaInfo from './containers/Variables/ViewVariableMeta/VariableMetaInfo';


class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <NavigationBar />
                <Switch>
                    <Route exact path="/variable/add" component={AddVariableMeta} />
                    <Route path="/variable/edit/:id" component={AddVariableMeta} />
                    <Route path="/variable/view/:id" component={VariableMetaInfo} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default App;
