const user = JSON.parse(localStorage.getItem("User")) || []; //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ, JSON.parse dùng để chuyển chuỗi JSON thành object
console.log(user);
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.innerHTML = '<i class="fa-solid fa-circle-user"></i> Tài Khoản Tôi';
  login.setAttribute('href','myaccount.html')
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
                  <a href="product-detail.html?id=${product.id}">  
                <img
                    src="${product.images[0]}"
                    alt=""
                  />
                  </a>
                </div>
                <p class="timing">${product.duration}</p>
                <a style="text-decoration: none; color: inherit;" href="product-detail.html?id=${product.id}"><p class="tourName">${product.name}</p></a>
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

layData("http://localhost:3000/products").then(products => renderSanPham(products));

async function layData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Lỗi khi tải dữ liệu");
  return res.json();
}

async function layData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Lỗi khi tải dữ liệu");
  return res.json();
}

document.getElementById("tourFilterForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const destination = document.getElementById("destination").value.trim().toLowerCase();
  const departure = document.getElementById("departure").value;
  const startDate = document.getElementById("startDate").value;
  const durationRange = document.getElementById("durationRange").value;
  const priceMin = document.getElementById("priceMin").value;
  const priceMax = document.getElementById("priceMax").value;

  const tours = await layData("http://localhost:3000/products");

  const filteredTours = tours.filter((tour) => {
    const matchDestination =
      destination === "" || tour.destination.toLowerCase().includes(destination);

    const matchDeparture = departure === "" || tour.departure === departure;

    const matchStartDate = startDate === "" || tour.startDate === startDate;

    const matchDuration = (() => {
      if (durationRange === "") return true;

      const [min, max] = durationRange.split("-").map(Number);

      const tourDays = parseInt(tour.duration.match(/\d+/)?.[0] || 0, 10);
      return tourDays >= min && tourDays <= max;
    })();

    const matchPrice = (() => {
      const price = Number(tour.price);
      if (priceMin && price < Number(priceMin)) return false;
      if (priceMax && price > Number(priceMax)) return false;
      return true;
    })();

    return matchDestination && matchDeparture && matchStartDate && matchDuration && matchPrice;
  });

  // Hiển thị tour lọc được
  const resultContainer = document.getElementById("all-tour");
  resultContainer.innerHTML = filteredTours.length
    ? filteredTours
        .map(
          (tour) => `
      <div class="tour">
        <a style="text-decoration:none;color:inherit;" href="product-detail.html?id=${tour.id}">
          <div class="tour-img"><img src="${tour.images[0]}" alt="${tour.name}"></div>
          <p class="timing">${tour.duration}</p>
          <p class="tourName">${tour.name}</p>
          <p><i class="fa-solid fa-plane"></i> Khởi hành: ${tour.departure}</p>
          <p><i class="fa-solid fa-location-dot"></i> Điểm đến: ${tour.destination}</p>
          <p><span style="color:red;font-weight:650;">${tour.price.toLocaleString(
            "vi-VN"
          )} VNĐ</span></p>
        </a>
      </div>`
        )
        .join("")
    : `<p style="text-align:center; color:#888;">Không tìm thấy tour phù hợp.</p>`;
});


const sortTour = document.getElementById("sort-tours");
sortTour.addEventListener("change", (event)=>{
  const upDown = event.target.value;
  layData(`http://localhost:3000/products?_sort=price&_order=${upDown}`).then(products => renderSanPham(products));
})

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