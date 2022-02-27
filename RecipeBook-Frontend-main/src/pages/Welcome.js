import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


class Welcome extends Component {
	
	render() {
		return (
			<div>
				<Container>
				<Alert variant="light">
					<center>
					<Image src="https://www.pngitem.com/pimgs/m/249-2490135_tablespoon-fork-icon-food-logo-icon-restaurant-hd.png" width="300" roundedCircle></Image>
					<br /><br />
					<Alert.Heading>RecipeBook</Alert.Heading>
					<hr />
					<p>Welcome To RecipeBook: Explore a variety of recipes</p>
					<hr />
					<p>
					</p>
					</center>

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
				</Alert>
				</Container>
			</div>
		)
	}
}

export default Welcome