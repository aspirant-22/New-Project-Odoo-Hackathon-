async function loadSwaps() {
  const userId = document.getElementById("userIdInput").value;
  if (!userId) {
    alert("Please enter your user ID");
    return;
  }

  const res = await fetch(`http://localhost:3000/swaps/${userId}`);
  const swaps = await res.json();

  const container = document.getElementById("swapResults");
  container.innerHTML = ""; // Clear previous results

  if (swaps.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>No swap requests found.</p>";
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

    // ✅ Show Accept/Reject if current user is receiver and status is pending
    if (swap.receiverId == userId && swap.status === "pending") {
      const btnGroup = document.createElement("div");
      btnGroup.className = "mt-2 space-x-2";

      const acceptBtn = document.createElement("button");
      acceptBtn.textContent = "Accept";
      acceptBtn.className = "bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600";
      acceptBtn.onclick = () => updateSwapStatus(swap.id, "accepted");

      const rejectBtn = document.createElement("button");
      rejectBtn.textContent = "Reject";
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
    alert("Status updated successfully!");
    loadSwaps(); // 🔁 Refresh after update
  } else {
    alert("Failed to update status.");
  }
}
