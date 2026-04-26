const AI_TYPING_SPEED = 34;
const FREE_SHIPPING_THRESHOLD = 120;
const PRODUCT_CATALOG = [
    {
        id: 1,
        name: "Lumiere Gentle Hydration Cleanser",
        type: "cleanser",
        price: 24.0,
        description: "A milky cleanser with ceramides and hyaluronic acid that lifts away daily buildup while keeping the barrier comfortable.",
        image_placeholder: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["dry", "sensitive", "combination"]
    },
    {
        id: 2,
        name: "Clarify Purifying Foaming Wash",
        type: "cleanser",
        price: 21.5,
        description: "A salicylic gel cleanser that clears excess oil and pore buildup without leaving skin feeling stripped.",
        image_placeholder: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["oily", "acne-prone", "combination"]
    },
    {
        id: 3,
        name: "Aura Balance Rosewater Toner",
        type: "toner",
        price: 28.0,
        description: "A soft botanical toner with rosewater and chamomile that refreshes skin and prepares it for treatment.",
        image_placeholder: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["sensitive", "dry", "combination", "anti-aging"]
    },
    {
        id: 4,
        name: "PoreRefine Exfoliating Essence",
        type: "toner",
        price: 32.0,
        description: "A daily resurfacing essence with AHA and BHA for clogged texture, post-breakout marks, and dull tone.",
        image_placeholder: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["oily", "acne-prone", "combination", "dullness"]
    },
    {
        id: 5,
        name: "GlowDrop Vitamin C Serum",
        type: "serum",
        price: 45.0,
        description: "A brightening vitamin C treatment that targets uneven tone and gives tired skin a clearer morning glow.",
        image_placeholder: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["anti-aging", "dry", "combination", "oily", "dullness"]
    },
    {
        id: 6,
        name: "HydroPlump Hyaluronic Acid",
        type: "serum",
        price: 38.0,
        description: "A lightweight hydration serum that uses multi-weight hyaluronic acid to pull water into the skin and keep it supple.",
        image_placeholder: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["dry", "sensitive", "anti-aging", "combination", "dehydrated"]
    },
    {
        id: 7,
        name: "ClearComplex Niacinamide Drops",
        type: "serum",
        price: 35.0,
        description: "A balancing niacinamide and zinc serum for visible pores, excess shine, and recurring blemishes.",
        image_placeholder: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["oily", "acne-prone", "combination"]
    },
    {
        id: 8,
        name: "SilkWrap Ceramide Moisturizer",
        type: "moisturizer",
        price: 48.0,
        description: "A rich ceramide cream with peptides that restores softness and supports a fragile or depleted barrier.",
        image_placeholder: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["dry", "sensitive", "anti-aging", "dehydrated"]
    },
    {
        id: 9,
        name: "AquaGel Weightless Lotion",
        type: "moisturizer",
        price: 42.0,
        description: "A cooling gel moisturizer that delivers clean hydration with a fast, weightless finish.",
        image_placeholder: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["oily", "combination", "acne-prone"]
    },
    {
        id: 10,
        name: "Radiance Repair Night Cream",
        type: "moisturizer",
        price: 55.0,
        description: "A reparative night cream with encapsulated retinol and squalane that smooths texture while skin rests.",
        image_placeholder: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["anti-aging", "dry", "combination"]
    },
    {
        id: 11,
        name: "SunShield Invisible SPF 50",
        type: "sunscreen",
        price: 34.0,
        description: "A clear broad-spectrum sunscreen with a flexible, primer-like finish that layers easily every morning.",
        image_placeholder: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["combination", "oily", "dry", "anti-aging", "sensitive"]
    },
    {
        id: 12,
        name: "MineralDefense Tinted SPF 30",
        type: "sunscreen",
        price: 36.0,
        description: "A mineral sunscreen with a soft tint that calms reactive skin and leaves behind a naturally even finish.",
        image_placeholder: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=900",
        skin_type_tags: ["sensitive", "acne-prone", "anti-aging", "dry"]
    }
];

const concernCopy = {
    "acne-prone": "Keep the routine light, clarify congestion, and avoid heavy layering.",
    "anti-aging": "Use one focused treatment and support it with hydration and daily SPF.",
    sensitive: "Prioritize calm, low-drama formulas that reinforce the barrier before actives.",
    dullness: "Brighten with antioxidant support and keep the texture smooth and consistent.",
    dehydrated: "Choose hydration first, then layer a moisturizer that prevents water loss."
};

const typeDisplay = {
    dry: "Dry",
    oily: "Oily",
    combination: "Combination",
    sensitive: "Sensitive",
    normal: "Normal"
};

