Perfect. Here's a **machine coding question** inspired by companies like **Razorpay, Swiggy, Flipkart, and CRED**, which often test **code structure, performance, and clean UI/UX** for 2–3 year frontend roles.

---

## 🧠 **Machine Coding Round — Question 1: Product Catalog with Cart**

### 🏢 Real-World Scenario (Flipkart/CRED Style)

You’re building a mini frontend for an e-commerce product catalog. The page should allow users to:

* View a list of products
* Filter by category
* Sort by price (asc/desc)
* Add/remove items to cart
* View cart summary

---

### 🛠 Requirements

#### 1. **Product Listing Page**

* Display a list of products with:

  * Image, Name, Price, Category
* Implement filters by category (multi-select or checkboxes)
* Sort dropdown: `Price: Low to High`, `Price: High to Low`
* Search bar to search by name

#### 2. **Cart Functionality**

* Add product to cart
* Cart count should show in navbar
* Clicking on cart icon should show:

  * List of items added
  * Quantity (can update)
  * Remove item
  * Total price

#### 3. **Tech Constraints**

* Use **React (with Hooks)**
* No UI library (use Tailwind or custom CSS)
* Use Context API or useReducer for cart state
* Debounce search input by 500ms
* Responsive UI

#### 4. **Bonus (if time permits)**

* Persist cart in `localStorage`
* Add “Clear Cart” button
* Unit test for cart reducer

---

### 🧾 Sample Product JSON

```json
[
  {
    "id": 1,
    "name": "Running Shoes",
    "price": 2499,
    "category": "Shoes",
    "image": "https://picsum.photos/200?random=1"
  },
  {
    "id": 2,
    "name": "Denim Jacket",
    "price": 3499,
    "category": "Clothing",
    "image": "https://picsum.photos/200?random=2"
  }
]
```

---

### 📦 Folder Structure Suggestion

```
src/
│
├── components/
│   ├── ProductCard.jsx
│   ├── Cart.jsx
│   └── Navbar.jsx
│
├── context/
│   └── CartContext.jsx
│
├── pages/
│   └── Home.jsx
│
├── utils/
│   └── debounce.js
│
└── App.jsx
```

---

### ✅ Evaluation Criteria

* Code structure and readability
* Functional correctness
* Reusability of components
* Proper state management
* Basic responsiveness
* Bonus: Testing or localStorage use

---

Want a starter repo or mock data with 10–15 products?
Or would you like me to simulate this as a **real 3-hour timed round** and review your code after you're done?
