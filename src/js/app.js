// scss
import '../scss/main.scss';

//svg
import '../assets/icons/search.svg';
import '../assets/icons/user.svg';
import '../assets/icons/basket.svg';
import '../assets/icons/add-basket.svg';
import '../assets/icons/mail.svg';
import '../assets/icons/phone.svg';
import '../assets/icons/mail.svg';
import '../assets/icons/clock.svg';
import '../assets/icons/facebook.svg';
import '../assets/icons/instagram.svg';
import '../assets/icons/twitter.svg';
import '../assets/icons/map-pin.svg';

//img
import '../assets/img/test_baner.jpg';

//js
import './routing';
import './menu';
import './grabAndScroll';
import './input';
import './occasion';
import { getDataFromStoreAPI } from './products';
import { getCommentsFromCommentsAPI } from './comments';

window.addEventListener('locationchange', function () {
  console.log('location changed!');
});

window.addEventListener('DOMContentLoaded', () => {
  const recommendProducts = document.querySelector('.recommend__products');
  if (!recommendProducts) return;
  else getDataFromStoreAPI('products', recommendProducts, 6);

  const bestsellersProducts = document.querySelector('.bestsellers__products');
  if (!bestsellersProducts) return;
  else getDataFromStoreAPI('products', bestsellersProducts, 4);

  getCommentsFromCommentsAPI(8);

  window.addEventListener('popstate', function (event) {
    // Log the state data to the console
    console.log(event.state);
  });
});
