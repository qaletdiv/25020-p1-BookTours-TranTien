const user = JSON.parse(localStorage.getItem("User")) || []; //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ, JSON.parse dùng để chuyển chuỗi JSON thành object
console.log(user);
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.textContent = user[0].email;
  login.setAttribute('href','myaccount.html')
}
// const user = JSON.parse(localStorage.getItem("User")) || [];
// console.log(user);
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
//C1: Lưu newOrder vào Localstorage -> Show ra trên confirm booking
//C2: http://localhost:3000/order?idUserBought=11&_sort=id&_order=desc -> Show ra phần tử đầu tiên của mảng
