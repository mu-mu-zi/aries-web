import classNames from 'classnames';
import Slider from 'react-slick';
import React from 'react';
import prevArrow from '../../assets/icon/icon_down.svg';
import nextArrow from '../../assets/icon/icon_rig.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Sider({ images }: {
  images: string[]
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [sliderIndex, setSliderIndex] = React.useState(0);

  return (
    <Slider
      {...settings}
      nextArrow={<img src={nextArrow} />}
      prevArrow={<img src={prevArrow} />}
      className={classNames('mx-auto', images.length > 1 ? 'w-[92%]' : 'w-full')}
      afterChange={(i) => setSliderIndex(i)}
      customPaging={(i) => (
        <div className={classNames('my-4 w-[8px] h-[8px] rounded-xl', i === sliderIndex ? 'gradient-border1' : 'bg-[#708077]')} />
      )}
    >
      {images.map((image) => (
        <div className="h-[400px] overflow-y-auto">
          <img src={image} className="block w-full object-contain" alt="" />
        </div>
      ))}
    </Slider>
  );
}
