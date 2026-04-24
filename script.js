let products = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch products from skincare.json
    try {
        const response = await fetch('skincare.json');
        products = await response.json();
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback or handle error appropriately
        return;
    }

    const productGrid = document.getElementById('product-grid');
    let cartItems = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Product Modal variables
    const productModal = document.getElementById('product-modal');
    const closeProductModal = document.getElementById('close-product-modal');
    const pmImage = document.getElementById('pm-image');
    const pmType = document.getElementById('pm-type');
    const pmName = document.getElementById('pm-name');
    const pmPrice = document.getElementById('pm-price');
    const pmDesc = document.getElementById('pm-description');
    const pmAddBtn = document.getElementById('pm-add-btn');

    function openProductModal(product) {
        pmImage.src = product.image_placeholder;
        pmImage.alt = product.name;
        pmType.textContent = product.type;
        pmName.textContent = product.name;
        pmPrice.textContent = `$${product.price.toFixed(2)}`;
        pmDesc.textContent = "Detailed Profile: " + product.description + " This premium formulation is optimized to beautifully enhance your skin dynamically without a heavy feel. Ideal for establishing an essential step in your routine.";
        
        pmAddBtn.setAttribute('data-id', product.id);
        
        productModal.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }

    if (closeProductModal) {
        closeProductModal.addEventListener('click', () => {
            productModal.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        });
    }

    if (pmAddBtn) {
        pmAddBtn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
            productModal.classList.add('hidden'); 
            document.body.classList.remove('no-scroll');
        });
    }
    
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.classList.add('hidden');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Function to render products
    function renderProducts(productsToRender = products) {
        productGrid.innerHTML = '';
        
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No perfect matches found. Please try again.</p>';
            return;
        }

        productsToRender.forEach(product => {
            // Create card container
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.style.cursor = 'pointer';

            // Set HTML content
            card.innerHTML = `
                <img src="${product.image_placeholder}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <span class="product-type">${product.type}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                    </div>
                    <button class="quick-add-btn" data-id="${product.id}"><i class="fa-solid fa-plus" style="margin-right:6px;"></i>Add to Cart</button>
                </div>
            `;
            
            // Handle card click
            card.addEventListener('click', () => {
                openProductModal(product);
            });

            // Handle Quick Add to Cart button separated from the card modal event
            const addBtn = card.querySelector('.quick-add-btn');
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Stops event from bubbling to the parent card
                addToCart(product.id);
            });
            
            // Append to grid
            productGrid.appendChild(card);
        });
    }

    function saveCart() {
        localStorage.setItem('aura_cart', JSON.stringify(cartItems));
    }

    function loadCart() {
        const stored = localStorage.getItem('aura_cart');
        if (stored) {
            cartItems = JSON.parse(stored);
        }
        updateCartUI();
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = cartItems.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ ...product, quantity: 1 });
            }
            saveCart();
            updateCartUI();
            openCart();
        }
    }
    
    function updateCartUI() {
        // Update badge counting (sum of quantities)
        const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        
        // Loop through and build items list HTML
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cartItems.forEach(item => {
            total += item.price * item.quantity;
            
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <img src="${item.image_placeholder}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    <div style="margin-top: 8px; display: flex; gap: 10px; align-items: center;">
                        <button class="quantity-btn decrease" data-id="${item.id}" style="padding: 2px 8px; cursor: pointer; border: 1px solid var(--border-color); border-radius: 4px; background: transparent;">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}" style="padding: 2px 8px; cursor: pointer; border: 1px solid var(--border-color); border-radius: 4px; background: transparent;">+</button>
                        <button class="remove-btn" data-id="${item.id}" style="margin-left: auto; color: var(--strawberry-dk); background: none; border: none; cursor: pointer; font-size: 0.85rem; display:inline-flex; align-items:center; gap:5px;"><i class="fa-solid fa-trash-can"></i> Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
        
        // Update total
        cartTotalElement.textContent = '$' + total.toFixed(2);

        // Bind event listeners for dynamically added buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                updateQuantity(id, -1);
            });
        });

        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                updateQuantity(id, 1);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                removeItem(id);
            });
        });
    }

    function updateQuantity(productId, change) {
        const item = cartItems.find(i => i.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cartItems = cartItems.filter(i => i.id !== productId);
            }
            saveCart();
            updateCartUI();
        }
    }

    function removeItem(productId) {
        cartItems = cartItems.filter(i => i.id !== productId);
        saveCart();
        updateCartUI();
    }
    
    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }
    
    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }
    
    // UI interactions for Cart
    cartIcon.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Checkout Flow Logic
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    const checkoutSuccess = document.getElementById('checkout-success');
    const keepShoppingBtn = document.getElementById('keep-shopping-btn');

    checkoutBtn.addEventListener('click', () => {
        if(cartItems.length > 0) {
            closeCart();
            checkoutForm.reset();
            checkoutFormContainer.classList.remove('hidden');
            checkoutSuccess.classList.add('hidden');
            checkoutModal.classList.remove('hidden');
            document.body.classList.add('no-scroll');
        } else {
            alert('Your cart is empty 💕');
        }
    });

    if(closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        });
    }

    if(checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents actual form HTTP POST / page refresh
            
            // Trigger UI transition inside modal
            checkoutFormContainer.classList.add('hidden');
            checkoutSuccess.classList.remove('hidden');
            
            // Clear cart & sync localstorage immediately 
            cartItems = [];
            saveCart();
            updateCartUI();
        });
    }

    if(keepShoppingBtn) {
        keepShoppingBtn.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
            checkoutForm.reset();
            checkoutFormContainer.classList.remove('hidden');
            checkoutSuccess.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        });
    }

    // Initialize the grid and Cart
    renderProducts();
    loadCart();

    // AI Quiz Logic
    const quizBtn = document.getElementById('quiz-btn');
    const modal = document.getElementById('quiz-modal');
    const closeModal = document.getElementById('close-modal');
    const quizSteps = document.querySelectorAll('.quiz-step');
    const quizButtons = document.querySelectorAll('.quiz-btn');
    const sectionTitle = document.querySelector('.section-title');
    const productsSection = document.querySelector('.products-section');

    let userAnswers = {
        type: null,
        concern: null,
        sensitive: null
    };

    if (quizBtn) {
        quizBtn.addEventListener('click', () => {
            quizSteps.forEach(step => {
                step.classList.remove('active');
                step.classList.add('hidden');
            });
            document.getElementById('step-1').classList.remove('hidden');
            document.getElementById('step-1').classList.add('active');
            modal.classList.remove('hidden');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    quizButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const step = parseInt(e.target.getAttribute('data-step'));
            const val = e.target.getAttribute('data-val');
            
            if (step === 1) userAnswers.type = val;
            if (step === 2) userAnswers.concern = val;
            if (step === 3) userAnswers.sensitive = val;

            const currentStepEl = document.getElementById(`step-${step}`);
            currentStepEl.classList.remove('active');
            
            setTimeout(() => {
                currentStepEl.classList.add('hidden');
                
                const nextStepId = step < 3 ? `step-${step + 1}` : 'step-loading';
                const nextStepEl = document.getElementById(nextStepId);
                
                nextStepEl.classList.remove('hidden');
                
                setTimeout(() => {
                    nextStepEl.classList.add('active');
                    if (step === 3) {
                        processAIResults();
                    }
                }, 50);
            }, 400); 
        });
    });

    function processAIResults() {
        setTimeout(() => {
            modal.classList.add('hidden');
            
            let requestedTags = [];
            
            if (userAnswers.type === 'Oily') requestedTags.push('oily');
            else if (userAnswers.type === 'Dry') requestedTags.push('dry');
            else if (userAnswers.type === 'Combination') requestedTags.push('combination');
            
            if (userAnswers.concern === 'Acne/Breakouts') requestedTags.push('acne-prone');
            else if (userAnswers.concern === 'Aging/Wrinkles') requestedTags.push('anti-aging');
            else if (userAnswers.concern === 'Redness') requestedTags.push('sensitive');
            
            if (userAnswers.sensitive === 'Very sensitive' || userAnswers.sensitive === 'Sometimes') {
                if(!requestedTags.includes('sensitive')) requestedTags.push('sensitive');
            }

            let scoredProducts = products.map(product => {
                let matchCount = 0;
                product.skin_type_tags.forEach(tag => {
                    if (requestedTags.includes(tag)) matchCount++;
                });
                return { product, matchCount };
            });

            scoredProducts = scoredProducts.filter(item => item.matchCount > 0);
            scoredProducts.sort((a, b) => b.matchCount - a.matchCount);
            
            let recommendedProducts = scoredProducts.map(item => item.product).slice(0, 4);
            
            if (recommendedProducts.length === 0) {
                 recommendedProducts = products.slice(0, 4); 
            }

            sectionTitle.textContent = 'Your AI-Personalized Routine';
            renderProducts(recommendedProducts);
            
            productsSection.scrollIntoView({ behavior: 'smooth' });

        }, 2000); 
    }
    // Search and Filtering Logic
    const searchInput = document.getElementById('product-search');
    const categoryButtons = document.querySelectorAll('.cat-btn');

    let currentCategory = 'all';
    let searchQuery = '';

    function filterProducts() {
        let filtered = products;

        if (currentCategory !== 'all') {
            filtered = filtered.filter(p => p.type === currentCategory);
        }

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query)
            );
        }

        // Restore original title if user is voluntarily searching
        if (sectionTitle.textContent !== 'Shop Our Essentials') {
            sectionTitle.textContent = 'Shop Our Essentials';
        }

        renderProducts(filtered);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterProducts();
        });
    }

    if (categoryButtons) {
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                currentCategory = e.target.getAttribute('data-cat');
                filterProducts();
            });
        });
    }

});
