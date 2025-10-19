import { sampleProviders, serviceCategories } from '../data/servicesData';
import { getDatabase } from './config';

// Sample bookings data
const sampleBookings = [
  {
    id: 'booking_1',
    userId: 'user_123',
    providerName: 'Rajesh Kumar',
    service: 'Plumbing Repair',
    date: '2025-01-20',
    time: '10:00 AM',
    status: 'upcoming',
    price: '300',
    address: 'Sector 15, Noida',
    providerImage: 'https://picsum.photos/seed/rajesh/100/100',
  },
  {
    id: 'booking_2',
    userId: 'user_123',
    providerName: 'Priya Sharma',
    service: 'House Cleaning',
    date: '2025-01-18',
    time: '2:00 PM',
    status: 'ongoing',
    price: '250',
    address: 'Gomti Nagar, Lucknow',
    providerImage: 'https://picsum.photos/seed/priya/100/100',
  },
  {
    id: 'booking_3',
    userId: 'user_123',
    providerName: 'Vikram Singh',
    service: 'Carpenter Work',
    date: '2025-01-15',
    time: '11:00 AM',
    status: 'completed',
    price: '400',
    address: 'Civil Lines, Allahabad',
    rating: 4.8,
    providerImage: 'https://picsum.photos/seed/vikram/100/100',
  },
  {
    id: 'booking_4',
    userId: 'user_123',
    providerName: 'Anjali Patel',
    service: 'Beauty Service',
    date: '2025-01-12',
    time: '4:00 PM',
    status: 'cancelled',
    price: '350',
    address: 'Vastrapur, Ahmedabad',
    providerImage: 'https://picsum.photos/seed/anjali/100/100',
  },
];

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting SQLite database seeding...');
    const db = await getDatabase();

    // Clear existing data
    await db.execAsync('DELETE FROM service_categories');
    await db.execAsync('DELETE FROM providers');
    await db.execAsync('DELETE FROM bookings');
    console.log('🗑️ Cleared existing data');

    // Seed Service Categories
    console.log('📂 Seeding service categories...');
    for (const category of serviceCategories) {
      await db.runAsync(`
        INSERT INTO service_categories (
          id, name, description, icon, provider_count, 
          average_price, image, services
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        category.id,
        category.name,
        category.description,
        category.icon,
        category.providerCount,
        category.averagePrice,
        category.image,
        JSON.stringify(category.services)
      ]);
    }
    console.log(`✅ Added ${serviceCategories.length} service categories`);

    // Seed Providers
    console.log('👥 Seeding providers...');
    for (const provider of sampleProviders) {
      await db.runAsync(`
        INSERT INTO providers (
          id, name, rating, price, distance, trust_score, trust_level,
          service, category, phone, experience, completed_jobs,
          languages, is_verified, specialties, avatar
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        provider.id,
        provider.name,
        provider.rating,
        provider.price,
        provider.distance,
        provider.trustScore,
        provider.trustLevel,
        provider.service,
        provider.category,
        provider.phone,
        provider.experience,
        provider.completedJobs,
        JSON.stringify(provider.languages),
        provider.isVerified ? 1 : 0,
        JSON.stringify(provider.specialties),
        provider.avatar
      ]);
    }
    console.log(`✅ Added ${sampleProviders.length} providers`);

    // Seed Sample Bookings
    console.log('📅 Seeding sample bookings...');
    for (const booking of sampleBookings) {
      await db.runAsync(`
        INSERT INTO bookings (
          id, user_id, provider_name, service, date, time,
          status, price, address, provider_image, rating
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        booking.id,
        booking.userId,
        booking.providerName,
        booking.service,
        booking.date,
        booking.time,
        booking.status,
        booking.price,
        booking.address,
        booking.providerImage,
        booking.rating || null
      ]);
    }
    console.log(`✅ Added ${sampleBookings.length} sample bookings`);

    console.log('🎉 SQLite database seeding completed successfully!');
    
    return {
      success: true,
      message: 'Database seeded successfully',
      data: {
        categories: serviceCategories.length,
        providers: sampleProviders.length,
        bookings: sampleBookings.length
      }
    };

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Function to check if database needs seeding
export const checkDatabaseSeeded = async (): Promise<boolean> => {
  try {
    const db = await getDatabase();
    const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM providers');
    return (result?.count || 0) > 0;
  } catch (error) {
    console.error('Error checking database:', error);
    return false;
  }
};