const user = JSON.parse(localStorage.getItem("User")) || []; //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ, JSON.parse dùng để chuyển chuỗi JSON thành object
console.log(user);
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.innerHTML = '<i class="fa-solid fa-circle-user"></i> Tài Khoản Tôi';
  login.setAttribute('href','myaccount.html')
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

const lastOrder = JSON.parse(localStorage.getItem("newOrder"));
console.log(lastOrder);

const tours = lastOrder.order.map(o => o.name).join(", "); //in ra từng tên tour

function renderSanPham(cart) {
  const listDiv = document.getElementById("show-cart");
  const lastTotal = document.getElementById("last-total");
  let total = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  ); 
  lastTotal.textContent = (total * 0.9).toLocaleString("vi-VN");
  listDiv.innerHTML = `
    <h3 style="margin-bottom:15px;">Tóm Tắt Đơn Đặt Tour</h3>
    <div class="row"><span>Họ và Tên:</span><span class="name">${lastOrder.name}</span></div>
    <div class="row"><span>Email:</span><span class="email">${lastOrder.email}</span></div>
    <div class="row"><span>Số điện thoại:</span><span class="phone">${lastOrder.phone}</span></div>
    <div class="row"><span>Địa chỉ:</span><span class="adress">${lastOrder.address}</span></div>
    <div class="row"><span>Tên tour:</span><span class="tour">${tours}</span></div>
            `
}
renderSanPham(cart);

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = total;
};

// Gọi hàm khi trang load
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
  updateCartCount(); // 🟢 Cập nhật số lượng trên icon
};

const toggleBtn = document.getElementById("toggle");
const header = document.querySelector("header");

toggleBtn.addEventListener("click", () => {
  header.classList.toggle("active");
});
