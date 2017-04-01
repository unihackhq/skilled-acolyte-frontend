import Head from '../components/head'
import { Container } from 'semantic-ui-react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'

const Index = () => (
  <Container text>
    <Head title='Home' menuKey='home'></Head>
    <p>Welcome 👋</p>
  </Container>
)

export default withRedux(initStore)(Index)
