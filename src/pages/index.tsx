import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'

import { stripe } from '../lib/stripe'
import { formatPrice } from '../utils/format-price'

import Link from 'next/link'
import { HomeContainer, Product } from '../styles/pages/home'

type Product = {
  id: string
  name: string
  price: number
  image_url: string
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {
        products?.map(product => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Product className='keen-slider__slide'>
              <Image src={product.image_url} width={520} height={420} alt="Camisa 1" />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        ))
      }
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = (await stripe.products.list({
    expand: ['data.default_price'] // expand the default_price object
  }))

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    
    return {
      id: product.id,
      name: product.name,
      price: price.unit_amount ? formatPrice((price.unit_amount / 100)) : formatPrice(0),
      image_url: product.images ? product.images[0] : null
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
