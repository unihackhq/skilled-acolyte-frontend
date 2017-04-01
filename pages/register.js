import React from 'react'
import {Button, Checkbox, Container, Dropdown, Form, Header} from 'semantic-ui-react'

import Head from '../components/head'

const eventOptions =
    [
      {
        text: 'UNIHACK MINI 2017',
        value: 'UHM2017',
        image:
            {avatar: true, src: 'http://unihack.net/img/UniHack_U_White.png'},
      },
      {
        text: 'UNIHACK 2017',
        value: 'UH2017',
        image:
            {avatar: true, src: 'http://unihack.net/img/UniHack_U_White.png'},
      },
    ]

    const FormExampleForm = () => (
        <Container text>
            <Head title='Register' menuKey='register'></Head>
            <Form>
                <Header as='h2'>Register</Header>
                <Form.Field>
                    <Dropdown placeholder = 'Event' fluid selection options={eventOptions} />
                    </Form.Field>
                <Form.Field>
                    <label>Email Address</label>
                    <input type="email" placeholder='Email Address' required/>
                </Form.Field>
                <Form.Field>
                    <label>Eventbrite Order #</label>
                    <input type = 'text' placeholder = 'Eventbrite Order #' required />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )

        export default FormExampleForm