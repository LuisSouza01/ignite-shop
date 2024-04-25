import Stripe from 'stripe';
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { GetStaticProps } from 'next';

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { stripe } from "@/libs/stripe";

import { HomeContainer, Product } from "@/styles/pages/home";
import { dynamicBlurDataUrl } from "@/utils/dynamicBlurDataUrl";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    blurHash: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48, 
    }
  });

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`} 
            key={product.id} 
          >
            <Product className="keen-slider__slide">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={520}
                height={480}              
                blurDataURL={product.blurHash}
                placeholder="blur"
                loading="lazy"
              />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        ))}
        
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = await Promise.all(response.data.map(async (product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount as number / 100),
      blurHash: await dynamicBlurDataUrl(product.images[0]),
    }
  }));

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24,
  }
}