const user = JSON.parse(localStorage.getItem("User")) || []; //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ, JSON.parse dùng để chuyển chuỗi JSON thành object
console.log(user);
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.textContent = user[0].email;
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
                  <img
                    src="${product.images[0]}"
                    alt=""
                  />
                </div>
                <p class="timing">Thời lượng: 4N3Đ</p>
                <a style="text-decoration: none;" href="product-detail.html?id=${product.id}"><p class="tourName">${product.name}</p></a>
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
 const popup = document.getElementById("popupForm");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");

  openBtn.onclick = () => popup.style.display = "block";
  closeBtn.onclick = () => popup.style.display = "none";
  window.onclick = (e) => {
    if (e.target == popup) popup.style.display = "none";
  }