const formSignup = document.querySelector("#form");
const messageError = document.querySelector("#msg");

formSignup.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nameUser = document.querySelector("#email").value.trim(); //Nếu bạn không dùng .value, thì biến nameUser sẽ lưu cả element input -> Kết quả: <input id="email" type="text" ...>
  const password = document.querySelector("#password").value.trim();
  const repassword = document.querySelector("#re-password").value.trim();
  console.log(nameUser, password, repassword);
  if (nameUser === "" || password === "" || repassword === "") {
    messageError.textContent = "Vui lòng nhập đầy đủ thông tin";
    return;
  }
  if (password.length < 6) {
    messageError.textContent = "Vui lòng nhập mật khẩu tối thiểu là 6 kí tự";
    return;
  }
  if (password !== repassword) {
    messageError.textContent = "Vui lòng nhập chính xác mật khẩu";
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:3000/users?email=${nameUser}` // Cặp dấu `` (backtick) ở đây cho phép viết biến động, ${nameUser} = chèn giá trị của biến nameUser vào chuỗi, tạo ra URL động, tùy theo người dùng nhập email gì thì query string sẽ thay đổi theo.
    );
    const data = await response.json();
    console.log(data);
    if (data.length !== 0) {
      messageError.textContent = "Tài khoản đã tồn tại";
      return;
    }
    const newUser = {
      email: nameUser,
      //password: password,
      password: await hashPassword(password),
      role: "customer",
    };
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    messageError.textContent = "Đăng ký thành công";
    window.location.href = "login.html";
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
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
