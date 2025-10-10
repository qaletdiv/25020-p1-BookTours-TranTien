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
  productDiv.innerHTML = `
        <div class="main-content">
          <section class="tour-general">
            <p class="tourId">
              <i class="fa-solid fa-ticket"></i> Mã tour:
              <span style="font-weight: 600">MIEN TRUNGDANANG</span>
            </p>
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
                alt=""
              />
            </div>
            <div class="image-4">
              <img
                src="${product.images[1]}"
                alt=""
              />
              <img
                src="${product.images[1]}"
                alt=""
              />
              <img
                src="${product.images[1]}"
                alt=""
              />
              <img
                src="${product.images[1]}"
                alt=""
              />
            </div>
          </section>
          <section class="infomation-tour">
            <div class="general">
              <h2>Tổng Quan</h2>
              <h3>Ưu Đãi</h3>
              <ul>
                <li>
                  <b>Không rủi ro Visa:</b> Hoàn 100% giá tour (Bao gồm Phí
                  Visa).
                </li>
                <li>
                  <b>Tiện lợi ngay khi bắt đầu:</b> Đưa đón tận nhà Miễn phí 2
                  chiều (nội thành Hà Nội).
                </li>
                <li><b>Duy trì kết nối:</b> Tặng sim 3G/4G.</li>
              </ul>
              <p style="margin-bottom: 1rem;">
                  <i
                    >Số lượng quà tặng có giới hạn và các khuyến mãi có điều
                    kiện áp dụng.</i
                  >
                </p>
              <h3>ĐIỂM NHẤN CHƯƠNG TRÌNH</h3>
              <ul>
                <li>
                  <b>Tham quan:</b> Quảng trường Stachusplatz, Quảng trường San
                  Marco, Cầu Than Thở, Nhà thờ Santa Maria, Khu phố cổ Lucerne,
                  Phố cổ Bern, Khải Hoàn Môn, Điện Invalides,….
                </li>
                <li><b>Lưu trú:</b> Khách sạn 3 - 4 sao.</li>
                <li>
                  <b>Ăn uống:</b> Thực đơn kết hợp Menu Châu Âu, Châu Á, bữa tối
                  sang trọng mang phong cách Châu Âu trên du thuyền sông Seine.
                </li>
                <li>
                  <b>Hoạt động khác:</b> Du thuyền sông Seine, tham quan
                  Gondola.
                </li>
              </ul>
              
            </div>
            <div class="booking">
              <div class="box-booking">
                <h3>Thông Tin Cơ Bản</h3>
                <ul>
                  <li>Khởi hành: ${product.startDate}</li>
                  <li>Tập trung: 20:10</li>
                  <li>Thời gian: ${product.duration}</li>
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
                  product //bấm vào nó sẽ gọi hàm addToCart bên dưới để truyền tham số vào
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


// Gọi hàm khi trang load
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
  updateCartCount(); // 🟢 Cập nhật số lượng trên icon
};


