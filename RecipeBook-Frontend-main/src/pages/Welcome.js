import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'


class Welcome extends Component {
	
	render() {
		return (
			<div>
				<Container>
				<Alert variant="light">
					<center>
					<Alert.Heading>RecipeBook</Alert.Heading>
					<p>Welcome To RecipeBook: Explore a variety of recipes</p>
					<Image src="https://i.pinimg.com/originals/4e/95/ff/4e95ff2406e7914e70cbbba6dd9c51d2.jpg" width="500" roundedCircle></Image>
					<hr />
					<p>
					</p>
					</center>	
				</Alert>
				</Container>
			</div>
		)
	}
}

export default Welcome