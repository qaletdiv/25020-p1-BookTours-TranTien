const user = JSON.parse(localStorage.getItem("User")) || []; //Ghi nhớ trạng thái đăng nhập, hiện trên trang chủ, JSON.parse dùng để chuyển chuỗi JSON thành object
console.log(user);
if (user.length !== 0) {
  const login = document.querySelector("#login");
  login.textContent = user[0].email;
  login.setAttribute('href','myaccount.html')
}
// const user = JSON.parse(localStorage.getItem("User")) || [];
// console.log(user);
const idUser = user[0].id;
const nameuser = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("e-mail");
const birthday = document.getElementById("my-birthday");
const saveButton = document.querySelector(".btn-save");
const renderInfo = async () => {
  try {
    const response = await fetch(`http://localhost:3000/users/${idUser}`);
    const data = await response.json();
    console.log(data);
    if (data.name) {
      nameuser.value = data.name;
    }
    if (data.phone) {
      phone.value = data.phone;
    }
    if (data.birthday) {
      birthday.value = data.birthday;
    }
    if (data.email) {
      email.value = data.email;
    }
  } catch (error) {
    console.error("lỗi", error);
  }
};

saveButton.addEventListener("click", async (event) => {
  const gender = document.querySelector('input[name="gender"]:checked');
  console.log(
    nameuser.value,
    phone.value,
    birthday.value,
    email.value,
    gender.value,
    idUser
  );
  try {
    const updateUser = {
      name: nameuser.value,
      email: email.value,
      phone: phone.value,
      birthday: birthday.value,
      gender: gender.value,
    };
    await fetch(`http://localhost:3000/users/${idUser}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateUser),
    });
  } catch (error) {
    console.error("Lỗi", error);
  }
});
renderInfo();
