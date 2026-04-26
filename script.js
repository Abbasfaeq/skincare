// ── Local AI Engine Configuration ──────────────────────────────────────────
const AI_TYPING_SPEED = 40; // ms per word for realistic typing simulation

// Fast, heuristic-based local AI processing to ensure zero latency and full privacy

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
        if (cartItems.length > 0) {
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

    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        });
    }

    if (checkoutForm) {
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

    if (keepShoppingBtn) {
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
                if (!requestedTags.includes('sensitive')) requestedTags.push('sensitive');
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

    // --- Chat Logic ---
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // --- Knowledge Base: response text library (tags field removed — scoring is now separate) ---
    const chatKnowledgeBase = [
        {
            keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'howdy'],
            response: 'Hello, and welcome to OZY. I am your personal skincare consultant. To get started, could you share a little about your skin type or any current concerns?'
        },
        {
            keywords: ['acne', 'pimples', 'breakouts', 'spots', 'blemishes', 'blackheads', 'whiteheads', 'congested'],
            response: 'Dealing with breakouts can be frustrating, but the right formulations make all the difference. I recommend Salicylic Acid (BHA) and Niacinamide — both exceptional at clearing pores. Based on what you have told me, I have analysed our catalog and found the perfect matches:'
        },
        {
            keywords: ['dry', 'flaky', 'tight', 'dehydrated', 'hydration', 'moisture', 'dull', 'rough', 'parched'],
            response: 'For dry or dehydrated skin, deep hydration is the foundation of every routine. Prioritise Hyaluronic Acid and rich Ceramides. Based on your concerns, here are the top catalog matches:'
        },
        {
            keywords: ['oily', 'shiny', 'greasy', 'large pores', 'sebum', 'excess oil', 'slick'],
            response: 'Oily skin benefits from a balanced, non-stripping approach. Niacinamide is exceptional at regulating sebum. I have analysed our catalog and found the best matches for your profile:'
        },
        {
            keywords: ['sensitive', 'redness', 'reactive', 'irritated', 'flushing', 'rosacea', 'burning', 'stinging'],
            response: 'Sensitive skin requires the most gentle formulations. I recommend fragrance-free products rich in Chamomile and Centella. Here are the highest-scoring products for your concerns:'
        },
        {
            keywords: ['aging', 'wrinkles', 'fine lines', 'anti-aging', 'firmness', 'sagging', 'lifting', 'retinol', 'collagen'],
            response: 'For mature skin, a targeted renewal approach is key. Encapsulated Retinol and Peptides stimulate collagen for firmer skin. Here are the top catalog matches for your profile:'
        },
        {
            keywords: ['combination', 't-zone', 'oily nose', 'oily forehead', 'dry cheeks'],
            response: 'Combination skin requires a careful balance — hydrating dry zones while controlling shine in the T-zone. Here are the best-matched formulations:'
        },
        {
            keywords: ['sunscreen', 'spf', 'sun protection', 'uv', 'sunblock', 'tanning'],
            response: 'Daily SPF is the single most impactful anti-aging step in any routine. Here are our top-scored sun protection formulas:'
        },
        {
            keywords: ['serum', 'serums', 'treatment', 'active', 'concentrate'],
            response: 'A targeted serum is the powerhouse of any routine. Based on your profile, here are the highest-scored treatments in our catalog:'
        },
        {
            keywords: ['cleanser', 'cleansing', 'wash', 'makeup remover', 'double cleanse'],
            response: 'Cleansing sets the foundation for everything that follows. Here are the top-matched cleansers for your concerns:'
        },
        {
            keywords: ['moisturizer', 'moisturiser', 'cream', 'lotion', 'emollient'],
            response: 'A daily moisturiser is essential for every skin type. Here are the best-scoring options for your specific profile:'
        },
        {
            keywords: ['routine', 'regimen', 'steps', 'order', 'how to', 'beginner', 'start'],
            response: 'A complete routine follows four steps: Cleanse, Treat (serum), Moisturise, and SPF. What is your primary skin type — oily, dry, combination, or sensitive?'
        },
        {
            keywords: ['price', 'cost', 'expensive', 'affordable', 'budget', 'cheap'],
            response: 'Our range balances premium, clinically-backed ingredients with accessible pricing. Products start from $21.50. Would you like recommendations within a specific category?'
        },
        {
            keywords: ['thank', 'thanks', 'helpful', 'great', 'perfect', 'love it', 'amazing', 'wonderful'],
            response: 'It is truly my pleasure. Your skin deserves the very best. Is there anything else I can help you discover today?'
        }
    ];

    // --- Session Memory: accumulates recognised skin tags for the whole session ---
    let userProfileTags = [];

    // --- Tag-to-trigger-word map (used for scoring AND session memory) ---
    const tagTriggerMap = {
        'dry': ['dry', 'flaky', 'tight', 'dehydrated', 'parched', 'rough', 'moisture', 'hydration'],
        'oily': ['oily', 'shiny', 'greasy', 'sebum', 'slick', 'pores'],
        'acne-prone': ['acne', 'pimples', 'breakouts', 'spots', 'blemishes', 'blackheads', 'whiteheads'],
        'sensitive': ['sensitive', 'redness', 'reactive', 'irritated', 'rosacea', 'flushing'],
        'anti-aging': ['aging', 'wrinkles', 'fine lines', 'retinol', 'firmness', 'sagging', 'collagen'],
        'combination': ['combination', 't-zone']
    };

    if (chatToggleBtn && chatWindow) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
        });

        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });

        const handleChatSend = async () => {
            const text = chatInput.value.trim();
            if (text === '') return;

            appendMessage(text, 'user');
            chatInput.value = '';

            // Disable input while waiting for response
            chatInput.disabled = true;
            chatSendBtn.disabled = true;

            const typingIndicator = showTypingIndicator();

            try {
                const lowerInput = text.toLowerCase();
                
                // Update session memory early for the AI response logic
                Object.entries(tagTriggerMap).forEach(([tag, triggers]) => {
                    if (triggers.some(trigger => lowerInput.includes(trigger))) {
                        if (!userProfileTags.includes(tag)) userProfileTags.push(tag);
                    }
                });

                // ── Local AI Engine ──────────────────────────────────────────
                let aiText = "I want to make sure I give you the perfect recommendation. Could you tell me a little more about your skin type or what you're looking to improve?";
                
                // Greeting matching
                if (/^(hi|hello|hey|greetings|good morning|good afternoon)/.test(lowerInput)) {
                    aiText = chatKnowledgeBase[0].response;
                } else {
                    let bestMatch = null;
                    let highestMatchCount = 0;
                    
                    // Advanced keyword scoring
                    for (const item of chatKnowledgeBase) {
                        let matchCount = 0;
                        for (const keyword of item.keywords) {
                            if (lowerInput.includes(keyword)) {
                                matchCount++;
                            }
                        }
                        if (matchCount > highestMatchCount) {
                            highestMatchCount = matchCount;
                            bestMatch = item;
                        }
                    }
                    
                    if (bestMatch) {
                        aiText = bestMatch.response;
                    } else if (userProfileTags.length > 0) {
                        // Intelligent contextual fallback
                        aiText = `Based on what you've shared so far regarding ${userProfileTags.join(' and ')}, I am cross-referencing our catalog. Could you share your main priority for your routine?`;
                    }
                }

                // Simulate realistic, human-like typing delay based on message length
                const wordCount = aiText.split(' ').length;
                const delay = Math.min(Math.max(800, wordCount * AI_TYPING_SPEED), 2500);
                await new Promise(resolve => setTimeout(resolve, delay));

                typingIndicator.remove();
                const aiMsgDiv = appendMessage(aiText, 'ai');

                // ── Run scoring engine to find best-matched products ─────────
                injectScoredProducts(text, aiMsgDiv);

            } catch (error) {
                typingIndicator.remove();
                console.error('[Local AI] Error:', error);
                appendMessage('I am currently updating my catalog. Please try again shortly.', 'ai');
            } finally {
                chatInput.disabled = false;
                chatSendBtn.disabled = false;
                chatInput.focus();
            }
        };

        if (chatSendBtn) chatSendBtn.addEventListener('click', handleChatSend);
        if (chatInput) chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSend();
        });

        function appendMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
            msgDiv.innerHTML = `<p>${text}</p>`;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return msgDiv;
        }

        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.classList.add('message', 'ai-message', 'typing-indicator');
            typingDiv.innerHTML = `<span></span><span></span><span></span>`;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return typingDiv;
        }

        // ── Weighted scoring engine: selects & injects product cards ──────────
        function injectScoredProducts(userInput, containerDiv) {
            const lowerInput = userInput.toLowerCase();
            const words = lowerInput.replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 0);

            // Update session memory
            Object.entries(tagTriggerMap).forEach(([tag, triggers]) => {
                if (triggers.some(trigger => lowerInput.includes(trigger))) {
                    if (!userProfileTags.includes(tag)) userProfileTags.push(tag);
                }
            });

            // Score every product
            // skin_type_tags = +3 | product.type = +2 | description word = +1 | session tag = +1
            const scoredProducts = products.map(product => {
                let score = 0;
                const descLower = (product.description || '').toLowerCase();

                product.skin_type_tags.forEach(tag => {
                    const triggers = tagTriggerMap[tag] || [tag];
                    if (triggers.some(trigger => lowerInput.includes(trigger))) score += 3;
                    if (userProfileTags.includes(tag)) score += 1;
                });

                words.forEach(word => {
                    if (word.length > 2 && product.type && product.type.toLowerCase().includes(word)) score += 2;
                });

                words.forEach(word => {
                    if (word.length > 3 && descLower.includes(word)) score += 1;
                });

                return { product, score };
            });

            scoredProducts.sort((a, b) => b.score - a.score);
            const topScore = scoredProducts[0]?.score || 0;

            if (topScore === 0) return; // No relevant products — skip cards

            const topProducts = scoredProducts
                .filter(item => item.score > 0)
                .slice(0, 2)
                .map(item => item.product);

            topProducts.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('chat-product-card');
                card.innerHTML = `
                    <img src="${product.image_placeholder}" alt="${product.name}" class="chat-product-img">
                    <div class="chat-product-info">
                        <h4>${product.name}</h4>
                        <p>$${product.price.toFixed(2)}</p>
                        <button class="chat-add-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                containerDiv.appendChild(card);
            });

            containerDiv.querySelectorAll('.chat-add-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    addToCart(id);
                });
            });

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

});
