const user = JSON.parse(localStorage.getItem("User")) || []; //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ, JSON.parse dùng để chuyển chuỗi JSON thành object
console.log(user);
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.innerHTML = '<i class="fa-solid fa-circle-user"></i> Tài Khoản Tôi';
  login.setAttribute('href','myaccount.html')
}
// const user = JSON.parse(localStorage.getItem("User")) || [];
// console.log(user);
const idUser = user[0].id;
const nameuser = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("e-mail");
const birthday = document.getElementById("my-birthday");
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
    if (data.birthday) {
      birthday.value = data.birthday;
    }
    if (data.email) {
      email.value = data.email;
    }
  } catch (error) {
    console.error("lỗi", error);
  }
};

saveButton.addEventListener("click", async (event) => {
  const gender = document.querySelector('input[name="gender"]:checked');
  console.log(
    nameuser.value,
    phone.value,
    birthday.value,
    email.value,
    gender.value,
    idUser
  );
  try {
    const updateUser = {
      name: nameuser.value,
      email: email.value,
      phone: phone.value,
      birthday: birthday.value,
      gender: gender.value,
    };
    await fetch(`http://localhost:3000/users/${idUser}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateUser),
    });
  } catch (error) {
    console.error("Lỗi", error);
  }
});
renderInfo();

const logoutBtn = document.querySelector(".person-info.logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("User");

  alert("Bạn đã đăng xuất thành công!");
  window.location.href = "login.html"; 
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

const toggleBtn = document.getElementById("toggle");
const header = document.querySelector("header");

toggleBtn.addEventListener("click", () => {
  header.classList.toggle("active");
});