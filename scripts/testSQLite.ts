// Simple test script to verify SQLite integration
import { initDatabase } from '../database/config';
import { checkDatabaseSeeded, seedDatabase } from '../database/seedData';
import { providerService, serviceCategoryService } from '../services/sqliteService';

export const testSQLiteIntegration = async () => {
  try {
    console.log('🧪 Testing SQLite Integration...');
    
    // Test 1: Initialize database
    console.log('1️⃣ Testing database initialization...');
    await initDatabase();
    console.log('✅ Database initialized successfully');
    
    // Test 2: Check if seeding is needed
    console.log('2️⃣ Checking if database needs seeding...');
    const isSeeded = await checkDatabaseSeeded();
    
    if (!isSeeded) {
      console.log('3️⃣ Seeding database...');
      await seedDatabase();
      console.log('✅ Database seeded successfully');
    } else {
      console.log('✅ Database already contains data');
    }
    
    // Test 3: Fetch service categories
    console.log('4️⃣ Testing service categories fetch...');
    const categories = await serviceCategoryService.getAll();
    console.log(`✅ Fetched ${categories.length} service categories`);
    
    // Test 4: Fetch providers
    console.log('5️⃣ Testing providers fetch...');
    const providers = await providerService.getAll();
    console.log(`✅ Fetched ${providers.length} providers`);
    
    // Test 5: Test search functionality
    console.log('6️⃣ Testing search functionality...');
    const searchResults = await providerService.search('plumber');
    console.log(`✅ Search for 'plumber' returned ${searchResults.length} results`);
    
    console.log('🎉 All SQLite tests passed successfully!');
    
    return {
      success: true,
      data: {
        categories: categories.length,
        providers: providers.length,
        searchResults: searchResults.length
      }
    };
    
  } catch (error) {
    console.error('❌ SQLite test failed:', error);
    throw error;
  }
};

// Export for use in app
export default testSQLiteIntegration;