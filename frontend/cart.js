const user = JSON.parse(localStorage.getItem("User")) || []; //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ, JSON.parse dùng để chuyển chuỗi JSON thành object
console.log(user);
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.textContent = user[0].email;
  login.setAttribute('href','myaccount.html')
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

  const cartTable = document.getElementById("main-container-cart");

function renderCart(cart) {
  const listDiv = document.getElementById("show-cart");
  const firstTotal = document.getElementById("first-total");
  const lastTotal = document.getElementById("last-total");
  let total = cart.reduce((total, product) => total + product.price* product.quantity,0); //cộng dồn tất cả các phần tử trong mảng
  firstTotal.textContent = total.toLocaleString('vi-VN');
  lastTotal.textContent = (total*0.9).toLocaleString('vi-VN');
  listDiv.innerHTML = cart
    .map(
      (product) => `
         <tr>
        <td class="product">
          <button class="remove">x</button>
          <img src="${product.images[0]}" alt="Tour 3 Đảo VIP Nha Trang">
          <span class="title">${product.name}</span>
        </td>
        <td>${product.price.toLocaleString('vi-VN')}</td>
        <td>
          <div class="quantity">
            <button>-</button>
            <input type="number" value="${product.quantity}">
            <button>+</button>
          </div>
        </td>
        <td>${(product.price*product.quantity).toLocaleString('vi-VN')}</td>
      </tr>
            `
    )
    .join("");
}
if (cart.length > 0) {
renderCart(cart);
} else {
  cartTable.innerHTML=`<h2>Giỏ hàng rỗng<h2>`
}
