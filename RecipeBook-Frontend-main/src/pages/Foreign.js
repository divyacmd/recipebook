import React, { Component } from 'react'

import { getForeigns } from '../services/foreignService';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import CreateForeign from '../components/CreateForeign'
import ExploreForeign from '../components/ExploreForeign'


class Foreign extends Component {
	_isMounted = false;

	state = {
		view: "explore",
		id: "",
		foreignName: "",

		loading: true
	}

	async componentDidMount(){
		this._isMounted = true;
		
		if (this._isMounted) {
			const { data: foreigns } = await getForeigns();
			
			
			this.setState({loading: false})	
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	foreignForm = () => {
		this.setState({
			view: "foreignForm"
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
						<Alert.Heading>Explore Foreign Recipes</Alert.Heading>				
						</center>
					</Alert>	
					<ExploreForeign/>
				</div>
			)
		}
		else if (this.state.view==="foreignForm") {
			return (
				<div>
					<Alert variant="success">
						<center>
						<Alert.Heading>Add New Foreign Recipe</Alert.Heading>				
						</center>
					</Alert>	
					<br />
					<CreateForeign />
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
					<h3>Foreigns</h3>
					<br />

					<Button variant="dark" onClick={this.explore}>
						Explore
					</Button>{' '}

					<Button variant="dark" onClick={this.foreignForm}>
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

export default Foreign