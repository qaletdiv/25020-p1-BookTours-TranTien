const user = JSON.parse(localStorage.getItem("User")) || []; //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ, JSON.parse dùng để chuyển chuỗi JSON thành object
console.log(user);

// 🧠 Kiểm tra đăng nhập
if (user.length === 0) {
  alert("⚠️ Vui lòng đăng nhập để tiếp tục thanh toán!");
  window.location.href = "login.html"; // Chuyển hướng về trang đăng nhập
} else {
  const login = document.querySelector("#login");
  login.innerHTML = '<i class="fa-solid fa-circle-user"></i> Tài Khoản Tôi';
  login.setAttribute("href", "myaccount.html");
}


const idUser = user[0].id;
const nameuser = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("e-mail");
const saveButton = document.querySelector(".btn-save");
const renderInfo = async () => {
  try {
    const response = await fetch(`http://localhost:3000/users/${idUser}`);
    const data = await response.json();
    console.log(data);
    if (data.name) {
      nameuser.value = data.name;
    }
    if (data.phone) {
      phone.value = data.phone;
    }
    if (data.email) {
      email.value = data.email;
    }
    if (data.address) {
      address.value = data.address;
    }
  } catch (error) {
    console.error("lỗi", error);
  }
};

saveButton.addEventListener("click", async (event) => {
  const address = document.getElementById("address");
  console.log(nameuser.value, phone.value, email.value, idUser);
  try {
    const update = {
      name: nameuser.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
    };
    await fetch(`http://localhost:3000/users/${idUser}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
  } catch (error) {
    console.error("Lỗi", error);
  }
});
renderInfo();

const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);
function renderSanPham(cart) {
  const listDiv = document.querySelector(".booking-tour");
  console.log(listDiv);
  const lastTotal = document.getElementById("last-total");
  let total = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  lastTotal.textContent = (total * 0.9).toLocaleString("vi-VN");
  listDiv.innerHTML = cart
    .map(
      (product) => `
                <p class="tourName">
                ${product.name}
                </p>
                <p class="timing">${product.durationRange}</p>
                <p class="startdes">
                  <i class="fa-solid fa-plane"></i> Nơi khởi hành:
                  <span style="font-weight: 600">${product.departure}</span>
                </p>
                <hr>
            `
    )
    .join("");
}
renderSanPham(cart);

const booking = document.querySelector(".btn-tour");
booking.addEventListener("click", async (event) => {
  try {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo 2 chữ số
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Lấy tháng (cộng 1) và đảm bảo 2 chữ số
    const year = today.getFullYear(); // Lấy năm đầy đủ

    const formattedDate = `${day}/${month}/${year}`;

    console.log(formattedDate); // Ví dụ: "26/09/2023"
    const newOrder = {
      iduser: idUser,
      name: nameuser.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      order: cart,
      createat: formattedDate,
    };
    await fetch(`http://localhost:3000/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });
    localStorage.setItem("newOrder", JSON.stringify(newOrder));
  } catch (error) {
    console.error("Lỗi", error);
  }
});

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
