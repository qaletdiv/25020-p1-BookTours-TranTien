const form = document.getElementById("form");
const messageError = document.querySelector("#msg");

form.addEventListener("submit", async (event)=> {
  event.preventDefault();
  const nameUser = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  console.log(nameUser, password);
  if(nameUser === "" || password === "") {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }
try {
    const hashPass = await hashPassword(password);
    const response = await fetch(
      // `http://localhost:3000/users?email=${nameUser}&password=${password}`
      `http://localhost:3000/users?email=${nameUser}&password=${hashPass}`
    );
    const data = await response.json();
    console.log(data);
    if (data.length === 0) {
      alert("Tài khoản hoặc mật khẩu không chính xác, vui lòng nhập lại");
      return;
    };
    messageError.textContent = "Đăng nhập thành công";
    localStorage.setItem("User", JSON.stringify(data)); // Thêm dữ liệu mới vào localStorage để lưu thông tin người dùng. Lần sau mở lại web, vẫn biết user nào đang đăng nhập, không cần đăng nhập lại ngay.
    window.location.href = "home.html"
  } catch (error) {
    console.error("Lỗi dữ liệu ", error);
  }
});

// Hàm hash mật khẩu để bảo mật
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};