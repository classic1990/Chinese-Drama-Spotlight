
/* =====================================================
   Sports Hub Tabs Logic
   Ready-to-use JavaScript File
   Author: Sports Hub
   ===================================================== */

// --------------------
// Sample Data (Replace with real data later)
// --------------------
const sportsData = [
  {
    id: 1,
    type: "live",
    title: "ลิเวอร์พูล vs เชลซี",
    status: "LIVE 72'",
    league: "Premier League",
    favorite: false
  },
  {
    id: 2,
    type: "analysis",
    title: "วิเคราะห์ก่อนเกม แมนยู vs อาร์เซน่อล",
    status: "PREVIEW",
    league: "Premier League",
    favorite: true
  },
  {
    id: 3,
    type: "program",
    title: "แมนซิตี้ vs สเปอร์ส",
    status: "คืนนี้ 23:30",
    league: "Premier League",
    favorite: false
  }
];

// --------------------
// DOM Elements
// --------------------
const grid = document.getElementById("resourceGrid");
const tabButtons = document.querySelectorAll(".tab-btn");

// --------------------
// Render Function
// --------------------
function renderGrid(data) {
  grid.innerHTML = "";

  if (!data || data.length === 0) {
    grid.innerHTML = '<p style="opacity:.6;">ไม่พบรายการที่ตรงกับเงื่อนไข</p>';
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "resource-card";

    card.innerHTML = `
      <h4>${item.title}</h4>
      <span class="status">${item.status}</span>
      <small>${item.league}</small>
    `;

    grid.appendChild(card);
  });
}

// --------------------
// Tab Click Logic
// --------------------
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    let filtered = sportsData;

    if (tab === "live") {
      filtered = sportsData.filter(item => item.type === "live");
    } else if (tab === "analysis") {
      filtered = sportsData.filter(item => item.type === "analysis");
    } else if (tab === "program") {
      filtered = sportsData.filter(item => item.type === "program");
    } else if (tab === "fav") {
      filtered = sportsData.filter(item => item.favorite);
    }

    renderGrid(filtered);
  });
});

// --------------------
// Initial Load
// --------------------
document.addEventListener("DOMContentLoaded", () => {
  renderGrid(sportsData);
});
