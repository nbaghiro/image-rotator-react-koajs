import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AppliedActions extends Component {
	constructor() {
		super();
		this.actionReversed = this.actionReversed.bind(this);
		this.reset = this.reset.bind(this);
		this.state = {
			appliedActions : []
		};
	}

	actionReversed(actionType) {
		this.props.undoAction(actionType);
	}	

	reset() {
		this.setState({
			appliedActions : []
		});
	}

	render() {
		var self = this;
		return (
			<div>
			  	<p> Applied Actions </p>
			  	{self.state.appliedActions.map(function(action){
			  		return <span><Button onClick = {()=>{self.actionReversed(action);}}> {action} </Button> <br/></span>
			  	})}
			</div>
		)
	}
}

export default AppliedActions;