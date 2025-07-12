// Frontend script for New-Project-Odoo-Hackathon-

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  const container = document.getElementById("profile-list");

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "bg-white shadow-md rounded-lg p-4 border border-gray-200";
    div.className = "bg-white shadow-md rounded-lg p-4 border border-gray-200";
    div.innerHTML = `
        <img src="${user.profilePhoto || 'https://via.placeholder.com/100'}" alt="${user.name}"
       class="w-24 h-24 rounded-full mx-auto mb-3 border border-gray-300 object-cover" />
        <h3 class="text-lg font-bold text-indigo-600 text-center">${user.name}</h3>
        <p class="text-sm text-gray-700 text-center">Location: ${user.location || "Not specified"}</p>
        <p class="text-sm text-gray-700 text-center">Availability: ${user.availability}</p>
        <div class="flex justify-center mt-3">
        <button onclick="openSwapModal(${user.id})"
        class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
        Request Swap
        </button>
        </div>
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

async function loadSwaps() {
  const userId = document.getElementById("dashboardUserId").value;
  if (!userId) {
    alert("Please enter your user ID");
    return;
  }

  const res = await fetch(`http://localhost:3000/swaps/${userId}`);
  const swaps = await res.json();
  const container = document.getElementById("dashboard");
  container.innerHTML = "";

  if (swaps.length === 0) {
    container.innerHTML = "<p class='text-center text-gray-500'>No swap requests found.</p>";
    return;
  }

  swaps.forEach((swap) => {
    const div = document.createElement("div");
    const statusColor =
      swap.status === "accepted"
        ? "bg-green-500"
        : swap.status === "rejected"
        ? "bg-red-500"
        : "bg-yellow-500";

    div.className = "bg-white p-4 border rounded-lg shadow space-y-2";
    div.innerHTML = `
      <p><strong>From:</strong> User ${swap.requesterId} ➜ <strong>To:</strong> User ${swap.receiverId}</p>
      <p><strong>Offering:</strong> ${swap.skillOffered}</p>
      <p><strong>Wants:</strong> ${swap.skillWanted}</p>
      <p><strong>Message:</strong> ${swap.message || "None"}</p>
      <p>
        <strong>Status:</strong>
        <span class="inline-block px-2 py-1 rounded text-white text-xs ${statusColor}">
          ${swap.status.toUpperCase()}
        </span>
      </p>
    `;

    // Accept/Reject buttons if receiver and status is pending
    if (swap.receiverId == userId && swap.status === "pending") {
      const btnGroup = document.createElement("div");
      btnGroup.className = "mt-2 space-x-2";

      const acceptBtn = document.createElement("button");
      acceptBtn.innerText = "Accept";
      acceptBtn.className = "bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600";
      acceptBtn.onclick = () => updateSwapStatus(swap.id, "accepted");

      const rejectBtn = document.createElement("button");
      rejectBtn.innerText = "Reject";
      rejectBtn.className = "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600";
      rejectBtn.onclick = () => updateSwapStatus(swap.id, "rejected");

      btnGroup.appendChild(acceptBtn);
      btnGroup.appendChild(rejectBtn);
      div.appendChild(btnGroup);
    }

    container.appendChild(div);
  });
}

async function updateSwapStatus(id, status) {
  const res = await fetch(`http://localhost:3000/swaps/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  const result = await res.json();
  if (result.success) {
    alert("Status updated!");
    loadSwaps(); // Refresh dashboard
  } else {
    alert("Failed to update status.");
  }
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
