const user = JSON.parse(localStorage.getItem("User")) || [];
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.innerHTML = '<i class="fa-solid fa-circle-user"></i> Tài Khoản Tôi';
  login.setAttribute('href','myaccount.html')
}
const url = new URL(window.location.href);
const id = url.searchParams.get("id"); 

async function layData(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi Fetch API (layData):", error);
    return null;
  }
}

async function layAllData(api) {
    try {
        const response = await fetch(api);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi Fetch API (layAllData):", error);
        return [];
    }
}

function renderSanPhamChiTiet(product) {
  const productDiv = document.getElementById("product-detail");
  if (!productDiv) return;


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

  const renderSchedule = (schedule) => {
    let html = '';
    if (schedule) {
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
                ${product.highlights.map(item => 
                  `<li><b>${item.split(':').length > 1 ? item.split(':')[0] + ':' : ''}</b> 
                  ${item.split(':').length > 1 ? item.split(':')[1].trim() : item}
                  </li>`)
                  .join('')}
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
          
          <section class="related-tours">
              <h2>TOUR DU LỊCH TƯƠNG TỰ</h2>
              <div class="product-list" id="related-products-container">
                  </div>
          </section>
        </div>
          `;
}

function renderRelatedTours(products) {
    const container = document.getElementById("related-products-container");
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = "<p>Không tìm thấy tour du lịch tương tự.</p>";
        return;
    }

    const html = products.map(product => `
        <div class="tour-card">
            <div class="tour-card-image">
                <a href="product-detail.html?id=${product.id}"><img src="${product.images[0]}" alt="${product.name}" /></a>
            </div>
            <div class="tour-card-body">
                <h4><a href="product-detail.html?id=${product.id}">${product.name}</a></h4>
                <p class="price">${product.price.toLocaleString("vi-VN")} VNĐ</p>
                <p class="duration"><i class="fa-solid fa-clock"></i> ${product.duration}</p>
                <p class="departure"><i class="fa-solid fa-location-dot"></i> ${product.destination}</p>
                <a href="product-detail.html?id=${product.id}" class="btn-detail">Xem Chi Tiết</a>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

async function findAndRenderRelatedTours(currentProduct) {
    const allProducts = await layAllData('http://localhost:3000/products');

    if (!allProducts || allProducts.length === 0) {
        return;
    }

    const currentId = currentProduct.id;
    const currentDestination = currentProduct.destination;
    const currentCategory = currentProduct.categoryid;
    const MAX_RELATED = 4; 

    let related = allProducts.filter(p => 
        p.id !== currentId && p.destination === currentDestination
    );
    
    if (related.length < MAX_RELATED) {
        const categoryRelated = allProducts.filter(p => 
            p.id !== currentId && p.categoryid === currentCategory && 
            !related.some(r => r.id === p.id) 
        );
        related = related.concat(categoryRelated);
    }

    related = related.slice(0, MAX_RELATED);

    renderRelatedTours(related);
}

layData(`http://localhost:3000/products/${id}`)
.then((product) => {
    if (product) {
        renderSanPhamChiTiet(product);
        findAndRenderRelatedTours(product); 
    } else {
        document.getElementById("product-detail").innerHTML = '<h1>Không tìm thấy tour này.</h1>';
    }
});


const cart = JSON.parse(localStorage.getItem("cart")) || [];
const addToCart = (product) => {
  let item = cart.find((p) => p.id === product.id);
  if (!item) {
    cart.push({ ...product, quantity: 1 });
  } else {
    item.quantity++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
   alert("🎉 Đặt hàng thành công! Sản phẩm đã được thêm vào giỏ hàng.");
   updateCartCount();
};

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = total;
};

updateCartCount();

const toggleBtn = document.getElementById("toggle");
const header = document.querySelector("header");

toggleBtn.addEventListener("click", () => {
  header.classList.toggle("active");
});