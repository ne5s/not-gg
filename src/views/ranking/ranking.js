import * as Api from '/api.js';

const fetchProductList = async () => {
	try {
	  const productList = await Api.get('/api/product/list');
document.querySelector('#producItemContainer').insertAdjacentHTML(
	'afterbegin',
	`${productList
	  .map(
		(product) =>
		  `
		  <div class="message product-item imageSort" data-category-name="${
			product.productCategory
		  }" data-product-name="${product.productName}">
			<div class="media-left">
			  <figure class="image">
				<img src="${product.productImage}" alt="제품 이미지" />
			  </figure>
			</div>
			<div class="media-content">
				<div class="content">
				  <p class="title">
					${product.productName}
				  </p>
				  <p class="description">
					${product.productShortDes}
				  </p>
				  <p class="price">${addCommas(product.productPrice)}원</p>
				</div>
			  </div>  
			</div>
		  `
	  )
	  .join('')}`
  );
} catch (err) {
  console.error(err.stack);
  alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
}
};

// topbutton
let topBtn = document.querySelector('.top-circle');

window.addEventListener('scroll', () => {
	if (this.scrollY > 200) {
		topBtn.classList.add('on');
	} else {
		topBtn.classList.remove('on');
	}
});

topBtn.addEventListener('click', (e) => {
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
