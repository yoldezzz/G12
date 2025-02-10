document.addEventListener("DOMContentLoaded", () => {
  const menuItems = {
    food: [
      {
        name: "Margherita Pizza",
        description:
          "Classic pizza with tomato sauce, mozzarella, and fresh basil",
        price: "$10.99",
        image: "images/pizza.jpeg",
      },
      {
        name: "Spaghetti Carbonara",
        description: "Spaghetti with creamy sauce, pancetta, and parmesan",
        price: "$12.99",
        image: "images/carbonnara.jpg",
      },
      {
        name: "Ravioli",
        description: "Homemade ravioli stuffed with ricotta and spinach",
        price: "$14.99",
        image: "images/ravioli.png",
      },
      {
        name: "Rigatoni",
        description: "Rigatoni pasta with a rich meat sauce and parmesan",
        price: "$13.99",
        image: "images/ravilo.jpg",
      },
    ],
    drinks: [
      {
        name: "Espresso",
        description: "Strong Italian coffee",
        price: "$2.99",
        image: "images/cofee.jpg",
      },
      {
        name: "Juice",
        description: "Freshly Juice ",
        price: "$3.99",
        image: "images/juice.jpeg",
      },
      {
        name: "Tea",
        description: "A warm cup of tea with lemon",
        price: "$2.49",
        image: "images/tea.jpeg",
      },
      {
        name: "Milkshake",
        description: "Creamy milkshake in your choice of flavor",
        price: "$4.99",
        image: "images/milkshake.jpeg",
      },
    ],
  };

  const displayMenuItems = (category, items) => {
    const container = document.getElementById(`${category}-list`);
    container.innerHTML = "";

    items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">${item.price}</p>
                </div>
            `;
      container.appendChild(div);
    });
  };

  displayMenuItems("food", menuItems.food);
  displayMenuItems("drinks", menuItems.drinks);

  const reservations = [];

  const updateReservationList = () => {
    const reservationList = document.getElementById("reservation-list");
    reservationList.innerHTML = "";

    reservations.forEach((reservation, index) => {
      const reservationItem = document.createElement("div");
      reservationItem.className = "reservation-details";
      reservationItem.innerHTML = `
                <p>Reservation for <strong>${
                  reservation.name
                }</strong> on <strong>${reservation.date}</strong> at <strong>${
        reservation.time
      }</strong> for <strong>${reservation.guests}</strong> guests.</p>
                <button class="delete-button" data-index="${index}">Delete Reservation</button>
                ${
                  index === reservations.length - 1
                    ? '<button class="add-button" id="add-reservation">Add Another Reservation</button>'
                    : ""
                }
            `;

      reservationItem
        .querySelector(".delete-button")
        .addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          reservations.splice(index, 1);
          updateReservationList();

          if (reservations.length === 0) {
            reservationForm.reset();
            confirmationMessage.innerHTML = "";
          }
        });

      if (index === reservations.length - 1) {
        reservationItem
          .querySelector(".add-button")
          .addEventListener("click", () => {
            confirmationMessage.innerHTML = "";
            reservationForm.reset();
          });
      }

      reservationList.appendChild(reservationItem);
    });
  };

  const reservationForm = document.getElementById("reservation-form");
  const confirmationMessage = document.getElementById("confirmation-message");

  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;

    if (!date || !time || !guests || !name || !contact) {
      alert("Please fill in all fields.");
      return;
    }

    if (guests > 90) {
      alert("The number of guests cannot exceed 90.");
      return;
    }

    reservations.push({ date, time, guests, name, contact });

    updateReservationList();

    document.getElementById("add-reservation").addEventListener("click", () => {
      confirmationMessage.innerHTML = "";
      reservationForm.reset();
    });
  });

  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
});
