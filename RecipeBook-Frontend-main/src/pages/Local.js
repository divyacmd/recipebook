import React, { Component } from 'react'

import { getLocals } from '../services/localService';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import CreateLocal from '../components/CreateLocal'
import ExploreLocal from '../components/ExploreLocal'


class Local extends Component {
	_isMounted = false;

	state = {
		view: "explore",
		id: "",
		localName: "",

		loading: true
	}

	async componentDidMount(){
		this._isMounted = true;
		
		if (this._isMounted) {
			const { data: locals } = await getLocals();
			
			
			this.setState({loading: false})	
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	localForm = () => {
		this.setState({
			view: "localForm"
		})
	}

	report = () => {
		this.setState({
			view: "report"
		})
	}

	explore = () => {
		this.setState({
			view: "explore"
		})
	}


	renderView = () => {
		if (this.state.view==="explore") {
			return (
				<div>
					<Alert variant="dark">
						<center>
						<Alert.Heading>Explore Local Recipes</Alert.Heading>				
						</center>
					</Alert>	
					<ExploreLocal />
				</div>
			)
		}
		else if (this.state.view==="localForm") {
			return (
				<div>
					<Alert variant="success">
						<center>
						<Alert.Heading>Add New Local Recipe</Alert.Heading>				
						</center>
					</Alert>	
					<br />
					<CreateLocal />
				</div>
			)
		}
	}

	render() {
		return (
			<div>

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
				
				<Container>
					<br />
					<h3>Local Recipes</h3>
					<br />

					<Button variant="dark" onClick={this.explore}>
						Explore
					</Button>{' '}

					<Button variant="dark" onClick={this.localForm}>
						Add New
					</Button>{' '}

					<hr />
					<br />

					{this.renderView()}

				</Container>			
			</div>
			}	
		</div>
		)
	}
}

export default Local