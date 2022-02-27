import React, { Component } from 'react'

import { getForeigns, deleteForeign, updateForeign } from '../services/foreignService';

import UpdateForeign from './UpdateForeign'

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


class ExploreForeign extends Component {
	_isMounted = false;

	state = {
		foreignId: "",
		
		name: "",
		description: "",
		taste: "",
		date: "",
		
		foreigns: [],

		totalTaste: 0.0,
		totalPending: 0.0,
		total: 0.0,
		
		view: false,
		buttonDisabled: false,
		selectDisabled: false,

		update: false,
		loading: true
	}

	populateForeigns = async () => {
		const { data: foreigns } = await getForeigns();
		this._isMounted && this.setState({ foreigns })
	}	

	
	async componentDidMount(){
		this._isMounted = true;

		this._isMounted && await this.populateForeigns();
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

		const m = this.state.foreigns.filter(i => i._id === this.state.foreignId);		
		
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
			
			const totalTaste = this.state.foreigns.filter(i => i.taste === true).length;
			const totalPending  =  this.state.foreigns.filter(i => i.taste === false).length;

			const total = this.state.foreigns.length*1;

			this.setState({ totalTaste, totalPending, total });
		}

	}

	handleForeignSelect = e => {
		this.setState({
			foreignId: e.value, 
			name: e.name
		})
	}

	handleReset = async () => {
		await this.populateForeigns();
		this.setState({
			foreignId: "",

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
		if (this.state.foreignId !== "") {
			this.setState({ update: true });
		}
	}

	handleDelete = async e => {
		e.preventDefault();
		try {
			this.setState({
				foreignId: "",
				name: "",
				description: "",
				taste: "",
				date: "",
			})
	    	await deleteForeign(this.state.foreignId)
	    	toast.dark("Deleted successfully");
	    }	
	    catch (ex) {
	    	toast.error(ex);
	    }
	}

	handleTaste = async e => {
		e.preventDefault();
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
	    			"taste": false,
	    			"date": this.state.date,
	    		}
	    		
	    		await updateForeign(data, this.state.foreignId)
	    		toast.dark("You should try it out");
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
	    			"taste": true,
	    			"date": this.state.date
	    		}
	    		
	    		await updateForeign(data, this.state.foreignId)
	    		toast.dark("It must be delicious");
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
		await this.populateForeigns();

		const c = this.state.foreigns.filter(i => i._id === this.state.foreignId);
		
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
					<Row><Col xs={8}>
					<br />
					<Alert variant="danger">
						<center>
						<Alert.Heading>Update Recipe Details</Alert.Heading>				
						</center>
					</Alert>	
					<br />
					<UpdateForeign id={this.state.foreignId} handleCancel={this.setCancel} handleUpdate={this.setUpdate}/>
					</Col></Row>
				</div>
				:
				<div>
				<br />
				<Row>
							<Col>
								<Alert variant='success'>
									<center>
										<p>
											Nothing brings people together<br />
											like <b>Good Food</b>
										</p>
									</center>
								</Alert>
							</Col>
							<Col>
								<Alert variant='info'>
									<center>
										<p>
											<b>Better Food</b><br />
											like <b>Better Mood</b>
										</p>
									</center>
								</Alert>
							</Col>

							<Col>
								<Alert variant='success'>
									<center>
										<p>
											<b>Good Food</b> is the foundation<br />
											of <b>Genuine Happiness</b>
										</p>
									</center>
								</Alert>
							</Col>
						</Row>
				<Form onSubmit={this.handleSubmit}>
					<Form.Row>
						<Col xs={6}>
						    <Form.Label>Recipe Name</Form.Label>
					    </Col>
					    <Col>
					    	<Form.Label></Form.Label>
					    </Col>
				    </Form.Row>

				    <Form.Row>
					    <Col xs={4}>	
					    	<Select 
					   			onChange={this.handleForeignSelect}
								options = {this.state.foreigns.map(i => {
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

						<br/>
						<h4>
							Recipe Details
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
									onClick={this.handleTaste}
									>									
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
						<br /> <br />
						<Row>
							<Col>
								<Alert variant='light'>
									<center>
										<h5>Recipes Tasted</h5>
										<hr />
										<p>{this.state.totalTaste}</p>
									</center>
								</Alert>
							</Col>
							<Col>
								<Alert variant='light'>
									<center>
										<h5>Wishlist</h5>
										<hr />
										<p>{this.state.totalPending}</p>
									</center>
								</Alert>
							</Col>

							<Col>
								<Alert variant='light'>
									<center>
										<h5>Total</h5>
										<hr />
										<p>{this.state.total}</p>
									</center>
								</Alert>
							</Col>
						</Row>



						<Row>
							<Col>
								<Alert variant='warning'>
									<center>
										<p>
											Nothing brings people together<br />
											like <b>Good Food</b>
										</p>
									</center>
								</Alert>
							</Col>
							<Col>
								<Alert variant='primary'>
									<center>
										<p>
											<b>Better Food</b><br />
											like <b>Better Mood</b>
										</p>
									</center>
								</Alert>
							</Col>

							<Col>
								<Alert variant='warning'>
									<center>
										<p>
											<b>Good Food</b> is the foundation<br />
											of <b>Genuine Happiness</b>
										</p>
									</center>
								</Alert>
							</Col>
						</Row>
						
						
					</div>
					:  
					<div>
					<p>Choose a recipe name.</p>
					
					</div>
				}
			</div>
			}
		</div>
		}	
		</div>
		)
	}
}

export default ExploreForeign