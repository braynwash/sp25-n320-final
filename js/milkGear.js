const gearItems = [
  {
    id: 1,
    name: "Venom Extractor Pump",
    price: 59.99,
    image: "extractor.jpg",
  },
  { id: 2, name: "Protective Gloves", price: 86.99, image: "gloves.jpg" },
  { id: 3, name: "Milking Beakers", price: 24.5, image: "beaker.jpg" },
  { id: 4, name: "Snake Tongs", price: 89.0, image: "tongs.jpg" },
];

const cart = [];

//init variables
const gearContainer = document.getElementById("gearContainer");
const cartModal = document.getElementById("cartModal");
const viewCartBtn = document.getElementById("viewCartBtn");
const closeCartBtn = document.querySelector(".closeCart");
const cartList = document.getElementById("cartList");

function renderGear() {
  gearItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "gear-card";
    card.innerHTML = `
        <h3>${item.name}</h3>
        <img src="../../assets/img/gear/${item.image}" alt="${
      item.name
    }" class="gear-img"/>
        <p>$${item.price.toFixed(2)}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      `;
    gearContainer.appendChild(card);
  });
}

function addToCart(id) {
  const item = gearItems.find((g) => g.id === id);
  if (item) {
    cart.push(item);
    alert(`${item.name} added to cart!`);
  }
}

function renderCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      renderCart();
    };
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
}

function checkoutCart() {
  if (cart.length > 0) {
    alert("Checkout complete! You’re ready to safely milk snakes.");
    cart.length = 0;
    renderCart();
    cartModal.style.display = "none";
  } else {
    alert("Please put some items in your cart.");
  }
}

viewCartBtn.onclick = () => {
  renderCart();
  cartModal.style.display = "block";
};

closeCartBtn.onclick = () => {
  cartModal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", renderGear);
