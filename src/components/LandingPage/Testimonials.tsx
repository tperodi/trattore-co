import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Testimonial {
  quote: string;
  name: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'EventiPrenota ha reso la mia esperienza di prenotazione facilissima!',
    name: 'Maria Rossi',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    quote: 'Un servizio affidabile con un supporto clienti eccellente.',
    name: 'Luca Bianchi',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    quote: 'Ho trovato offerte incredibili per eventi che adoro.',
    name: 'Giulia Verdi',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

const Testimonials: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        Cosa dicono i nostri clienti
      </h2>
      <div className="container mx-auto px-6">
  <Slider {...settings}>
    {testimonials.map((testimonial, index) => (
      <div
        className="flex flex-col items-center text-center px-4"
        key={index}
      >
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          className="w-24 h-24 rounded-full mb-6"
        />
        <p className="text-xl italic mb-4">"{testimonial.quote}"</p>
        <h4 className="text-lg font-semibold">- {testimonial.name}</h4>
      </div>
    ))}
  </Slider>
</div>

    </section>
  );
};

export default Testimonials;
