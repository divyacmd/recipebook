import React, { Component } from 'react'

import { getLocals, deleteLocal, updateLocal } from '../services/localService';

import UpdateLocal from './UpdateLocal'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import Select from 'react-select'

import { ToastContainer, toast } from  'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


class ExploreLocal extends Component {
	_isMounted = false;

	state = {
		localId: "",
		
		name: "",
		description: "",
		taste: "",
		date: "",
		
		locals: [],

		totalTaste: 0.0,
		totalPending: 0.0,
		total: 0.0,
		
		view: false,
		buttonDisabled: false,
		selectDisabled: false,

		update: false,
		loading: true
	}

	populateLocals = async () => {
		const { data: locals } = await getLocals();
		this._isMounted && this.setState({ locals })
	}	

	
	async componentDidMount(){
		this._isMounted = true;

		this._isMounted && await this.populateLocals();
		this._isMounted && this.setState({loading: false})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleChange = event => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = event => {
		event.preventDefault();

		const m = this.state.locals.filter(i => i._id === this.state.localId);		
		
		this.setState({
			view: true,
			buttonDisabled: true,
			selectDisabled: true
		})

		if (m.length !== 0) {
			this.setState({
				name: m[0].name,
				description: m[0].description,
				date: m[0].date,
				taste: m[0].taste
			})
		}

		// Calculate Totals
		if (m.length !== 0) {
			
			const totalTaste = this.state.locals.filter(i => i.taste === true).length;
			const totalPending  =  this.state.locals.filter(i => i.taste === false).length;

			const total = this.state.locals.length*1;

			this.setState({ totalTaste, totalPending, total });
		}

	}

	handlelocalSelect = e => {
		this.setState({
			localId: e.value, 
			name: e.name
		})
	}

	handleReset = async () => {
		await this.populateLocals();
		this.setState({
			localId: "",

			name: "",
			description: "",
			taste: "",
			date: "",

			totalPending: 0.0,
			totalTaste: 0.0,
			total: 0.0,
			
			view: false,
			buttonDisabled: false,
			selectDisabled: false		
		})
	}
	
	handleUpdate = async e => {
		if (this.state.localId !== "") {
			this.setState({ update: true });
		}
	}

	handleDelete = async e => {
		e.preventDefault();
		try {
			this.setState({
				localId: "",
				name: "",
				description: "",
				taste: "",
				date: "",
			})
	    	await deleteLocal(this.state.localId)
	    	toast.dark("Deleted successfully");
	    }	
	    catch (ex) {
	    	toast.error(ex);
	    }
	}

	handleTaste = async e => {
		e.preventDefault();console.log(this.state)
		try {
	    	if (this.state.taste === true) {
	    		this.setState({
	    			"taste": false, 
	    			"totalTaste": this.state.totalTaste*1 - 1,
					"totalPending": this.state.totalPending*1 + 1,
				})
	    		
	    		const data = {
	    			"name": this.state.name,
	    			"description": this.state.description,
	    			"taste": this.state.taste,
	    			"date": this.state.date,
	    		}
	    		
	    		await updateLocal(data, this.state.localId)
	    		toast.dark("Added to pending");
	    	}
	    	else {
	    		this.setState({
	    			"taste": true, 
	    			"totalTaste": this.state.totalTaste*1 + 1,
					"totalPending": this.state.totalPending*1 - 1,	
	    		});
	    		
	    		const data = {
	    			"name": this.state.name,
	    			"description": this.state.description,
	    			"taste": this.state.taste,
	    			"date": this.state.date
	    		}
	    		
	    		await updateLocal(data, this.state.localId)
	    		toast.dark("Added to taste");
	    	} 
	    }	
	    catch (ex) {
	    	if (ex.response && ex.response.status === 404) {
	    		toast.error("Some error");
	    	}
	    }
	}

	setCancel = e => {
		this.setState({
			update: false
		})
	}

	setUpdate = async () => {
		await this.populateLocals();

		const c = this.state.locals.filter(i => i._id === this.state.localId);
		
		this.setState({
			view: true,
			buttonDisabled: true,
			selectDisabled: true
		})

		if (c.length !== 0) {
			this.setState({
				name: c[0].name,
				description: c[0].description,
				date: c[0].date,
				taste: c[0].taste
			})
		}

		this.setState({
			update: false
		})
	}


	render() {
		return (
			<div>
			<ToastContainer hideProgressBar position="bottom-right"  />

			{ this.state.loading
						?
						<div>
							<center>
							<br />
							<br />
							<br />
							<Spinner size="sm" animation="grow" variant="danger" />{' '}
							<Spinner size="sm" animation="grow" variant="warning" />{' '}
							<Spinner size="sm" animation="grow" variant="success" />
							</center>
						</div>
						: 
						<div>
			{ this.state.update 
				? <div>
					<br />
					<Alert variant="danger">
						<center>
						<Alert.Heading>Update Local</Alert.Heading>				
						</center>
					</Alert>	
					<br />
					<UpdateLocal id={this.state.localId} handleCancel={this.setCancel} handleUpdate={this.setUpdate}/>
				</div>
				:
				<div>
				<br />
				<Form onSubmit={this.handleSubmit}>
					<Form.Row>
						<Col xs={6}>
						    <Form.Label>Local Name</Form.Label>
					    </Col>
					    <Col>
					    	<Form.Label></Form.Label>
					    </Col>
				    </Form.Row>

				    <Form.Row>
					    <Col xs={4}>	
					    	<Select 
					   			onChange={this.handleLocalSelect}
								options = {this.state.locals.map(i => {
									return ({
										value: i._id, 
										label: `${i.name}`,
										name: i.name
									})
								})}
								isDisabled={this.state.selectDisabled} 
							/>
						</Col>
						<Col>
							<Button 
								variant="dark" 
								type="submit"
								disabled={this.state.buttonDisabled}
							>
								Choose
							</Button>
							{' '}
							<Button 
								variant="danger" 
								onClick={this.handleReset}
							>
								Reset
							</Button>
						</Col>
					</Form.Row>
				</Form>

				<br />

				{ this.state.view 
					? 
					<div>
						<br />
						<h4>{this.state.name}</h4>
						<br />

						<Row>
							<Col>
								<Alert variant='dark'>
									<center>
										<h5>Recipes Tasted</h5>
										<hr />
										<p>{this.state.totalTaste}</p>
									</center>
								</Alert>
							</Col>
							<Col>
								<Alert variant='dark'>
									<center>
										<h5>Wishlist</h5>
										<hr />
										<p>{this.state.totalPending}</p>
									</center>
								</Alert>
							</Col>

							<Col>
								<Alert variant='dark'>
									<center>
										<h5>Total</h5>
										<hr />
										<p>{this.state.total}</p>
									</center>
								</Alert>
							</Col>
						</Row>

						<center>
							<Image src='https://frameru.com/wp-content/uploads/2021/06/Good-food-logo-template.jpg' width='500'></Image>
						</center>

						<br/>
						<h4>
							Recipe Preparing Details
							<Button 
								variant="outline-warning" 
								size="sm" 
								style={{float: 'right'}}
								onClick={this.handleUpdate}
							>
								Update
							</Button>
							
							<Button 
								variant="outline-danger" 
								size="sm" 
								style={{float: 'right', marginRight: 5}}
								onClick={this.handleDelete}
							>
								Delete
							</Button>
						</h4>
						
						<hr/>

						<Row>
							<Col xs={4}><p><b>Tasted</b></p></Col>
							<Col>
								<Button 
									variant="outline-primary" 
									disabled									>
									{this.state.taste ? "Yes, yummy" : "Waiting to taste"}
								</Button>
							</Col>
						</Row>

						< br />
							
						<Row>
							<Col xs={4}><p><b>Date Added</b></p></Col>
							<Col><p>{this.state.date}</p></Col>
						</Row>

						<Row>
							<Col xs={4}><p><b>Description</b></p></Col>
							<Col><p>{this.state.description}</p></Col>
						</Row>

						
						
					</div>
					:  
					<p>Choose a recipe name.</p>}
			</div>
			}
		</div>
		}	
		</div>
		)
	}
}

export default ExploreLocal