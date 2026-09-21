import { get_products } from "./services.js";

const productsGrid = document.getElementById("products-grid");
const loader = document.getElementById("loader");

const detailModal = document.getElementById("detail-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalImg = document.getElementById("modal-img");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");

const openModal = (product) => {
  modalImg.src = product.image;
  modalImg.alt = product.title;
  modalCategory.textContent = product.category;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalPrice.textContent = `$${product.price.toFixed(2)}`;

  detailModal.classList.remove("hidden");
};

const closeModal = () => {
  detailModal.classList.add("hidden");
};

const createProductCard = (product) => {
  const card = document.createElement("article");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" loading="lazy">
    <h3 class="title">${product.title}</h3>
    <span class="price">$${product.price.toFixed(2)}</span>
  `;

  card.addEventListener("click", () => openModal(product));

  return card;
};

const renderProducts = (products) => {
  productsGrid.innerHTML = "";

  if (products.length === 0) {
    productsGrid.innerHTML = "<p>No se encontraron productos disponibles.</p>";
    return;
  }

  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    fragment.appendChild(createProductCard(product));
  });

  productsGrid.appendChild(fragment);
};

const init = async () => {
  const { products } = await get_products();
  
  loader.style.display = "none";

  renderProducts(products);
};

closeModalBtn.addEventListener("click", closeModal);

detailModal.addEventListener("click", (event) => {
  if (event.target === detailModal) {
    closeModal();
  }
});

init();