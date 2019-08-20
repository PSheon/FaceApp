import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-animated-slider';

import { imageNameToPathConverter, avatarNameToPathConverter } from 'app/utils';

import 'react-animated-slider/build/horizontal.css';
import './styles/slider-animations.css';

// const content = [
//   {
//     title: 'Vulputate Mollis Ultricies Fermentum Parturient',
//     description:
//       'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
//     button: 'Read More',
//     image: 'https://i.imgur.com/ZXBtVw7.jpg',
//     user: 'Luan Gjokaj',
//     userProfile: 'https://i.imgur.com/JSW6mEk.png'
//   },
//   {
//     title: 'Tortor Dapibus Commodo Aenean Quam',
//     description:
//       'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
//     button: 'Discover',
//     image: 'https://i.imgur.com/DCdBXcq.jpg',
//     user: 'Erich Behrens',
//     userProfile: 'https://i.imgur.com/0Clfnu7.png'
//   },
//   {
//     title: 'Phasellus volutpat metus',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
//     button: 'Buy now',
//     image: 'https://i.imgur.com/DvmN8Hx.jpg',
//     user: 'Bruno Vizovskyy',
//     userProfile: 'https://i.imgur.com/4KeKvtH.png'
//   }
// ];

function WidgetCarouselCard() {
  const carousels = useSelector(({ homePage }) => homePage.carousels.docs);

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
            <button>來去看看</button>
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
