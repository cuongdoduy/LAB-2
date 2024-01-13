// JavaScript can be used to add interactive elements or modify content
const iconList = document.querySelector(".profile-container");
const ulList = iconList.querySelector("ul");
const liList = ulList.querySelectorAll("li");
let data;
for (let i = 0; i < liList.length; i++) {
  liList[i].addEventListener("mouseenter", function () {
    ulList.querySelector(".active").classList.remove("active");
    liList[i].classList.add("active");
    const title = liList[i].getAttribute("data-title");
    const label = liList[i].getAttribute("data-label");
    switch (label) {
      case "name":
        changeTitleAndValue(
          title,
          data.results[0].name.first + " " + data.results[0].name.last
        );
        break;
      case "email":
        changeTitleAndValue(title, data.results[0].email);
        break;
      case "birthday":
        changeTitleAndValue(
          title,
          data.results[0].dob.date.slice(0, 10)
        );
        break;
      case "location":
        changeTitleAndValue(
          title,
          data.results[0].location.street.number +
            " " +
            data.results[0].location.street.name +
            " " +
            data.results[0].location.city +
            " " +
            data.results[0].location.state +
            " " +
            data.results[0].location.country
        );
        break;
      case "phone":
        changeTitleAndValue(title, data.results[0].phone);
        break;
      case "pass":
        changeTitleAndValue(title, data.results[0].login.password);
        break;
      default:
        changeTitleAndValue(
          "Hi, My name is",
          data.results[0].name.first + " " + data.results[0].name.last
        );
    }
  });
}

const changeTitleAndValue = (title, value) => {
  const profile = iconList.querySelector(".details");
  const profileName = profile.querySelector(".title");
  const profileDescription = profile.querySelector(".value");
  profileName.textContent = title;
  profileDescription.textContent = value;
};

const fetchProfile = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", async () => {
  data = await fetchProfile();
  const profileImage = iconList.querySelector("img");
  profileImage.src = data.results[0].picture.large;
  changeTitleAndValue(
    "Hi, My name is",
    data.results[0].name.first + " " + data.results[0].name.last
  );
});
