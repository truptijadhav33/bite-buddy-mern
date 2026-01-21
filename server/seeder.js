const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Category = require('./models/Category');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');
const GalleryItem = require('./models/GalleryItem');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Categories
const categories = [
    { name: 'Starters', description: 'Begin your meal with our delicious appetizers' },
    { name: 'Main Course', description: 'Hearty and satisfying primary dishes' },
    { name: 'Desserts', description: 'Sweet treats to end your experience' },
    { name: 'Beverages', description: 'Refreshing drinks and coffees' }
];

// Tables
const tables = [
    { number: "T-01", capacity: 2, status: "Available" },
    { number: "T-02", capacity: 4, status: "Available" },
    { number: "T-03", capacity: 4, status: "Available" },
    { number: "T-04", capacity: 6, status: "Available" },
    { number: "T-05", capacity: 2, status: "Available" },
    { number: "T-06", capacity: 4, status: "Available" },
    { number: "T-07", capacity: 2, status: "Available" },
    { number: "T-08", capacity: 4, status: "Available" },
];

// Gallery Items
const galleryItems = [
    { title: 'Fine Dining Area', description: 'Our elegant main dining room', category: 'Interior', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    { title: 'Signature Dish', description: 'Grilled Salmon with seasonal vegetables', category: 'Food', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80' },
    { title: 'The Bar', description: 'Handcrafted cocktails and fine wines', category: 'Interior', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
    { title: 'Wood-Fired Pizza', description: 'Classic Neapolitan style pizza', category: 'Food', image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=800&q=80' },
    { title: 'Chef at Work', description: 'Precision and passion in every dish', category: 'Other', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Live Music Night', description: 'Every Friday from 8 PM', category: 'Events', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80' },
];

// Menu Items (will be linked to categories after category creation)
// ... (rest of menuItemsRaw)
const menuItemsRaw = [
    { name: "Garlic Bread with Cheese", categoryName: "Starters", price: 150, description: "Classic oven-toasted French bread with garlic butter and melted mozzarella.", spicy: false, veg: true },
    { name: "Spicy Chicken Wings", categoryName: "Starters", price: 280, description: "Crispy fried wings tossed in our signature hot sauce.", spicy: true, veg: false },
    { name: "Wild Mushroom Bruschetta", categoryName: "Starters", price: 220, description: "Toasted baguette topped with sautéed wild mushrooms and truffle oil.", spicy: false, veg: true },
    { name: "Margherita Pizza Deluxe", categoryName: "Main Course", price: 380, description: "San Marzano tomatoes, fresh buffalo mozzarella, and basil on thin crust.", spicy: false, veg: true },
    { name: "Truffle Pasta Alfredo", categoryName: "Main Course", price: 450, description: "Fettuccine in a creamy parmesan sauce with shaved black truffles.", spicy: false, veg: true },
    { name: "Grilled Salmon with Veggies", categoryName: "Main Course", price: 550, description: "Fresh Atlantic salmon fillet served with grilled seasonal vegetables.", spicy: false, veg: false },
    { name: "Classic Tiramisu", categoryName: "Desserts", price: 250, description: "Traditional Italian pick-me-up with espresso soaked ladyfingers and mascarpone.", spicy: false, veg: true },
    { name: "New York Cheesecake", categoryName: "Desserts", price: 280, description: "Rich and creamy cheesecake with a strawberry coulis drizzle.", spicy: false, veg: true },
    { name: "Fresh Lime Soda", categoryName: "Beverages", price: 120, description: "Refreshing lime juice with soda and a hint of mint.", spicy: false, veg: true },
    { name: "Classic Cold Coffee", categoryName: "Beverages", price: 180, description: "Rich and creamy coffee served chilled with a scoop of vanilla ice cream.", spicy: false, veg: true },
];

// Import data
const importData = async () => {
    try {
        await Category.deleteMany();
        await MenuItem.deleteMany();
        await Table.deleteMany();
        await GalleryItem.deleteMany();
        await User.deleteMany(); // Note: This clears all users!

        // 1. Create Categories
        const createdCategories = await Category.create(categories);
        console.log('Categories Imported...');

        // 2. Create Menu Items
        const menuItems = menuItemsRaw.map(item => {
            const category = createdCategories.find(c => c.name === item.categoryName);
            return { ...item, category: category._id };
        });
        await MenuItem.create(menuItems);
        console.log('Menu Items Imported...');

        // 3. Create Tables
        await Table.create(tables);
        console.log('Tables Imported...');

        // 4. Create Gallery Items
        await GalleryItem.create(galleryItems);
        console.log('Gallery Items Imported...');

        // 5. Create Default Admin
        await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        });
        console.log('Admin User Created (admin@example.com / password123)...');

        console.log('Data Successfully Seeded!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Category.deleteMany();
        await MenuItem.deleteMany();
        await Table.deleteMany();
        await GalleryItem.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
