import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { Loading } from '../../components/Loading'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import { formatPrice } from '../../utils/format-price'

interface ProductProps {
  product: {
    id: string
    name: string
    image_url: string
    price: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return(
      <Loading />
    )
  }
  
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.image_url} alt={product.name}  width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>
        
        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [
      {
        params: {
          id: 'prod_Nm55717BuTMHvd'
        }
      }
    ], 
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        image_url: product.images[0],
        price: price.unit_amount ? formatPrice(price.unit_amount / 100) : formatPrice(0),
        description: product.description
      }
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}