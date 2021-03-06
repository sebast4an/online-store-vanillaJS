import { homeComponent, homeLoader } from '../components/home';
import { categoryProductsComponent, categoryProductsLoader } from '../components/categoryProducts';
import { userComponent, userLoader } from '../components/userPanel';
import { basketComponent, basketLoader } from '../components/basket';
import { productPageComponent, productPageLoader } from '../components/productPage';

(() => {
  const content = document.querySelector('.content');

  const routes = {
    '/': homeComponent,
    '/basket': basketComponent,
    '/user-panel': userComponent,
    '/electronics': categoryProductsComponent,
    '/jewelery': categoryProductsComponent,
    '/men%27s%20clothing': categoryProductsComponent,
    '/women%27s%20clothing': categoryProductsComponent,
    '/product-id': productPageComponent,
  };

  const loaderComponents = pathname => {
    window.history.pushState({}, pathname, window.location.origin + pathname);

    if (pathname.slice(1, 11) == 'product-id') {
      document.title = `Online Store - ${pathname.slice(1)}`;
      content.innerHTML = routes['/product-id'];
      productPageLoader(pathname.slice(12));
    } else {
      switch (pathname) {
        case '/basket':
          document.title = `Online Store - ${pathname.slice(1)}`;
          content.innerHTML = routes[pathname];
          basketLoader();
          break;
        case '/user-panel':
          document.title = `Online Store - Sign up or Sign in`;
          content.innerHTML = routes[pathname];
          userLoader();
          break;
        case '/electronics':
          document.title = `Online Store - ${pathname.slice(1)}`;
          content.innerHTML = routes[pathname];
          categoryProductsLoader('electronics');
          break;
        case '/jewelery':
          document.title = `Online Store - ${pathname.slice(1)}`;
          content.innerHTML = routes[pathname];
          categoryProductsLoader('jewelery');
          break;
        case '/men%27s%20clothing':
          document.title = `Online Store - ${decodeURI(pathname.slice(1))}`;
          content.innerHTML = routes[pathname];
          categoryProductsLoader('men%27s%20clothing');
          break;
        case '/women%27s%20clothing':
          document.title = `Online Store - ${decodeURI(pathname.slice(1))}`;
          content.innerHTML = routes[pathname];
          categoryProductsLoader('women%27s%20clothing');
          break;
        default:
          document.title = 'Online Store';
          content.innerHTML = routes['/'];
          homeLoader();
      }
    }
  };

  //first website loading
  content.innerHTML = routes[window.location.pathname];
  loaderComponents(document.location.pathname);

  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href) {
        loaderComponents('/');
      } else {
        loaderComponents(href);
      }
    });
  });

  window.addEventListener('popstate', () => {
    loaderComponents(window.location.pathname);
  });
})();
