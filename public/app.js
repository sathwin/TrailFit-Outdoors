const TAX = 0.07;
const FEE = 0.01;
const $ = sel => document.querySelector(sel);

const fmt = n => '$' + n.toFixed(2);
const iconFor = name => {
  if (/backpack/i.test(name)) return '🎒';
  if (/trek|pole/i.test(name)) return '🥾';
  if (/filter/i.test(name)) return '💧';
  if (/lamp|headlamp/i.test(name)) return '🔦';
  if (/stove|cook/i.test(name)) return '🔥';
  if (/bag/i.test(name)) return '🛌';
  if (/stake/i.test(name)) return '📌';
  if (/fire|magnesium/i.test(name)) return '⚡';
  if (/tool|knife/i.test(name)) return '🧰';
  return '⛰️';
};

const getProductImages = name => {
  // Map exact product names from database to their respective image directories
  const imageMap = {
    'Hiking Backpack': ['Hiking Backpack/Pic 1.webp', 'Hiking Backpack/pic2.webp', 'Hiking Backpack/pic3.webp'],
    'Trekking Poles': ['Trekking Poles/pic1.webp', 'Trekking Poles/pic2.webp', 'Trekking Poles/pic3.webp'],
    'Water Filter': ['Water Filter/pic1.webp', 'Water Filter/pic2.webp', 'Water Filter/pic3.webp'],
    'Headlamp': ['Headlamp/pic1.webp', 'Headlamp/pic2.webp', 'Headlamp/pic3.webp'],
    'Camping Stove': ['Camping Stove/pic1.webp', 'Camping Stove/pic2.webp', 'Camping Stove/pic3.webp'],
    'Sleeping Bag 20°F': ['Sleeping Bag/pic1.webp', 'Sleeping Bag/pic2.webp', 'Sleeping Bag/pic3.webp'],
    'Titanium Tent Stakes': ['Tent Stakes/pic1.webp', 'Tent Stakes/pic2.webp', 'Tent Stakes/pic3.webp'],
    'Cook Pot 750ml': ['Cook Pot/pic1.webp', 'Cook Pot/pic2.webp', 'Cook Pot/pic3.webp'],
    'Magnesium Fire Starter': ['Fire Starter/pic1.webp', 'Fire Starter/pic2.webp', 'Fire Starter/pic3.webp'],
    'Trail Multi-Tool': ['Trail Multi-Tool/pic1.webp', 'Trail Multi-Tool/pic2.webp', 'Trail Multi-Tool/pic3.webp']
  };
  
  if (imageMap[name]) {
    return imageMap[name].map(path => `Assets/${path}`);
  }
  return null;
};

