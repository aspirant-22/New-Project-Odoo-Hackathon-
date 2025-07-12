async function loadAllSwaps() {
  const res = await fetch("http://localhost:3000/swaps/all");
  const swaps = await res.json();

  const container = document.getElementById("adminSwapResults");
  container.innerHTML = "";

  if (!swaps.length) {
    container.innerHTML = "<p class='text-gray-500'>No swap activity found.</p>";
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

    div.className = "bg-white p-4 border-l-4 shadow rounded space-y-2 border-indigo-500";
    div.innerHTML = `
      <p><strong>Swap ID:</strong> ${swap.id}</p>
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
    container.appendChild(div);
  });
}
