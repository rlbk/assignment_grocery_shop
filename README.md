# Grocery Shop

This project is a full-stack application developed for a grocery shop to track and analyze its sales data. The application showcases CRUD operations for grocery items on both the backend and frontend, along with the highest daily, weekly, and monthly sales figures.

## Backend Technology Used

- Node.js
- Express with TypeScript
- Mongoose
- Moment.js

[Backend Live Demo](https://assignment-grocery-api.vercel.app/)

## Frontend Technology Used

- React with TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios

[Frontend Live Demo](https://assignment-grocery-shop.vercel.app/)

### Logic for Calculating Highest Profitable Figures

- Utilize MongoDB aggregation pipeline to group and sum sales data based on timestamp ranges (daily, weekly, monthly).
- Identify the item with the highest profit within each timeframe using aggregation functions like `$group`, `$sum`, and `$sort`.

This project aims to provide a simple yet effective solution for managing sales data in a grocery shop, facilitating both data entry and analysis.
