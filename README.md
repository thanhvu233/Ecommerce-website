1. Functional expect

-   Login
-   Register
-   Add to cart
-   Update cart
-   Delete item
-   Update profile

2. Technologies

-   ReactJS
-   React-Hook-Form + Yup
-   JSON-Server
-   Redux Toolkit + Thunk
-   react-reveal
-   uuid
-   react-toastify
-   React-router-dom v5.2.0
-   Axios
-   CSS Module + SASS
-   Ant Design
-   Swiper

3. Routing

3.1 Home
baseUrl: localhost:3000

3.2 Products
baseUrl1: baseUrl/products

    3.2.1 Men
    baseUrl1/men
    baseUrl1/men/men-shirt
    baseUrl1/men/men-trousers
    baseUrl1/:productId

    3.2.2. Women
    baseUrl1/women
    baseUrl1/women/women-shirt
    baseUrl1/women/women-trousers
    baseUrl1/:productId

    3.2.3 Kids
    baseUrl1/kids
    baseUrl1/:productId

    3.2.4 Shoes
    baseUrl1/men
    baseUrl1/women
    baseUrl1/men/shoes
    baseUrl/women/shoes
    baseUrl1/:productId

3.3 Login Page
baseUrl/login

3.4 Cart Page
baseUrl/cart/:orderId

4. Functional Analysis
   4.1 Product List Page

-   Filter

    -   Category (If has)
    -   Price
    -   Rating

-   Sort

    -   Price ASC
    -   Price DESC
    -   Rating ASC
    -   Rating DESC

-   Pagination

4.2 Prodct Page
