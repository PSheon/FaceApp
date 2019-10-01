import React from 'react';
import { Link } from 'react-router-dom';
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
      {carousels
        .filter(carousel => carousel.published)
        .map(carousel => (
          <div
            key={carousel._id}
            className="slider-content"
            style={{
              background: `url('${imageNameToPathConverter(
                carousel.imageName
              )}') no-repeat center center`
            }}
          >
            <div className="inner">
              <h1 className="whitespace-pre-line">{carousel.title}</h1>
              <p className="whitespace-pre-line">{carousel.subTitle}</p>
              {carousel.linkAddress ? (
                <a
                  href={carousel.linkAddress}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slider-button"
                >
                  來去看看
                </a>
              ) : (
                <Link
                  component="button"
                  to="/events-list"
                  className="slider-button"
                >
                  看看 YS 最新活動
                </Link>
              )}
            </div>
            <section>
              <img
                src={avatarNameToPathConverter(carousel.author.photoURL)}
                alt={carousel.author.displayName}
              />
              <span>
                作者 <strong>{carousel.author.displayName}</strong>
              </span>
            </section>
          </div>
        ))}
    </Slider>
  );
}

export default WidgetCarouselCard;
