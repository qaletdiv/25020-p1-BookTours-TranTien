const user = JSON.parse(localStorage.getItem("User")) || [];
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.innerHTML = '<i class="fa-solid fa-circle-user"></i> Tài Khoản Tôi';
  login.setAttribute("href", "myaccount.html");
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartTable = document.getElementById("main-container-cart");

function renderCart(cart) {
  const listDiv = document.getElementById("show-cart");
  const firstTotal = document.getElementById("first-total");
  const lastTotal = document.getElementById("last-total");

let total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  firstTotal.textContent = total.toLocaleString("vi-VN");
  lastTotal.textContent = (total * 0.9).toLocaleString("vi-VN");

  listDiv.innerHTML = cart
    .map(
      (product, index) => `
         <tr>
            <td class="product">
              <button class="remove" data-index="${index}">x</button>
              <a style="text-decoration: none; color: inherit;" href="product-detail.html?id=${product.id}">
                <img src="${product.images[0]}" alt="${product.name}">
                <span class="title">${product.name}</span>
              </a>
            </td>
            <td>${product.price.toLocaleString("vi-VN")}</td>
            <td>
              <div class="quantity">
                <button class="minus" data-index="${index}">-</button>
                <input type="number" value="${product.quantity}" readonly>
                <button class="plus" data-index="${index}">+</button>
              </div>
            </td>
            <td>${(product.price * product.quantity).toLocaleString("vi-VN")}</td>
         </tr>
      `
    )
    .join("");

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll(".plus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(cart);
    });
  });

  document.querySelectorAll(".minus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        if (confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?")) {
          cart.splice(index, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(cart);
    });
  });

  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(cart);
      }
    });
  });
}

if (cart.length > 0) {
  renderCart(cart);
} else {
  cartTable.innerHTML = `<h2>Giỏ hàng rỗng</h2>`;
}

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = total;
};


updateCartCount();


const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find((p) => p.id === product.id);
  if (!item) {
    cart.push({ ...product, quantity: 1 });
    alert("🛒 Đặt hàng thành công!");
  } else {
    item.quantity++;
    alert("🛒 Tăng số lượng sản phẩm trong giỏ!");
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); 
};

const toggleBtn = document.getElementById("toggle");
const header = document.querySelector("header");

toggleBtn.addEventListener("click", () => {
  header.classList.toggle("active");
});
