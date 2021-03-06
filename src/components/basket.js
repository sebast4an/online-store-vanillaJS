import { basketStorage, clearBasket } from '../js/basketStorage';
import { baseURL, loaderAnimate } from '../js/globalFunctions';

export const basketComponent = `
            <section class="basket">
                <header class="basket__header header__bottomline">
                    <h2 class="header__bottomline--title header__bottomline--title">Your basket</h2>
                </header>
                <section class="basket__products basket-products">
                </section>
            </section>
            <section class="summary">
            </section>
            `;

export const basketLoader = () => {
  const idArray = [];

  for (const key of Object.keys(basketStorage)) {
    const whereId = key.indexOf('-');
    const id = key.substr(whereId + 1);
    idArray.push(id);
  }

  const renderProducts = (where, data) => {
    const fragment = document.createDocumentFragment();
    let summaryBasket = Number();

    const appendProducts = (id, data) => {
      const product = document.createElement('div');
      product.classList.add('basket-product');
      product.classList.add(`basket-product--id${id}`);

      const summaryProduct = Number(data[id]['price']) * Number(basketStorage[`product-${id}`]['pieces']);
      summaryBasket += summaryProduct;

      product.innerHTML = `
            <img class="basket-product__image" src="${data[id]['image']}" />
            <header class="basket-product__header ">
                <h2 class="basket-product__title header__bottomline--title">
                    ${data[id]['title']}
                </h2>
            </header>
            <section class="basket-product__information">
                <p class="basket-product__price">Price: ${data[id]['price']} $</p>
                <p class="basket-product__pieces">Pieces: ${basketStorage[`product-${id}`]['pieces']}
                <p class="basket-product__summary">
                    <strong> Together: ${summaryProduct} $ </strong>
                </p>
            </section>
      `;
      fragment.appendChild(product);
    };
    idArray.forEach(id => appendProducts(id, data));
    where.innerHTML = ``;
    where.append(fragment);
    console.log(summaryBasket);

    const summaryContainer = document.querySelector('.summary');
    summaryContainer.innerHTML = `
      <header class="header__bottomline">
        <h2 class="header__bottomline--title">Total: ${summaryBasket} $</h2>
      </header> 
      <p class="summary__info"> 
        <span>Thank you for testing the mini demo of the store.</span>
        <span> I wrote it for the purpose of refreshing my skills in pure javascript. </span>
        <button type="button" class="summary__clearbasketbutton">
          <span>Clear basket</span>
        </button>
      </p>
        `;

    summaryContainer.querySelector('.summary__clearbasketbutton').addEventListener('click', () => {
      clearBasket();
      location.reload();
    });
  };

  const getDataFromStoreAPI = async where => {
    const URL = `${baseURL}/products`;
    if (!where) return;
    loaderAnimate(where);

    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      renderProducts(where, data);
    } catch (error) {
      where.innerText = 'Error loading data. Please reload page.';
    }
  };

  const container = document.querySelector('.basket-products');
  getDataFromStoreAPI(container);
};
