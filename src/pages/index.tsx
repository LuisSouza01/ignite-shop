import Head from "next/head";
import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";

import shirtOne from "@/../public/assets/shirt_1.png";
import shirtTwo from "@/../public/assets/shirt_2.png";
import shirtThree from "@/../public/assets/shirt_3.png";

import "keen-slider/keen-slider.min.css";
import { HomeContainer, Product } from "@/styles/pages/home";

export default function Home() {
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
        <meta charSet="UTF-8"></meta>
        <meta name="description" content="Free Web tutorials"></meta>
        <meta name="keywords" content="HTML, CSS, JavaScript"></meta>
        <meta name="author" content="John Doe"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        <Product className="keen-slider__slide">
          <Image 
            src={shirtOne}
            alt="Camiseta"
            width={520}
            height={480}
          />

          <footer>
            <strong>Camiseta x</strong>
            <span>R$ 99,90</span>
          </footer>
        </Product>

        <Product className="keen-slider__slide">
          <Image 
            src={shirtTwo}
            alt="Camiseta"
            width={520}
            height={480}
          />

          <footer>
            <strong>Camiseta x</strong>
            <span>R$ 99,90</span>
          </footer>
        </Product>

        <Product className="keen-slider__slide">
          <Image 
            src={shirtThree}
            alt="Camiseta"
            width={520}
            height={480}
          />

          <footer>
            <strong>Camiseta x</strong>
            <span>R$ 99,90</span>
          </footer>
        </Product>

        <Product className="keen-slider__slide">
          <Image 
            src={shirtThree}
            alt="Camiseta"
            width={520}
            height={480}
          />

          <footer>
            <strong>Camiseta x</strong>
            <span>R$ 99,90</span>
          </footer>
        </Product>
      </HomeContainer>
    </>
  );
}


export async function getStaticProps() {
  return {
    props: {},
    revalidate: 60 * 60 * 24,
  }
}