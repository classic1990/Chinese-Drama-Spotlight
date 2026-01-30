// Mock Data: Updated for Premium Feel
const resources = [
    {
        id: 1,
        title: "320HDZ Ultimate Series",
        category: "ent",
        desc: "ประสบการณ์ความบันเทิงระดับ 4K UHD ซีรีส์จีนและเกาหลี (Exclusive Dubbing)",
        image: "linear-gradient(to bottom right, #2a2a2a, #1a1a1a)",
        tag: "Trending",
        link: "#"
    },
    {
        id: 2,
        title: "Snoopy Presents: The Studio",
        category: "ent",
        desc: "คอลเลกชันการ์ตูนคลาสสิกและตอนพิเศษจาก Peanuts Studio (Full HD Remaster)",
        image: "linear-gradient(to bottom right, #ffcc00, #ff9900)",
        tag: "Kids Elite",
        link: "#"
    },
    {
        id: 3,
        title: "Gold Label Beauty",
        category: "life",
        desc: "เจาะลึกสกินแคร์ระดับ Counter Brand และรีวิว Luxury Cosmetics ปี 2026",
        image: "linear-gradient(to bottom right, #d4af37, #b8860b)",
        tag: "Verified",
        link: "#"
    },
    {
        id: 4,
        title: "Kahiri Living & Decor",
        category: "home",
        desc: "แรงบันดาลใจแต่งบ้านสไตล์ Minimal Luxury และเฟอร์นิเจอร์นำเข้าเกรดพรีเมียม",
        image: "linear-gradient(to bottom right, #7f8c8d, #bdc3c7)",
        tag: "New Arrival",
        link: "#"
    },
    {
        id: 5,
        title: "WeTV VIP Access",
        category: "ent",
        desc: "ทางเข้า WeTV พร้อมอัปเดตตารางออนแอร์และสิทธิพิเศษสำหรับสมาชิก VIP",
        image: "linear-gradient(to bottom right, #00c6ff, #0072ff)",
        tag: "Official Partner",
        link: "#"
    },
    {
        id: 6,
        title: "The Modern Loft Guide",
        category: "home",
        desc: "Masterclass การเลือกวัสดุและออกแบบบ้านสไตล์ลอฟท์สำหรับคนรุ่นใหม่",
        image: "linear-gradient(to bottom right, #434343, #000000)",
        tag: "Editor's Pick",
        link: "#"
    }
];

const grid = document.getElementById('seriesGrid');
const tabs = document.querySelectorAll('.tab-btn');
const searchInput = document.getElementById('searchInput');
const themeBtn = document.getElementById('themeToggle');

// State Management
let currentState = {
    filter: 'all',
    search: ''
};

function render() {
    grid.innerHTML = '';
    
    // Filter Logic: Category AND Search Keyword
    const filteredData = resources.filter(item => {
        const matchCategory = currentState.filter === 'all' || item.category === currentState.filter;
        const matchSearch = item.title.toLowerCase().includes(currentState.search) || 
                            item.desc.toLowerCase().includes(currentState.search);
        return matchCategory && matchSearch;
    });

    if (filteredData.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
                <p style="color:var(--text-muted); font-size: 1.1rem;">ไม่พบข้อมูลที่คุณค้นหา</p>
            </div>`;
        return;
    }

    filteredData.forEach((item, index) => {
        const card = createCard(item);
        // Staggered Animation: Delay each card slightly
        card.style.animationDelay = `${index * 0.1}s`;
        grid.appendChild(card);
    });
}

function createCard(item) {
    const card = document.createElement('a');
    card.href = item.link;
    card.className = 'card fade-in-up'; // Add Animation Class
    card.innerHTML = `
        <div class="card-img" style="background: ${item.image}">
            <span class="card-tag">${item.tag}</span>
        </div>
        <div class="card-content">
            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.desc}</p>
            <span class="card-btn">Visit Website</span>
        </div>
    `;
    return card;
}

// Event Listeners
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentState.filter = tab.getAttribute('data-tab');
        render();
    });
});

searchInput.addEventListener('input', (e) => {
    currentState.search = e.target.value.toLowerCase();
    render();
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeBtn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// Initial Render
render();