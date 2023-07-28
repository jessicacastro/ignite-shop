import Image from 'next/image'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }) {
 return(
   <Container>
    <Header>
      <title>Ignite Shop</title>
      <Image src={logoImg} alt="Ignite Shop" />
    </Header>
    <Component {...pageProps} />
   </Container> 
 )
}
