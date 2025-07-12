// Frontend script for New-Project-Odoo-Hackathon-

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  const container = document.getElementById("profile-list");

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${user.name}</h3>
                     <p>Availability: ${user.availability}</p>`;
    container.appendChild(div);
  });
});
