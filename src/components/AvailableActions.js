import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AvailableActions extends Component {
	constructor() {
		super();
		this.actionClicked = this.actionClicked.bind(this);
		this.reset = this.reset.bind(this);
		this.state = {
			availableActions : ['rotate', 'translate', 'scale', 'opacity']
		};
	}

	actionClicked(actionType) {
		this.props.performAction(actionType);
	}

	reset() {
		this.setState({
			availableActions : ['rotate', 'translate', 'scale', 'opacity']
		});
	}

	render() {
		var self = this;
		return (
			<div>
			  	<p> Available Actions </p>
			  	{self.state.availableActions.map(function(action){
			  		return <span><Button onClick = {()=>{self.actionClicked(action);}}> {action} </Button> <br/></span>
			  	})}
			</div>
		)
	}
}

export default AvailableActions;