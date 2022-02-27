import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


import Welcome from './Welcome'
import Local from './Local'
import Foreign from './Foreign'
import Settings from './Settings'



class Home extends Component {
	state = {
		view: "welcome",
		payload: ""
	}


	welcome = () => {
		this.setState({
			view: "welcome"
		})
	}

	local = () => {
		this.setState({
			view: "local"
		})
	}
	
	foreign = () => {
		this.setState({
			view: "foreign"
		})
	}

	
	settings = () => {
		this.setState({
			view: "settings"
		})
	}

	
	
	renderView = () => {
		if (this.state.view==="welcome") {
			return <Welcome />
		}
		else if (this.state.view==="local") {
			return <Local />
		}
		else if (this.state.view==="foreign") {
			return <Foreign />
		}
		else if (this.state.view==="settings") {
			return <Settings user={this.props.user} />
		}
		
	}

	render() {
		return (
			<div>
				<Navbar expand="lg" bg="info" variant="info">
				    <Navbar.Brand>
				    	RecipeBook
				    </Navbar.Brand>
				    <Nav className="ml-auto">
						
				    <Nav.Link>
				      	<Button variant="info" onClick={this.local}>
							Local Recipes
						</Button>{' '}
				    </Nav.Link>

				    <Nav.Link>
				      	<Button variant="info" onClick={this.foreign}>
							Foreign Recipes
						</Button>{' '}
				    </Nav.Link>

				    <Nav.Link>
				      	<Button variant="info" onClick={this.settings}>
							Sign Out
						</Button>{' '}
				    </Nav.Link>
				  	</Nav>
				</Navbar>
					
				<br />

				{this.renderView()}

				<div>
					<br/><br/>
					<br/><br/>
				</div>	
			</div>
		)
	}
}

export default Home