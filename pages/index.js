import Head from '../components/head'
import { Container } from 'semantic-ui-react'

export default () => (
  <Container text>
    <Head title='Home' menuKey='home'></Head>
    <p>Welcome 👋</p>
</Container>
)