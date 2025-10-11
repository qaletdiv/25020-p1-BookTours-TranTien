const user = JSON.parse(localStorage.getItem("User")) || []; //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ, JSON.parse dùng để chuyển chuỗi JSON thành object
console.log(user);
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.innerHTML = '<i class="fa-solid fa-circle-user"></i> Tài Khoản Tôi';
  login.setAttribute('href','myaccount.html')
}
const url = new URL(window.location.href); //lấy toàn bộ đường dẫn và phân tích
const id = url.searchParams.get("id"); //lấy ra giá trị của tham số id trên URL
console.log(id);

async function layData(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi Fetch API (async/await):", error);
    return [];
  }
}
function renderSanPhamChiTiet(product) {
  const productDiv = document.getElementById("product-detail");
  if (!productDiv) return;

  // Hàm helper để tạo HTML cho chi tiết giá (Included/Excluded)
  const renderPriceDetails = (details) => {
    let html = '';
    if (details && details.included && details.excluded) {
      html += `
        <div class="price-included" style="margin-bottom: 1.5rem;">
          <h4 style="color: green; margin-bottom: 0.5rem;"><i class="fa-solid fa-circle-check"></i> GIÁ TOUR BAO GỒM:</h4>
          <ul>
            ${details.included.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="price-excluded">
          <h4 style="color: red; margin-bottom: 0.5rem;"><i class="fa-solid fa-circle-xmark"></i> GIÁ TOUR KHÔNG BAO GỒM:</h4>
          <ul>
            ${details.excluded.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    return html;
  };

  // Hàm helper để tạo HTML cho lịch trình (Schedule)
  const renderSchedule = (schedule) => {
    let html = '';
    if (schedule) {
      // Chuyển object schedule thành mảng các cặp [key, value] để lặp
      const scheduleEntries = Object.entries(schedule);
      html += '<ul>';
      scheduleEntries.forEach(([key, value], index) => {
        html += `
          <li style="margin-bottom: 1rem;">
            <b style="color: #007bff;">Ngày ${index + 1}:</b> ${value}
          </li>
        `;
      });
      html += '</ul>';
    }
    return html;
  };

  const renderPolicy = (policy) => {
    let html = '';
    if (policy) {
      html += `
        <div class="policy-booking" style="margin-bottom: 1rem;">
          <h4 style="color: #ff9900; margin-bottom: 0.5rem;"><i class="fa-solid fa-clipboard-list"></i> CHÍNH SÁCH ĐĂNG KÝ:</h4>
          <p>${policy.booking}</p>
        </div>
        <div class="policy-cancellation" style="margin-bottom: 1rem;">
          <h4 style="color: #ff9900; margin-bottom: 0.5rem;"><i class="fa-solid fa-ban"></i> CHÍNH SÁCH HỦY TOUR:</h4>
          <p>${policy.cancellation}</p>
        </div>
        <div class="policy-notes">
          <h4 style="color: #ff9900; margin-bottom: 0.5rem;"><i class="fa-solid fa-circle-info"></i> LƯU Ý:</h4>
          <p>${policy.notes}</p>
        </div>
      `;
    }
    return html;
  };


  productDiv.innerHTML = `
        <div class="main-content">
          <section class="tour-general">
            <p class="tourId">
              <i class="fa-solid fa-ticket"></i> Mã tour:
              <span style="font-weight: 600">MIEN TRUNGDANANG</span> </p>
            <div class="tour-name">
              <h2 class="tourName">
              ${product.name}
              </h2>
              <p>
                <span style="color: red; font-weight: 650; font-size: 1.75rem"
                  >${product.price.toLocaleString("vi-VN")}
                </span>
                <span style="color: red; font-weight: 650; font-size: 1.5rem"
                  >VNĐ</span
                >
              </p>
            </div>
            <div class="info">
              <p class="timing">${product.duration}</p>
              <p class="startdes">
                <i class="fa-solid fa-plane"></i> Nơi khởi hành:
                <span style="font-weight: 600">${product.departure}</span>
              </p>
            </div>
          </section>
          <section class="tour-image">
            <div class="image-1">
              <img
                class="img1"
                src="${product.images[0]}"
                alt="${product.name} - ảnh 1"
              />
            </div>
            <div class="image-4">
              <img
                src="${product.images[1]}"
                alt="${product.name} - ảnh 2"
              />
              <img
                src="${product.images[1]}"
                alt="${product.name} - ảnh 3"
              />
              <img
                src="${product.images[1]}"
                alt="${product.name} - ảnh 4"
              />
              <img
                src="${product.images[1]}"
                alt="${product.name} - ảnh 5"
              />
            </div>
          </section>
          <section class="infomation-tour">
            
            <div class="general">
              <h2>TỔNG QUAN</h2>
              <p>${product.description}</p>
              
              <h3 style="margin-top: 1.5rem; color: #007bff;">ĐIỂM NHẤN CHƯƠNG TRÌNH</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                ${product.highlights.map(item => `<li><b>${item.split(':').length > 1 ? item.split(':')[0] + ':' : ''}</b> ${item.split(':').length > 1 ? item.split(':')[1].trim() : item}</li>`).join('')}
              </ul>
              <hr style="margin: 20px 0;">

              <h2 style="color: #28a745;">LỊCH TRÌNH CHI TIẾT</h2>
              ${renderSchedule(product.schedule)}
              <hr style="margin: 20px 0;">

              <h2 style="color: #dc3545;">CHI TIẾT GIÁ TOUR</h2>
              ${renderPriceDetails(product.priceDetails)}
              <hr style="margin: 20px 0;">

              <h2 style="color: #6f42c1;">CHÍNH SÁCH VÀ QUY ĐỊNH</h2>
              ${renderPolicy(product.policy)}
            </div>
            <div class="booking">
              <div class="box-booking">
                <h3>Thông Tin Cơ Bản</h3>
                <ul>
                  <li>Khởi hành: ${product.startDate}</li>
                  <li>Thời gian: ${product.duration}</li>
                  <li>Phương tiện: ${product.departure.includes('sân bay') || product.name.includes('Tour trọn gói') ? 'Máy Bay + Xe Ôtô' : 'Xe Ôtô'}</li>
                </ul>
                <p>
                  <span style="color: red; font-weight: 650; font-size: 2rem"
                    >${product.price.toLocaleString("vi-VN")}
                  </span>
                  <span style="color: red; font-weight: 650; font-size: 1.75rem"
                    >VNĐ</span
                  >
                </p>
                <button class="btn-tour" onclick='addToCart(${JSON.stringify(
                  product
                )})'>Đặt Ngay</button> 
              </div>
            </div>
          </section>
        </div>
          `;
}

// Gọi hàm async để fetch và xử lý sản phẩm
layData(`http://localhost:3000/products/${id}`).then((product) =>
  renderSanPhamChiTiet(product)
);

const cart = JSON.parse(localStorage.getItem("cart")) || []; //Nghĩa là mỗi lần load trang, giỏ hàng sẽ được khởi tạo lại từ dữ liệu đã lưu trước đó.
const addToCart = (product) => { //Ta có hàm từ onclick truyền vào là {id: 1, name: "Tour Đà Nẵng", ...} hay product = {id: 1, name: "Tour Đà Nẵng", ...}
  console.log(product);
  let item = cart.find((p) => p.id === product.id); //tìm trong giỏ hàng có sản phẩm nào có cùng id với sản phẩm product đang muốn thêm hay không. 
  if (!item) {
    cart.push({ ...product, quantity: 1 }); //Thêm một sản phẩm mới vào giỏ hàng, dùng ...product để copy toàn bộ thông tin sản phẩm từ product và gán thêm thuộc tính quantity: 1 để quản lý số lượng.
    console.log(cart);
  } else {
    item.quantity++; //nếu có rồi thì thêm 1
  }
  localStorage.setItem("cart", JSON.stringify(cart));
   alert("🎉 Đặt hàng thành công! Sản phẩm đã được thêm vào giỏ hàng.");
};

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = total;
};


updateCartCount();


const addCart = (product) => {
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