async function load() {
  const res = await fetch('/api/products');
  const items = await res.json();

  const grid = $('#products');
  grid.innerHTML = '';

  items.forEach(p => {
    const price = Number(p.Cost);
    const images = getProductImages(p.Name);
    const card = document.createElement('div');
    card.className = 'card product-card';
    
    // Debug: Log product name and image mapping
    console.log(`Product: "${p.Name}" -> Images:`, images);

    const imageHTML = images && images.length > 0
      ? `<div class="product-gallery">
           <div class="main-image-container">
             <img src="${images[0]}" alt="${p.Name}" class="product-image main-image" loading="lazy" data-product="${p.Name}" 
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div class="product-icon" style="display:none;">${iconFor(p.Name)}</div>
             ${images.length > 1 ? '<div class="image-overlay"><span>📷 View All Photos</span></div>' : ''}
           </div>
           ${images.length > 1 ? `
           <div class="image-thumbnails">
             ${images.map((img, idx) => `
               <img src="${img}" alt="${p.Name} view ${idx + 1}" class="thumbnail ${idx === 0 ? 'active' : ''}" data-index="${idx}" 
                    onerror="this.style.display='none';">
             `).join('')}
           </div>` : ''}
         </div>`
      : `<div class="product-icon">${iconFor(p.Name)}</div>`;

    card.innerHTML = `
      <div class="pill">SKU: ${p.ID}</div>
      ${imageHTML}
      <div class="product-info">
        <h2>${p.Name}</h2>
        <p class="product-description">${p.Description || 'Premium outdoor gear designed for serious adventurers'}</p>
        <div class="product-features">
          <div class="feature-tag">✅ Free Shipping</div>
          <div class="feature-tag">🔄 30-Day Returns</div>
        </div>
        <div class="price">${fmt(price)}</div>
      </div>
      <div class="controls">
        <label class="checkbox-label">
          <input class="chk" type="checkbox" data-id="${p.ID}" data-price="${price}">
          <span>Add to Cart</span>
        </label>
        <div class="quantity-control">
          <label for="qty-${p.ID}" class="qty-label">Qty:</label>
          <input id="qty-${p.ID}" class="qty" type="number" min="1" value="1" disabled aria-label="Quantity for ${p.Name}">
        </div>
      </div>
    `;
    grid.appendChild(card);

    // Add image gallery functionality
    if (images && images.length > 1) {
      const mainImage = card.querySelector('.main-image');
      const thumbnails = card.querySelectorAll('.thumbnail');
      const overlay = card.querySelector('.image-overlay');
      
      thumbnails.forEach((thumb, idx) => {
        thumb.addEventListener('click', () => {
          mainImage.src = images[idx];
          thumbnails.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });

      // Add zoom functionality on click
      mainImage.addEventListener('click', () => {
        openImageModal(images, p.Name, 0);
      });
    }

    const chk = card.querySelector('.chk');
    const qty = card.querySelector('.qty');

    chk.addEventListener('change', () => {
      qty.disabled = !chk.checked;
      if (!chk.checked) qty.value = 1;
      updateTotal();
    });
    qty.addEventListener('input', updateTotal);
  });

  $('#selectAll').addEventListener('click', () => {
    document.querySelectorAll('.chk').forEach(chk => {
      chk.checked = true;
      chk.closest('.card').querySelector('.qty').disabled = false;
    });
    updateTotal();
  });

  $('#clearAll').addEventListener('click', () => {
    document.querySelectorAll('.chk').forEach(chk => chk.checked = false);
    document.querySelectorAll('.qty').forEach(q => { q.value = 1; q.disabled = true; });
    updateTotal();
  });

  updateTotal();
}

function updateTotal() {
  let subtotal = 0;
  let itemCount = 0;
  
  document.querySelectorAll('.chk').forEach(chk => {
    if (chk.checked) {
      const price = Number(chk.dataset.price);
      const qty = Number(chk.closest('.controls').querySelector('.qty').value || 1);
      subtotal += price * Math.max(1, qty);
      itemCount += Math.max(1, qty);
    }
  });
  
  const tax = subtotal * TAX;
  const fee = subtotal * FEE;
  const total = subtotal + tax + fee;

  $('#total').textContent = `Total: ${fmt(total)}`;
  $('#breakdown').textContent = `Subtotal ${fmt(subtotal)} • Tax (7%) ${fmt(tax)} • Fee (1%) ${fmt(fee)}`;
  
  // Update cart count
  const cartCount = document.getElementById('item-count');
  if (cartCount) {
    cartCount.textContent = itemCount;
    cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
  }
}

// Image Modal Functionality
function openImageModal(images, productName, startIndex = 0) {
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeImageModal()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>${productName}</h3>
        <button class="modal-close" onclick="closeImageModal()">✕</button>
      </div>
      <div class="modal-body">
        <button class="nav-btn prev-btn" onclick="prevImage()">‹</button>
        <img src="${images[startIndex]}" alt="${productName}" class="modal-image">
        <button class="nav-btn next-btn" onclick="nextImage()">›</button>
      </div>
      <div class="modal-footer">
        <div class="image-counter">
          <span class="current-image">${startIndex + 1}</span> / ${images.length}
        </div>
        <div class="modal-thumbnails">
          ${images.map((img, idx) => `
            <img src="${img}" class="modal-thumb ${idx === startIndex ? 'active' : ''}" 
                 onclick="goToImage(${idx})" data-index="${idx}">
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Store modal data globally
  window.modalImages = images;
  window.modalProductName = productName;
  window.currentImageIndex = startIndex;
}

function closeImageModal() {
  const modal = document.querySelector('.image-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

function prevImage() {
  if (window.currentImageIndex > 0) {
    window.currentImageIndex--;
    updateModalImage();
  }
}

function nextImage() {
  if (window.currentImageIndex < window.modalImages.length - 1) {
    window.currentImageIndex++;
    updateModalImage();
  }
}

function goToImage(index) {
  window.currentImageIndex = index;
  updateModalImage();
}

function updateModalImage() {
  const modalImage = document.querySelector('.modal-image');
  const currentImageSpan = document.querySelector('.current-image');
  const thumbnails = document.querySelectorAll('.modal-thumb');
  
  if (modalImage && currentImageSpan) {
    modalImage.src = window.modalImages[window.currentImageIndex];
    currentImageSpan.textContent = window.currentImageIndex + 1;
    
    thumbnails.forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === window.currentImageIndex);
    });
  }
}

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
  if (document.querySelector('.image-modal')) {
    if (e.key === 'Escape') closeImageModal();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  }
});

load();
