const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('./src/modules/menu/Menu');
const GalleryItem = require('./src/modules/gallery/GalleryItem');

dotenv.config();

const seedData = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to Atlas for seeding...');

    // 1. Clear existing data
    await Menu.deleteMany();
    await GalleryItem.deleteMany();
    console.log('🗑️  Existing data cleared.');

    // 2. Define Menu Data
    const menuItems = [
      {
        name: "Truffle Mushroom Pizza",
        price: 18.99,
        category: "food",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        description: "Artisanal pizza with wild mushrooms and truffle oil."
      },
      {
        name: "Classic Wagyu Burger",
        price: 22.50,
        category: "food",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        description: "Wagyu beef patty, brioche bun, and signature sauce."
      }
    ];

    // 3. Define Gallery Data
    const galleryItems = [
      {
        title: "Modern Dining Hall",
        category: "interior",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        imagePublicId: "seed_sample_1",
        description: "Our main seating area featuring minimalist design."
      },
      {
        title: "Chef's Special Pasta",
        category: "food",
        imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
        imagePublicId: "seed_sample_2",
        description: "Freshly handmade pasta served daily."
      }
    ];

    // 4. Insert into Database
    await Menu.insertMany(menuItems);
    await GalleryItem.insertMany(galleryItems);

    console.log('🚀 Data Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error.message);
    process.exit(1);
  }
};

seedData();