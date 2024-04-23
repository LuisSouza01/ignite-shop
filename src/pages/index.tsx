import Head from "next/head";
import Image from "next/image";
import Stripe from 'stripe';

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
          <Product key={product.id} className="keen-slider__slide">
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
        ))}
        
      </HomeContainer>
    </>
  );
}

export async function getServerSideProps() {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = await Promise.all(response.data.map(async (product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount as number / 100,
      blurHash: await dynamicBlurDataUrl(product.images[0]),
    }
  }));

  return {
    props: {
      products,
    },
  }
}