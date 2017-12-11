import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import logo from './images/logo.svg';
import ImageUpload from './components/ImageUpload.js';
import AvailableActions from './components/AvailableActions.js';
import AppliedActions from './components/AppliedActions.js';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.reset = this.reset.bind(this);
        this.performAction = this.performAction.bind(this);
        this.undoAction = this.undoAction.bind(this);
    }

    reset() {
        this.refs.imageUpload.reset();
        this.refs.availableActions.reset();
        this.refs.appliedActions.reset();
    }

    performAction(actionType) {
        var curAvailableActions = this.refs.availableActions.state.availableActions;
        var curAppliedActions = this.refs.appliedActions.state.appliedActions;
        const index = curAvailableActions.indexOf(actionType);
        if(index !== -1){
            curAvailableActions.splice(index, 1);
            curAppliedActions.push(actionType);
            this.refs.availableActions.setState({availableActions : curAvailableActions});            
            this.refs.appliedActions.setState({appliedActions : curAppliedActions});
            this.refs.imageUpload.performAction(actionType, 1);
        }          
    }

    undoAction(actionType) {
        var curAvailableActions = this.refs.availableActions.state.availableActions;
        var curAppliedActions = this.refs.appliedActions.state.appliedActions;
        const index = curAppliedActions.indexOf(actionType);
        if(index !== -1){
            curAppliedActions.splice(index, 1);
            curAvailableActions.push(actionType);
            this.refs.availableActions.setState({availableActions : curAvailableActions});            
            this.refs.appliedActions.setState({appliedActions : curAppliedActions});
            this.refs.imageUpload.performAction(actionType, 0);
        }  
    }

    render() {
        var self = this;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Image Rotater App</h1>
                </header>   
                <div className="App-content">
                    <div className="left">
                        <ImageUpload ref="imageUpload"/>
                    </div>
                    <div className="right">
                        <div className="right-up">
                            <div className="right-up-left">
                                <AvailableActions performAction={self.performAction} ref="availableActions"/>
                            </div>
                            <div className="right-up-right">
                                <AppliedActions undoAction={self.undoAction} ref="appliedActions"/>
                            </div>                            
                        </div>
                        <div className="right-down">
                            <Button onClick={self.reset}> Reset </Button>
                        </div>
                    </div>                    
                </div>     
            </div>
        );
    }
}

export default App;
