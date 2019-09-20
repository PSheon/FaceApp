import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-animated-slider';

import { imageNameToPathConverter, avatarNameToPathConverter } from 'app/utils';

import 'react-animated-slider/build/horizontal.css';
import './styles/slider-animations.css';

function WidgetCarouselCard() {
  const CAROUSEL = useSelector(({ homePage }) => homePage.carousels);
  const carousels = CAROUSEL.docs;

  return (
    <Slider className="slider-wrapper">
      {carousels.filter(carousel => carousel.published).map(carousel => (
        <div
          key={carousel._id}
          className="slider-content"
          style={{ background: `url('${imageNameToPathConverter(carousel.imageName)}') no-repeat center center` }}
        >
          <div className="inner">
            <h1 className="whitespace-pre-line">{carousel.title}</h1>
            <p className="whitespace-pre-line">{carousel.subTitle}</p>
            <button className="slider-button">來去看看</button>
          </div>
          <section>
            <img src={avatarNameToPathConverter(carousel.author.photoURL)} alt={carousel.author.displayName} />
            <span>
              作者 <strong>{carousel.author.displayName}</strong>
            </span>
          </section>
        </div>
      ))}
    </Slider>
  )
}

export default WidgetCarouselCard;
