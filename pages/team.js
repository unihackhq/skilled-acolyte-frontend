import Head from '../components/head'
import { Container, Header } from 'semantic-ui-react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'

const Team = () => (
  <Container text>
    <Head title='My team' menuKey='team'></Head>
    <Header as='h1'>Team</Header>
  </Container>
)

export default withRedux(initStore)(Team)