const concernDisplay = {
    "acne-prone": "Breakouts",
    "anti-aging": "Fine lines",
    sensitive: "Redness",
    dullness: "Dullness",
    dehydrated: "Dehydration"
};

const textureDisplay = {
    lightweight: "lightweight finish",
    balanced: "balanced finish",
    rich: "cushiony finish"
};

let products = PRODUCT_CATALOG;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("skincare.json");
        if (response.ok) {
            products = await response.json();
        }
    } catch (error) {
        console.warn("Using embedded catalog fallback.", error);
    }

    const state = {
        cartItems: JSON.parse(localStorage.getItem("ozy_cart") || "[]"),
        currentCategory: "all",
        searchQuery: "",
        sortBy: "recommended",
        activeProfile: {
            skinType: "combination",
            concern: "dullness",
            texture: "balanced",
            priorities: []
        },
        lastRecommendedIds: []
    };

    const chatState = {
        messages: [],
        profile: {
            skinType: "combination",
            concern: "dullness",
            texture: "balanced",
            productType: null,
            budget: null
        }
    };

    const productGrid = document.getElementById("product-grid");
    const resultsSummary = document.getElementById("results-summary");
    const sectionTitle = document.getElementById("section-title");
    const searchInput = document.getElementById("product-search");
    const sortSelect = document.getElementById("sort-select");
    const categoryButtons = [...document.querySelectorAll(".cat-btn")];
    const routineForm = document.getElementById("routine-form");
    const routineTitle = document.getElementById("routine-title");
    const routineSummary = document.getElementById("routine-summary");
    const routineSteps = document.getElementById("routine-steps");
    const previewRoutineBtn = document.getElementById("preview-routine-btn");

    const cartCountElement = document.getElementById("cart-count");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlay = document.getElementById("cart-overlay");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total-price");
    const cartProgressText = document.getElementById("cart-progress-text");
    const cartProgressBarFill = document.getElementById("cart-progress-bar-fill");

    const checkoutModal = document.getElementById("checkout-modal");
    const checkoutBtn = document.getElementById("checkout-btn");
    const checkoutForm = document.getElementById("checkout-form");
    const checkoutFormContainer = document.getElementById("checkout-form-container");
    const checkoutSuccess = document.getElementById("checkout-success");

    const productModal = document.getElementById("product-modal");
    const pmImage = document.getElementById("pm-image");
    const pmType = document.getElementById("pm-type");
    const pmName = document.getElementById("pm-name");
    const pmPrice = document.getElementById("pm-price");
    const pmDesc = document.getElementById("pm-description");
    const pmMeta = document.getElementById("pm-meta");
    const pmAddBtn = document.getElementById("pm-add-btn");

    const quizModal = document.getElementById("quiz-modal");
    const quizSteps = [...document.querySelectorAll(".quiz-step")];
    const quizButtons = [...document.querySelectorAll(".quiz-btn")];
    const quizAnswers = { skinType: null, concern: null, texture: null };

    const chatWindow = document.getElementById("chat-window");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const chatSendBtn = document.getElementById("chat-send-btn");
    const chatSuggestionChips = [...document.querySelectorAll(".chat-suggestion-chip")];

    const tagTriggerMap = {
        dry: ["dry", "dehydrated", "tight", "parched", "flaky"],
        oily: ["oily", "shiny", "greasy", "oil", "slick"],
        "acne-prone": ["acne", "breakout", "blemish", "clogged", "congestion", "pimples"],
        sensitive: ["sensitive", "redness", "reactive", "irritated", "stinging"],
        "anti-aging": ["aging", "wrinkle", "fine line", "firmness", "retinol"],
        combination: ["combination", "t-zone", "dry cheeks"]
    };

    const concernKeywords = {
        "acne-prone": ["acne", "breakout", "blemish", "clogged", "congestion", "pimple", "pore"],
        "anti-aging": ["aging", "wrinkle", "fine line", "firmness", "retinol", "collagen"],
        sensitive: ["sensitive", "redness", "reactive", "irritated", "stinging", "calm"],
        dullness: ["dull", "glow", "bright", "radiance", "uneven tone"],
        dehydrated: ["dehydrated", "tight", "parched", "hydration", "plump"]
    };

    const productTypeKeywords = {
        cleanser: ["cleanser", "wash", "face wash", "cleanse"],
        toner: ["toner", "essence", "exfoliating liquid"],
        serum: ["serum", "treatment", "active", "vitamin c", "niacinamide", "hyaluronic"],
        moisturizer: ["moisturizer", "cream", "gel cream", "lotion", "night cream"],
        sunscreen: ["spf", "sunscreen", "sunblock", "mineral", "uv"]
    };

    const ingredientKeywords = {
        "vitamin c": ["vitamin c", "brightening", "antioxidant"],
        niacinamide: ["niacinamide", "pores", "oil control"],
        "hyaluronic acid": ["hyaluronic", "hydration", "plump"],
        ceramides: ["ceramide", "barrier", "repair"],
        retinol: ["retinol", "renew", "fine lines"],
        "salicylic acid": ["salicylic", "bha", "breakouts"],
        peptides: ["peptide", "firmness"],
        squalane: ["squalane", "nourish"]
    };

    function formatCurrency(value) {
        return `$${value.toFixed(2)}`;
    }

    function saveCart() {
        localStorage.setItem("ozy_cart", JSON.stringify(state.cartItems));
    }

    function normalizeTypeForRoutine(type) {
        return type === "normal" ? "combination" : type;
    }

    function scoreProduct(product, profile = state.activeProfile) {
        let score = 0;
        const normalizedType = normalizeTypeForRoutine(profile.skinType);
        const concern = profile.concern;
        const texture = profile.texture;

        if (product.skin_type_tags.includes(normalizedType)) score += 4;
        if (product.skin_type_tags.includes(concern)) score += 4;
        if (concern === "dullness" && /vitamin c|aha|bha|bright|glow/i.test(product.description)) score += 3;
        if (concern === "dehydrated" && /hydrat|hyaluronic|ceramide|squalane/i.test(product.description)) score += 3;
        if (texture === "lightweight" && /gel|water|weightless|invisible|clear/i.test(product.description + product.name)) score += 2;
        if (texture === "rich" && /cream|rich|whipped|ceramide|night/i.test(product.description + product.name)) score += 2;
        if (profile.priorities.includes("barrier") && /ceramide|barrier|soothing|gentle/i.test(product.description)) score += 2;
        if (profile.priorities.includes("daily") && ["cleanser", "moisturizer", "sunscreen"].includes(product.type)) score += 1;
        if (profile.priorities.includes("fragrance-free") && /chamomile|centella|gentle|sensitive|mineral/i.test(product.description)) score += 1;

        return score;
    }

    function getRecommendedProducts(profile = state.activeProfile) {
        return [...products]
            .map(product => ({ ...product, matchScore: scoreProduct(product, profile) }))
            .sort((a, b) => b.matchScore - a.matchScore || a.price - b.price);
    }

    function getRoutineProducts(profile = state.activeProfile) {
        const ranked = getRecommendedProducts(profile);
        const neededTypes = ["cleanser", "serum", "moisturizer", "sunscreen"];

        return neededTypes
            .map(type => ranked.find(product => product.type === type))
            .filter(Boolean);
    }

    function renderRoutine(profile = state.activeProfile) {
        const routineProducts = getRoutineProducts(profile);
        state.lastRecommendedIds = routineProducts.map(product => product.id);

        routineTitle.textContent = `${typeDisplay[profile.skinType]} skin with a ${textureDisplay[profile.texture]}`;
        routineSummary.textContent = concernCopy[profile.concern];
        routineSteps.innerHTML = "";

        if (routineProducts.length === 0) {
            routineSteps.innerHTML = '<div class="empty-state"><strong>No routine available.</strong><span>Try a different profile.</span></div>';
            return;
        }

        const stepLabels = {
            cleanser: "Step 1",
            serum: "Step 2",
            moisturizer: "Step 3",
            sunscreen: "Step 4"
        };

        routineProducts.forEach(product => {
            const card = document.createElement("article");
            card.className = "routine-step-card";
            card.innerHTML = `
                <span>${stepLabels[product.type] || product.type}</span>
                <h4>${product.name}</h4>
                <p>${product.description}</p>
            `;
            routineSteps.appendChild(card);
        });
    }

    function getFilteredProducts() {
        let filtered = getRecommendedProducts();

        if (state.currentCategory !== "all") {
            filtered = filtered.filter(product => product.type === state.currentCategory);
        }

        if (state.searchQuery.trim()) {
            const query = state.searchQuery.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.type.toLowerCase().includes(query) ||
                product.skin_type_tags.some(tag => tag.includes(query))
            );
        }

        if (state.sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
        if (state.sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
        if (state.sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

        return filtered;
    }

    function renderProducts() {
        const filtered = getFilteredProducts();
        productGrid.innerHTML = "";
        sectionTitle.textContent = "Shop the OZY edit";
        resultsSummary.textContent = `${filtered.length} product${filtered.length === 1 ? "" : "s"} matching ${typeDisplay[state.activeProfile.skinType].toLowerCase()} skin and ${concernDisplay[state.activeProfile.concern].toLowerCase()}.`;

        if (filtered.length === 0) {
            productGrid.innerHTML = `
                <div class="empty-state">
                    <strong>No products match that search.</strong>
                    <span>Try a broader concern or clear a filter.</span>
                </div>
            `;
            return;
        }

        filtered.forEach(product => {
            const card = document.createElement("article");
            card.className = "product-card";
            card.innerHTML = `
                <div class="product-image-wrap">
                    <img class="product-image" src="${product.image_placeholder}" alt="${product.name}">
                    <span class="product-score">${product.matchScore >= 7 ? "Strong match" : product.matchScore >= 4 ? "Good fit" : "Catalog pick"}</span>
                </div>
                <div class="product-info">
                    <span class="product-type">${product.type}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-tags">
                        ${product.skin_type_tags.slice(0, 3).map(tag => `<span>${tag.replace("-", " ")}</span>`).join("")}
                    </div>
                    <div class="product-footer">
                        <strong class="product-price">${formatCurrency(product.price)}</strong>
                        <button class="quick-add-btn" type="button" data-id="${product.id}">Add to cart</button>
                    </div>
                </div>
            `;

            card.addEventListener("click", () => openProductModal(product.id));
            card.querySelector(".quick-add-btn").addEventListener("click", event => {
                event.stopPropagation();
                addToCart(product.id);
            });

            productGrid.appendChild(card);
        });
    }

    function openProductModal(productId) {
        const product = products.find(item => item.id === productId);
        if (!product) return;

        pmImage.src = product.image_placeholder;
        pmImage.alt = product.name;
        pmType.textContent = product.type;
        pmName.textContent = product.name;
        pmPrice.textContent = formatCurrency(product.price);
        pmDesc.textContent = product.description;
        pmMeta.innerHTML = product.skin_type_tags.map(tag => `<span>${tag.replace("-", " ")}</span>`).join("");
        pmAddBtn.dataset.id = String(product.id);

        productModal.classList.remove("hidden");
        document.body.classList.add("no-scroll");
    }

    function closeModal(modal) {
        modal.classList.add("hidden");
        document.body.classList.remove("no-scroll");
    }

    function addToCart(productId) {
        const product = products.find(item => item.id === productId);
        if (!product) return;

        const existing = state.cartItems.find(item => item.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            state.cartItems.push({ ...product, quantity: 1 });
        }

        saveCart();
        renderCart();
        openCart();
    }

    function updateQuantity(productId, change) {
        const item = state.cartItems.find(entry => entry.id === productId);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            state.cartItems = state.cartItems.filter(entry => entry.id !== productId);
        }

        saveCart();
        renderCart();
    }

    function renderCart() {
        const totalItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);

        cartCountElement.textContent = String(totalItems);
        cartTotalElement.textContent = formatCurrency(totalPrice);
        cartProgressBarFill.style.width = `${progress}%`;
        cartProgressText.textContent = totalPrice >= FREE_SHIPPING_THRESHOLD
            ? "Free shipping unlocked."
            : `${formatCurrency(FREE_SHIPPING_THRESHOLD - totalPrice)} away from free shipping.`;

        cartItemsContainer.innerHTML = "";

        if (state.cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-state">
                    <strong>Your routine is still empty.</strong>
                    <span>Add a cleanser, treatment, moisturizer, or SPF to get started.</span>
                </div>
            `;
            return;
        }

        state.cartItems.forEach(item => {
            const cartItem = document.createElement("article");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <img src="${item.image_placeholder}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>${formatCurrency(item.price)}</p>
                    <div class="cart-item-row">
                        <button class="quantity-btn" type="button" data-action="decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" type="button" data-action="increase" data-id="${item.id}">+</button>
                        <button class="remove-btn" type="button" data-action="remove" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartItemsContainer.querySelectorAll("button[data-action]").forEach(button => {
            button.addEventListener("click", event => {
                const id = Number(event.currentTarget.dataset.id);
                const action = event.currentTarget.dataset.action;
                if (action === "increase") updateQuantity(id, 1);
                if (action === "decrease") updateQuantity(id, -1);
                if (action === "remove") {
                    state.cartItems = state.cartItems.filter(item => item.id !== id);
                    saveCart();
                    renderCart();
                }
            });
        });
    }

    function openCart() {
        cartSidebar.classList.add("open");
        cartOverlay.classList.remove("hidden");
        document.body.classList.add("no-scroll");
    }

    function closeCart() {
        cartSidebar.classList.remove("open");
        cartOverlay.classList.add("hidden");
        document.body.classList.remove("no-scroll");
    }

    function buildProfileFromForm(source) {
        const priorities = [...source.querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value);
        return {
            skinType: source.querySelector('[name="skinType"]').value,
            concern: source.querySelector('[name="concern"]').value,
            texture: source.querySelector('[name="texture"]').value,
            priorities
        };
    }

    function syncChatProfile(profile) {
        chatState.profile.skinType = profile.skinType;
        chatState.profile.concern = profile.concern;
        chatState.profile.texture = profile.texture;
    }

    function applyProfile(profile, shouldScroll = false) {
        state.activeProfile = profile;
        syncChatProfile(profile);
        renderRoutine(profile);
        renderProducts();

        if (shouldScroll) {
            document.getElementById("shop").scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    function resetQuizSteps() {
        quizSteps.forEach(step => step.classList.add("hidden"));
        document.getElementById("step-loading").classList.add("hidden");
        document.getElementById("step-1").classList.remove("hidden");
    }

    function processQuizResults() {
        const profile = {
            skinType: quizAnswers.skinType || "combination",
            concern: quizAnswers.concern || "dullness",
            texture: quizAnswers.texture || "balanced",
            priorities: []
        };

        document.getElementById("skin-type-select").value = profile.skinType;
        document.getElementById("skin-concern-select").value = profile.concern;
        document.getElementById("texture-select").value = profile.texture;

        setTimeout(() => {
            closeModal(quizModal);
            resetQuizSteps();
            applyProfile(profile, true);
        }, 1500);
    }

    function appendMessage(text, sender) {
        const message = document.createElement("div");
        message.className = `message ${sender === "user" ? "user-message" : "ai-message"}`;
        message.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return message;
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement("div");
        typingIndicator.className = "message ai-message typing-indicator";
        typingIndicator.innerHTML = "<span></span><span></span><span></span>";
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingIndicator;
    }

    function detectFromMap(text, map) {
        const lower = text.toLowerCase();
        return Object.entries(map).find(([, keywords]) => keywords.some(keyword => lower.includes(keyword)))?.[0] || null;
    }

    function detectSkinType(text) {
        const match = detectFromMap(text, tagTriggerMap);
        return ["dry", "oily", "combination", "sensitive"].includes(match) ? match : null;
    }

    function detectConcern(text) {
        return detectFromMap(text, concernKeywords);
    }

    function detectProductType(text) {
        return detectFromMap(text, productTypeKeywords);
    }

    function detectIngredient(text) {
        return detectFromMap(text, ingredientKeywords);
    }

    function detectTexture(text) {
        const lower = text.toLowerCase();
        if (/light|weightless|gel|invisible|barely there/.test(lower)) return "lightweight";
        if (/rich|cream|cushion|thick|night/.test(lower)) return "rich";
        if (/balanced|everyday|normal/.test(lower)) return "balanced";
        return null;
    }

    function inferProfileFromChat(text) {
        const lower = text.toLowerCase();
        const inferred = { ...state.activeProfile };

        Object.entries(tagTriggerMap).forEach(([tag, triggers]) => {
            if (triggers.some(trigger => lower.includes(trigger))) {
                if (["dry", "oily", "combination", "sensitive"].includes(tag)) inferred.skinType = tag;
                if (["acne-prone", "anti-aging", "sensitive"].includes(tag)) inferred.concern = tag;
            }
        });

        if (lower.includes("dull") || lower.includes("bright")) inferred.concern = "dullness";
        if (lower.includes("dehydrat")) inferred.concern = "dehydrated";
        if (lower.includes("light") || lower.includes("weightless")) inferred.texture = "lightweight";
        if (lower.includes("rich") || lower.includes("cream")) inferred.texture = "rich";

        return inferred;
    }

    function detectIntent(text) {
        const lower = text.toLowerCase();
        if (/^hi\b|^hello\b|^hey\b/.test(lower)) return "greeting";
        if (/order|layer|steps|when do i use|how do i use|routine order/.test(lower)) return "routine-order";
        if (/compare|difference|vs\b|versus|better/.test(lower)) return "compare";
        if (/what is|what does|ingredient|niacinamide|ceramide|retinol|vitamin c|salicylic|hyaluronic|peptide|squalane/.test(lower)) return "ingredient-explainer";
        if (/routine|build|regimen|full set|entire routine/.test(lower)) return "routine-builder";
        if (/best|recommend|need|looking for|which|suggest|help me choose/.test(lower)) return "recommendation";
        return "follow-up";
    }

    function updateChatProfileFromText(text) {
        const inferred = inferProfileFromChat(text);
        const skinType = detectSkinType(text);
        const concern = detectConcern(text);
        const texture = detectTexture(text);
        const productType = detectProductType(text);
        const budgetMatch = text.match(/\$ ?(\d{2,3})/);

        chatState.profile.skinType = skinType || inferred.skinType || chatState.profile.skinType;
        chatState.profile.concern = concern || inferred.concern || chatState.profile.concern;
        chatState.profile.texture = texture || inferred.texture || chatState.profile.texture;
        chatState.profile.productType = productType || chatState.profile.productType;
        chatState.profile.budget = budgetMatch ? Number(budgetMatch[1]) : chatState.profile.budget;
    }

    function buildChatProfile() {
        return {
            skinType: chatState.profile.skinType || state.activeProfile.skinType,
            concern: chatState.profile.concern || state.activeProfile.concern,
            texture: chatState.profile.texture || state.activeProfile.texture,
            priorities: [...state.activeProfile.priorities]
        };
    }

    function scoreChatProduct(product, queryText, profile, requestedType, ingredient) {
        let score = scoreProduct(product, profile);
        const haystack = `${product.name} ${product.description}`.toLowerCase();

        if (requestedType && product.type === requestedType) score += 5;
        if (ingredient === "vitamin c" && /vitamin c|bright|glow/.test(haystack)) score += 4;
        if (ingredient === "niacinamide" && /niacinamide|zinc|pores|oil/.test(haystack)) score += 4;
        if (ingredient === "hyaluronic acid" && /hyaluronic|hydration|plump/.test(haystack)) score += 4;
        if (ingredient === "ceramides" && /ceramide|barrier/.test(haystack)) score += 4;
        if (ingredient === "retinol" && /retinol|night|renew/.test(haystack)) score += 4;
        if (ingredient === "salicylic acid" && /salicylic|bha|breakout|pore/.test(haystack)) score += 4;
        if (ingredient === "peptides" && /peptide|firm/.test(haystack)) score += 4;
        if (ingredient === "squalane" && /squalane|nourish/.test(haystack)) score += 4;

        queryText.toLowerCase().split(/\W+/).forEach(word => {
            if (word.length > 3 && haystack.includes(word)) score += 1;
        });

        if (chatState.profile.budget && product.price <= chatState.profile.budget) score += 2;

        return score;
    }

    function getChatRecommendations(text, limit = 3) {
        const profile = buildChatProfile();
        const requestedType = detectProductType(text) || chatState.profile.productType;
        const ingredient = detectIngredient(text);

        return [...products]
            .map(product => ({
                ...product,
                chatScore: scoreChatProduct(product, text, profile, requestedType, ingredient)
            }))
            .filter(product => product.chatScore > 0)
            .sort((a, b) => b.chatScore - a.chatScore || a.price - b.price)
            .slice(0, limit);
    }

    function explainIngredient(ingredient) {
        const copy = {
            "vitamin c": "Vitamin C is usually the brightening step. It is strongest when the goal is dullness or uneven tone, and it tends to make the most sense in the morning under SPF.",
            niacinamide: "Niacinamide is a balancing ingredient. It is helpful when you want support for visible pores, excess oil, or post-breakout texture.",
            "hyaluronic acid": "Hyaluronic acid is there for hydration. It draws water into the skin, but it works best when you follow it with moisturizer.",
            ceramides: "Ceramides are barrier-support ingredients. They matter most when skin feels tight, reactive, or easier to irritate than usual.",
            retinol: "Retinol is a renewal ingredient. It usually belongs in the evening and makes the most sense when texture or fine lines are the priority.",
            "salicylic acid": "Salicylic acid is useful for clogged pores and breakouts because it can work into oil-heavy congestion.",
            peptides: "Peptides usually show up in skin-support and firmness-focused formulas rather than in aggressive treatment products.",
            squalane: "Squalane is a cushioning emollient. It helps dry skin feel more comfortable without feeling as heavy as a thick balm."
        };
        return copy[ingredient] || "That ingredient should be chosen based on goal, feel, and how much your skin tolerates.";
    }

    function reasonForProduct(product, profile) {
        const reasons = [];
        if (product.skin_type_tags.includes(normalizeTypeForRoutine(profile.skinType))) reasons.push(`${typeDisplay[profile.skinType].toLowerCase()} skin`);
        if (product.skin_type_tags.includes(profile.concern)) reasons.push(concernDisplay[profile.concern].toLowerCase());
        if (profile.texture === "lightweight" && /gel|weightless|invisible|clear/i.test(product.description + product.name)) reasons.push("light texture");
        if (profile.texture === "rich" && /rich|cream|ceramide|night/i.test(product.description + product.name)) reasons.push("cushiony finish");
        return reasons.slice(0, 2).join(" and ");
    }

    function injectScoredProducts(productList, container) {
        const profile = buildChatProfile();

        productList.slice(0, 3).forEach(product => {
            const card = document.createElement("div");
            card.className = "chat-product-card";
            card.innerHTML = `
                <img src="${product.image_placeholder}" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>${formatCurrency(product.price)}${reasonForProduct(product, profile) ? ` • Best for ${reasonForProduct(product, profile)}` : ""}</p>
                    <button class="chat-add-btn" type="button" data-id="${product.id}">Add to cart</button>
                </div>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll(".chat-add-btn").forEach(button => {
            button.addEventListener("click", event => addToCart(Number(event.currentTarget.dataset.id)));
        });

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function buildRoutineOrderReply(profile) {
        return `Use them in this order: cleanser, toner if you want one, serum, moisturizer, then SPF in the morning.\n\nFor your current profile, I would keep the treatment step singular and let the texture stay ${textureDisplay[profile.texture]}.`;
    }

    function buildComparisonReply(recommendations) {
        if (recommendations.length < 2) {
            return "I need two close options before I can compare well. Ask me about a serum, moisturizer, cleanser, or SPF and I’ll narrow it down.";
        }

        const [first, second] = recommendations;
        return `${first.name} is the stronger pick if you want the most targeted match.\n\n${second.name} is the better choice if you want a softer everyday feel or a slightly easier texture.`;
    }

    function generateChatReply(text) {
        updateChatProfileFromText(text);

        const intent = detectIntent(text);
        const ingredient = detectIngredient(text);
        const profile = buildChatProfile();
        const recommendations = getChatRecommendations(text);
        const routineProducts = getRoutineProducts(profile);

        if (intent === "greeting") {
            return {
                text: "Tell me your skin type, your main concern, and whether you like lightweight or rich textures. I’ll turn that into a routine.",
                products: []
            };
        }

        if (intent === "ingredient-explainer" && ingredient) {
            return {
                text: `${explainIngredient(ingredient)}\n\nFrom this catalog, these are the strongest fits for that goal.`,
                products: recommendations
            };
        }

        if (intent === "routine-order") {
            return {
                text: buildRoutineOrderReply(profile),
                products: routineProducts,
                profile
            };
        }

        if (intent === "compare") {
            return {
                text: buildComparisonReply(recommendations),
                products: recommendations,
                profile
            };
        }

        if (intent === "routine-builder") {
            return {
                text: `I’d build your routine around ${typeDisplay[profile.skinType].toLowerCase()} skin and ${concernDisplay[profile.concern].toLowerCase()}.\n\nThe goal is to keep it focused, avoid redundant actives, and make the finish easy to live with.`,
                products: routineProducts,
                profile
            };
        }

        if (intent === "recommendation" || intent === "follow-up") {
            const needsMoreInfo = !detectSkinType(text) && !detectConcern(text) && !detectProductType(text) && text.trim().split(/\s+/).length < 5;

            if (needsMoreInfo) {
                return {
                    text: "I can get more precise fast. Tell me your skin type, what you want to improve, and which step you’re shopping for.",
                    products: []
                };
            }

            const lead = detectProductType(text)
                ? `For ${detectProductType(text)}, I would choose by fit and routine role first, not hype.`
                : "Based on what you shared, these are the strongest places to start.";

            return {
                text: `${lead}\n\nI’m ranking them by your skin profile, your main concern, and the finish you seem to prefer.`,
                products: recommendations,
                profile
            };
        }

        return {
            text: "Tell me what your skin is doing, what step you need, or which ingredient you’re curious about, and I’ll narrow it down.",
            products: []
        };
    }

    async function handleChatSend(prefillText = null) {
        const text = (prefillText ?? chatInput.value).trim();
        if (!text) return;

        appendMessage(text, "user");
        chatState.messages.push({ role: "user", text });
        chatInput.value = "";
        chatInput.disabled = true;
        chatSendBtn.disabled = true;
        chatSuggestionChips.forEach(chip => {
            chip.disabled = true;
        });

        const typingIndicator = showTypingIndicator();
        const reply = generateChatReply(text);
        const wordCount = reply.text.split(" ").length;
        const delay = Math.min(Math.max(700, wordCount * AI_TYPING_SPEED), 2200);
        await new Promise(resolve => setTimeout(resolve, delay));

        typingIndicator.remove();
        const response = appendMessage(reply.text, "ai");
        chatState.messages.push({ role: "assistant", text: reply.text });

        if (reply.profile) {
            document.getElementById("skin-type-select").value = reply.profile.skinType;
            document.getElementById("skin-concern-select").value = reply.profile.concern;
            document.getElementById("texture-select").value = reply.profile.texture;
            applyProfile(reply.profile, false);
        }

        if (reply.products.length) {
            injectScoredProducts(reply.products, response);
        }

        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatSuggestionChips.forEach(chip => {
            chip.disabled = false;
        });
        chatInput.focus();
    }

    document.getElementById("cart-icon").addEventListener("click", openCart);
    document.getElementById("close-cart").addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);
    document.getElementById("close-product-modal").addEventListener("click", () => closeModal(productModal));
    document.getElementById("close-modal").addEventListener("click", () => closeModal(quizModal));
    document.getElementById("close-checkout").addEventListener("click", () => closeModal(checkoutModal));
    document.getElementById("keep-shopping-btn").addEventListener("click", () => closeModal(checkoutModal));

    document.getElementById("quiz-btn").addEventListener("click", () => {
        quizModal.classList.remove("hidden");
        document.body.classList.add("no-scroll");
        resetQuizSteps();
    });

    previewRoutineBtn.addEventListener("click", () => {
        applyProfile({
            skinType: "dry",
            concern: "dullness",
            texture: "balanced",
            priorities: ["barrier", "daily"]
        }, true);
    });

    pmAddBtn.addEventListener("click", event => {
        addToCart(Number(event.currentTarget.dataset.id));
        closeModal(productModal);
    });

    productModal.addEventListener("click", event => {
        if (event.target === productModal) closeModal(productModal);
    });

    quizModal.addEventListener("click", event => {
        if (event.target === quizModal) closeModal(quizModal);
    });

    checkoutModal.addEventListener("click", event => {
        if (event.target === checkoutModal) closeModal(checkoutModal);
    });

    routineForm.addEventListener("submit", event => {
        event.preventDefault();
        applyProfile(buildProfileFromForm(routineForm), true);
    });

    searchInput.addEventListener("input", event => {
        state.searchQuery = event.target.value;
        renderProducts();
    });

    sortSelect.addEventListener("change", event => {
        state.sortBy = event.target.value;
        renderProducts();
    });

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            categoryButtons.forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            state.currentCategory = button.dataset.cat;
            renderProducts();
        });
    });

    quizButtons.forEach(button => {
        button.addEventListener("click", event => {
            const step = Number(event.currentTarget.dataset.step);
            const value = event.currentTarget.dataset.val;

            if (step === 1) quizAnswers.skinType = value;
            if (step === 2) quizAnswers.concern = value;
            if (step === 3) quizAnswers.texture = value;

            document.getElementById(`step-${step}`).classList.add("hidden");

            if (step < 3) {
                document.getElementById(`step-${step + 1}`).classList.remove("hidden");
            } else {
                document.getElementById("step-loading").classList.remove("hidden");
                processQuizResults();
            }
        });
    });

    checkoutBtn.addEventListener("click", () => {
        if (state.cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        closeCart();
        checkoutForm.reset();
        checkoutFormContainer.classList.remove("hidden");
        checkoutSuccess.classList.add("hidden");
        checkoutModal.classList.remove("hidden");
        document.body.classList.add("no-scroll");
    });

    checkoutForm.addEventListener("submit", event => {
        event.preventDefault();
        checkoutFormContainer.classList.add("hidden");
        checkoutSuccess.classList.remove("hidden");
        state.cartItems = [];
        saveCart();
        renderCart();
    });

    document.getElementById("chat-toggle-btn").addEventListener("click", () => {
        chatWindow.classList.toggle("hidden");
    });

    document.getElementById("close-chat-btn").addEventListener("click", () => {
        chatWindow.classList.add("hidden");
    });

    chatSendBtn.addEventListener("click", () => handleChatSend());
    chatInput.addEventListener("keydown", event => {
        if (event.key === "Enter") handleChatSend();
    });

    chatSuggestionChips.forEach(chip => {
        chip.addEventListener("click", () => handleChatSend(chip.textContent || ""));
    });

    renderRoutine();
    renderProducts();
    renderCart();
});
