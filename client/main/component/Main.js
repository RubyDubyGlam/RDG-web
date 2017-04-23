import React, { Component } from 'react'
import { Input, Menu, Divider, Grid, Segment, Container, Card, Icon, Image } from 'semantic-ui-react'

export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
    	<div style={{top: 0, right: 0, left: 0, bottom: 0, width: '100vw', height: '100vh', backgroundColor: '#383838'}}>
	      <Menu secondary stackable inverted style={{backgroundColor: 'black', height: 30, top:0}}>
	        <Menu.Menu position='right'>
	          <Menu.Item inverted name='my account' active={activeItem === 'logout'} onClick={this.handleItemClick} />
	          <Menu.Item inverted name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
	        </Menu.Menu>
	      </Menu>
	      <Menu secondary inverted style={{backgroundColor: '#383838', height: 30, top:30, paddingRight: 50, paddingLeft: 50}} widths={12}>
	          <Menu.Item inverted name='how it works' active={activeItem === 'logout'} onClick={this.handleItemClick} />
	          <Menu.Item inverted name='services' active={activeItem === 'logout'} onClick={this.handleItemClick} />
	          <Menu.Item inverted name='packages' active={activeItem === 'logout'} onClick={this.handleItemClick} />
	          <Menu.Item inverted name='book now' active={activeItem === 'logout'} onClick={this.handleItemClick} />
	      </Menu>
				<Grid column={1} container style={{width: '100%'}} textAlign='center' verticalAlign='middle'>
					<Grid.Column verticalAlign='middle'>
						<Grid.Row centered>
							Content
						</Grid.Row>
						<Grid.Row centered>
							Content
						</Grid.Row>
						<Grid.Row centered>
							Content
						</Grid.Row>
						<Grid.Row centered>
							<Menu widths={3} secondary stackable>
							<Menu.Item>
						  <Card>
						    <Image src='example/blog-secondary.jpg' />
						    <Card.Content>
						      <Card.Header>
						        Matthew
						      </Card.Header>
						      <Card.Meta>
						        <span className='date'>
						          Joined in 2015
						        </span>
						      </Card.Meta>
						      <Card.Description>
						        Matthew is a musician living in Nashville.
						      </Card.Description>
						    </Card.Content>
						    <Card.Content extra>
						      <a>
						        <Icon name='user' />
						        22 Friends
						      </a>
						    </Card.Content>
						  </Card>
							</Menu.Item>
							<Menu.Item>
						   <Card>
						    <Image src='example/gallery/03.jpg' />
						    <Card.Content>
						      <Card.Header>
						        Matthew
						      </Card.Header>
						      <Card.Meta>
						        <span className='date'>
						          Joined in 2015
						        </span>
						      </Card.Meta>
						      <Card.Description>
						        Matthew is a musician living in Nashville.
						      </Card.Description>
						    </Card.Content>
						    <Card.Content extra>
						      <a>
						        <Icon name='user' />
						        22 Friends
						      </a>
						    </Card.Content>
						  </Card>
							</Menu.Item>
						<Menu.Item>
						   <Card>
						    <Image src='example/gallery/04.jpg' />
						    <Card.Content>
						      <Card.Header>
						        Matthew
						      </Card.Header>
						      <Card.Meta>
						        <span className='date'>
						          Joined in 2015
						        </span>
						      </Card.Meta>
						      <Card.Description>
						        Matthew is a musician living in Nashville.
						      </Card.Description>
						    </Card.Content>
						    <Card.Content extra>
						      <a>
						        <Icon name='user' />
						        22 Friends
						      </a>
						    </Card.Content>
						  </Card>
						</Menu.Item>
						  </Menu>
						</Grid.Row>
					</Grid.Column>
				</Grid>
      </div>
    )
  }
}
