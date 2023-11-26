const userDiv = document.getElementById("user");
const rastgeleBtn = document.getElementById("rastgele");

rastgeleBtn.addEventListener("click", (e) => {
  console.log(e.target);

  fetch("https://randomuser.me/api/")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Hata: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      show(data);
    })
    .catch((err) => showError(err));

  const show = (users) => {
    console.log(users);
    // console.log(user.results[0].location.country);
    console.log(users.results[0]);

    userDiv.innerHTML = `
    
    <img src="${users.results[0].picture.large}" width="200px" class="rounded-circle" alt=""/>
    <h2>${users.results[0].name.title} ${users.results[0].name.first} ${users.results[0].name.last}</h2>
        <p class="fs-3">${users.results[0].location.country}</p>
     <p class="fs-5">${users.results[0].email}</p>
     <p class="fs-6">${users.results[0].phone}</p>
    `;
  };
});

const showError = (err) => {
  const userDiv = document.getElementById("user");
  userDiv.innerHTML = `<h1>${err}</h1>
    <img src="./img/404.png" alt="" />
    `;
};
