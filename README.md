1. Functional expect

-   Login
-   Register
-   Add item to cart
-   Update item in cart
-   Delete item in cart
-   Filter
-   Sorting
-   Pagination
-   Edit profile

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
-   React-magnifier

3. Routing

3.1 Home
baseUrl: localhost:3000

3.2 Products
baseUrl1: baseUrl/products

    3.2.1 Men
    baseUrl1/men
    baseUrl1/men/men-shirt
    baseUrl1/men/men-trousers
    baseUrl1/detail/:productId

    3.2.2. Women
    baseUrl1/women
    baseUrl1/women/women-shirt
    baseUrl1/women/women-trousers
    baseUrl1/detail/:productId

    3.2.3 Kids
    baseUrl1/kids
    baseUrl1/detail/:productId

    3.2.4 Shoes
    baseUrl1/men
    baseUrl1/women
    baseUrl1/men/shoes
    baseUrl/women/shoes
    baseUrl1/detail/:productId

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

4.2 Product Page
If pressed ADD TO CART:
a. NOT LOGINED:

-   Navigate to Login Page
-   After logining successfully, navigate back to Product Page
-   User has to press ADD TO CART again

b. LOGINED

-   Get an order which isn't finished and has this currentProduct, of user from DB (Call API)

*   IF ALL ORDERS ARE FINISHED

-   Create new order and add currentProduct in it (Call API)

*   IF THERE IS AN UNFINISHED ORDER AND THAT ORDER CONTAINS THIS CURRENT PRODUCT

-   Update amount of currentProduct with appropriate SIZE (Call API)
-   Update badge on cart icon on Header

*   IF THERE IS AN UNFINISHED ORDER AND THAT ORDER DOESN'T CONTAIN THIS CURRENT PRODUCT

-   Add this currentProduct to that order (Call API)
-   Update badge on cart icon on Header
