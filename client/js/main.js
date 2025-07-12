// Frontend script for New-Project-Odoo-Hackathon-

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  const container = document.getElementById("profile-list");

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "bg-white shadow-md rounded-lg p-4 border border-gray-200";
    div.innerHTML = `
        <h3 class="text-lg font-bold text-indigo-600">${user.name}</h3>
        <p class="text-sm text-gray-700">Location: ${user.location || "Not specified"}</p>
        <p class="text-sm text-gray-700">Availability: ${user.availability}</p>

        <button
            onclick="openSwapModal(${user.id})"
            class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
        Request Swap
        </button>
    `;

    container.appendChild(div);
  });
});

// Swap Modal Logic

function openSwapModal(receiverId) {
  document.getElementById("swapModal").style.display = "block";
  document.getElementById("receiverId").value = receiverId;
}

function closeModal() {
  document.getElementById("swapModal").style.display = "none";
}

//  Swap Request Submit Handler

document.getElementById("swapForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    requesterId: parseInt(document.getElementById("requesterId").value),
    receiverId: parseInt(document.getElementById("receiverId").value),
    skillOffered: document.getElementById("skillOffered").value,
    skillWanted: document.getElementById("skillWanted").value,
    message: document.getElementById("message").value
  };

  const res = await fetch("http://localhost:3000/swaps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.success ? "Swap Request Sent!" : "Error sending request.");
  closeModal();
});
