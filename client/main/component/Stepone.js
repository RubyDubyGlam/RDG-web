import React, { Component } from 'react'
import { Button, Input, Menu, Divider, Grid, Segment, Container, Card, Icon, Image, Step } from 'semantic-ui-react'

export default function(props) {
	return (
		<div>
		<Grid.Row centered style={{fontSize: '60px'}}>
			<p>Which services would you like to book?</p>
		</Grid.Row>
		<Grid.Row centered>
			<Menu widths={3} secondary stackable>
			<Menu.Item>
		  <Card>
		    <Image src='/assets/05.jpg' />
		    <Card.Content>
		      <Card.Header>
		        Hair
		      </Card.Header>
		      <Card.Meta>
		        <span className='date'>
		          $75
		        </span>
		      </Card.Meta>
		      <Card.Description>
		        Matthew is a musician living in Nashville.
		      </Card.Description>
		    </Card.Content>
		    <Card.Content extra>
		      <a>
		        <Icon name='user' />
		        Details
		      </a>
		    </Card.Content>
		  </Card>
			</Menu.Item>
			<Menu.Item>
		   <Card>
		    <Image src='/assets/03.jpg' />
		    <Card.Content>
		      <Card.Header>
		        Nails
		      </Card.Header>
		      <Card.Meta>
		        <span className='date'>
		          $75
		        </span>
		      </Card.Meta>
		      <Card.Description>
		        Matthew is a musician living in Nashville.
		      </Card.Description>
		    </Card.Content>
		    <Card.Content extra>
		      <a>
		        <Icon name='user' />
		        Details
		      </a>
		    </Card.Content>
		  </Card>
			</Menu.Item>
		<Menu.Item>
		   <Card>
		    <Image src='/assets/04.jpg' />
		    <Card.Content>
		      <Card.Header>
		        Makeup
		      </Card.Header>
		      <Card.Meta>
		        <span className='date'>
		          $75
		        </span>
		      </Card.Meta>
		      <Card.Description>
		        Matthew is a musician living in Nashville.
		      </Card.Description>
		    </Card.Content>
		    <Card.Content extra>
		      <a>
		        <Icon name='user' />
		        Details
		      </a>
		    </Card.Content>
		  </Card>
		</Menu.Item>
		  </Menu>
		</Grid.Row>
		</div>
	)
}