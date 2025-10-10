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
function renderSanPham(products, theDiv) {
  const listDiv = document.getElementById(theDiv);
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
                <p class="timing">Thời lượng: 4N3Đ</p>
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

// Gọi hàm async để fetch và xử lý sản phẩm
layData("http://localhost:3000/products?isfeatured=true").then((products) =>
  renderSanPham(products, "tour-noi-bat")
);
layData("http://localhost:3000/products?categoryid=1&_limit=3").then((products) =>
  renderSanPham(products, "tour-trong-nuoc")
);
layData("http://localhost:3000/products?categoryid=2&_limit=3").then((products) =>
  renderSanPham(products, "tour-ngoai-nuoc")
);

const toggleBtn = document.getElementById("toggle");
const header = document.querySelector("header");

toggleBtn.addEventListener("click", () => {
  header.classList.toggle("active");
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

//slidebanner//
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

//pop up
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popupForm");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");

  if (!popup) {
    console.error("Không tìm thấy #popupForm trong HTML!");
    return;
  }

  function showPopup() {
    popup.style.display = "flex"; 
    popup.classList.add("visible");
  }

  function hidePopup() {
    popup.classList.remove("visible");
    const TRANSITION_MS = 200;
    setTimeout(() => {
      if (!popup.classList.contains("visible")) {
        popup.style.display = "none";
      }
    }, TRANSITION_MS);
  }

  if (openBtn) openBtn.addEventListener("click", showPopup);
  if (closeBtn) closeBtn.addEventListener("click", hidePopup);
  window.addEventListener("click", (e) => {
    if (e.target === popup) hidePopup();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hidePopup();
  });

  const popupShown = sessionStorage.getItem("popupShown");

  if (!popupShown) {
    showPopup(); // Hiển thị lần đầu
    sessionStorage.setItem("popupShown", "true"); 
  }
});


// --- Bộ lọc tìm kiếm tour ---
document.getElementById("tourFilterForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const destination = document.getElementById("destination").value.trim().toLowerCase();
  const departure = document.getElementById("departure").value;
  const startDate = document.getElementById("startDate").value;
  const durationRange = document.getElementById("durationRange").value;

  const tours = await layData("http://localhost:3000/products");

  const filteredTours = tours.filter((tour) => {
    const matchDestination =
      destination === "" || tour.destination.toLowerCase().includes(destination);
    const matchDeparture =
      departure === "" || tour.departure === departure;
    const matchStartDate =
      startDate === "" || tour.startDate === startDate;
    const matchDuration =
      durationRange === "" || tour.durationRange === durationRange;

    return matchDestination && matchDeparture && matchStartDate && matchDuration;
  });

  let resultContainer = document.getElementById("tour-search-result");
  if (!resultContainer) {
    resultContainer = document.createElement("div");
    resultContainer.id = "tour-search-result";
    document.querySelector("main .container").prepend(resultContainer);
  }

  resultContainer.innerHTML = `
    <h2 style="margin-top:20px;">Kết quả tìm kiếm</h2>
    <div class="tours">
      ${
        filteredTours.length > 0
          ? filteredTours
              .map(
                (tour) => `
          <div class="tour">
            <a style="text-decoration: none; color: inherit;" href="product-detail.html?id=${tour.id}">
              <div class="tour-img">
                <img src="${tour.images[0]}" alt="${tour.name}">
              </div>
              <p class="timing">${tour.duration}</p>
              <p class="tourName">${tour.name}</p>
              <p><i class="fa-solid fa-plane"></i> Khởi hành: ${tour.departure}</p>
              <p><i class="fa-solid fa-location-dot"></i> Điểm đến: ${tour.destination}</p>
              <p><span style="color:red; font-weight:650">${tour.price.toLocaleString(
                "vi-VN"
              )} VNĐ</span></p>
            </a>
          </div>
        `
              )
              .join("")
          : `<p style="text-align:center; color:#888;">Không tìm thấy tour phù hợp.</p>`
      }
    </div>
  `;
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

