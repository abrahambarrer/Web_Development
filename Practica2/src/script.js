import { get_products, getProductsClassic } from "./services.js";

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
  const imageUrl = product.thumbnail || product.image || (product.images && product.images[0]) || "";
  modalImg.src = imageUrl;
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
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Ver detalles de ${product.title}`);

  const imageUrl = product.thumbnail || product.image || (product.images && product.images[0]) || "";

  card.innerHTML = `
    <img src="${imageUrl}" alt="${product.title}" loading="lazy">
    <h3 class="title">${product.title}</h3>
    <span class="price">$${product.price.toFixed(2)}</span>
  `;

  card.addEventListener("click", () => openModal(product));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(product);
    }
  });

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

// const init = async () => {
//   try {
//     const { products } = await get_products();
//     loader.style.display = "none";
//     renderProducts(products);
//   } catch (error) {
//     loader.style.display = "none";
//     productsGrid.innerHTML = `<p style="color: #ef4444; font-weight: 600; text-align: center; grid-column: 1 / -1;">Error al cargar datos con XMLHttpRequest: ${error.message}</p>`;
//     console.error("Error:", error);
//   }
// };

const init = () => {
  loader.style.display = "block";

  getProductsClassic(
    (products) => {
      loader.style.display = "none";
      renderProducts(products);
    },
    (error) => {
      loader.style.display = "none";
      productsGrid.innerHTML = `<p style="color: #ef4444; font-weight: 600; text-align: center; grid-column: 1 / -1;">Error al cargar datos con XMLHttpRequest: ${error.message}</p>`;
      console.error("Error al cargar productos:", error);
    }
  );
};

closeModalBtn.addEventListener("click", closeModal);

detailModal.addEventListener("click", (event) => {
  if (event.target === detailModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !detailModal.classList.contains("hidden")) {
    closeModal();
  }
});

init();