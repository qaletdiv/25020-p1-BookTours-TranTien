const user = JSON.parse(localStorage.getItem("User")); //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ
console.log(user);
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.textContent = user[0].email;
}

async function layData(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi Fetch API (async/await):", error);
    return [];
  }
}
function renderSanPham(products) {
  const listDiv = document.getElementById("all-tour");
  if (!listDiv) return;
  listDiv.innerHTML = products
    .map(
      (product) => `
                <div class="tour">
                <div class="tour-img">
                  <img
                    src="${product.images[0]}"
                    alt=""
                  />
                </div>
                <p class="timing">${product.duration}</p>
                <p class="tourName">
                  ${product.name}
                </p>
                <p class="tourId">
                  <i class="fa-solid fa-ticket"></i> Mã tour:
                  <span style="font-weight: 600">MIEN TRUNGDANANG</span>
                </p>
                <p class="startdes">
                  <i class="fa-solid fa-plane"></i> Nơi khởi hành:
                  <span style="font-weight: 600">TP Hồ Chí Minh</span>
                </p>
                <p>
                  <span style="color: red; font-weight: 650; font-size: 1.3rem"
                    >${product.price.toLocaleString('vi-VN')}
                  </span>
                  <span style="color: red; font-weight: 650; font-size: 0.8rem"
                    >VNĐ</span
                  >
                </p>
              </div>
            `
    )
    .join("");
}

// Gọi hàm async để fetch và xử lý sản phẩm
layData("http://localhost:3000/products").then(products => renderSanPham(products));

const selectTour = document.getElementById("category-filter");
selectTour.addEventListener("change", (event) => {
  const id = event.target.value;
  console.log(id);
  layData(`http://localhost:3000/products?categoryid=${id}`).then(products => renderSanPham(products));
})

const sortTour = document.getElementById("sort-tours");
sortTour.addEventListener("change", (event)=>{
  const upDown = event.target.value;
  layData(`http://localhost:3000/products?_sort=price&_order=${upDown}`).then(products => renderSanPham(products));
})
