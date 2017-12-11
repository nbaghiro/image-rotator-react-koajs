import React, { Component } from 'react';
import imgPlaceHolder from '../images/placeholder.png';

class ImageUpload extends Component {
	constructor() {
		super();
		this.handleImageChange = this.handleImageChange.bind(this);
		this.performAction = this.performAction.bind(this);
		this.reset = this.reset.bind(this);
		this.state = {
			imgSource: '',
			translate: 0, 
			scale: 1, 
			opacity : 1, 
			rotate: 0,
			transform: ""
		}
	}

	performAction(actionType, direction) {
		let transform = this.state.transform;
		let curAmount;
		switch(actionType) {
            case "rotate" :
           		curAmount = this.state.rotate;
           		curAmount = direction && (curAmount === 0 || curAmount === -45) ? 45 : -45;
            	this.setState({transform: transform + ' rotate(' + curAmount + 'deg)', rotate: curAmount});
                break;
            case "translate" :  
            	curAmount = this.state.translate;
           		curAmount = direction && (curAmount === 0 || curAmount === 40) ? -40 : 40;          	
            	this.setState({transform: transform + ' translate(' + curAmount + 'px)', translate: curAmount});
                break;
            case "scale":
            	curAmount = this.state.scale;
           		curAmount = direction && (curAmount === 1 || curAmount === 2) ? 0.5 : 2;
            	this.setState({transform: transform + ' scale(' + curAmount + ')', scale: curAmount});
                break;
            case "opacity": 
            	curAmount = this.state.opacity;
            	curAmount = direction && (curAmount === 1 || curAmount === 2) ? 0.5 : 2;
            	this.setState({opacity: curAmount});
                break;
            default:
            	break;
        }
	}	

	reset() {
		this.refs.fileSubmitForm.reset();
		  
		this.setState({
			imgSource: '',
			translate: 0, 
			scale: 1, 
			opacity : 1, 
			rotate: 0,
			transform: ""
		});
	}

	handleImageChange(e) {
		e.preventDefault();

	    let reader = new FileReader();
	    let file = e.target.files[0];

	    reader.onloadend = () => {
	      	this.setState({
		        imgSource: reader.result
	      	});
	    }

	    reader.readAsDataURL(file)
	}

	render() {		
		const styles = {
			opacity: this.state.opacity,
			transform: this.state.transform
		}; 

		let imgSource = this.state.imgSource === "" ? imgPlaceHolder : this.state.imgSource;

		return (
		  	<div className="imgUploadContainer">		    
		    	<div className="imgHolder">
		    		<img src={imgSource} style={styles} className="theImage" alt=""/>		      	
		    	</div>
		    	<form className="fileSubmitForm" ref="fileSubmitForm">
			    	<input 
						type="file"
					    onChange={this.handleImageChange} />
				</form>
		  	</div>
		)
	}
}

export default ImageUpload;