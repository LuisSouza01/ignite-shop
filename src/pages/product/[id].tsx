import Stripe from "stripe";
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from "next";

import { stripe } from "@/libs/stripe";
import { dynamicBlurDataUrl } from "@/utils/dynamicBlurDataUrl";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { useRouter } from "next/router";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    blurHash: string;
    description: string;
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h1>Loading...</h1>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={520}
          height={480}              
          blurDataURL={product.blurHash}
          placeholder="blur"
          loading="lazy"
        />
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
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await stripe.products.list();

  const productsId: {
    params: {
      id: string;
    }
  }[] = [];

  response.data.map((product) => productsId.push({ params: { id: product.id } }));

  return {
    paths: productsId,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id;

  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = response.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: response.id,
        name: response.name,
        imageUrl: response.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount as number / 100),
        blurHash: await dynamicBlurDataUrl(response.images[0]),
        description: response.description,
      },
    },
    revalidate: 60 * 60 * 24,
  }
}