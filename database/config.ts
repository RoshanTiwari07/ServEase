import * as SQLite from 'expo-sqlite';

// Database configuration
export const DB_NAME = 'servease.db';
export const DB_VERSION = 1;

let database: SQLite.SQLiteDatabase | null = null;

// Initialize database
export const initDatabase = async () => {
  try {
    console.log('📱 Initializing ServEase SQLite Database...');
    
    // Open database
    database = await SQLite.openDatabaseAsync(DB_NAME);
    
    // Enable foreign keys
    await database.execAsync('PRAGMA foreign_keys = ON;');
    
    // Create tables
    await createTables(database);
    
    console.log('✅ Database initialized successfully');
    return database;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Create all tables
const createTables = async (db: SQLite.SQLiteDatabase) => {
  try {
    // Service Categories table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS service_categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        provider_count INTEGER DEFAULT 0,
        average_price TEXT,
        image TEXT,
        services TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Providers table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS providers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        rating REAL DEFAULT 0,
        price TEXT,
        distance TEXT,
        trust_score REAL DEFAULT 0,
        trust_level TEXT,
        service TEXT,
        category TEXT,
        phone TEXT,
        experience TEXT,
        completed_jobs INTEGER DEFAULT 0,
        languages TEXT,
        is_verified BOOLEAN DEFAULT 0,
        specialties TEXT,
        avatar TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Bookings table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        provider_name TEXT,
        service TEXT,
        date TEXT,
        time TEXT,
        status TEXT,
        price TEXT,
        address TEXT,
        provider_image TEXT,
        rating REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Users table (for future use)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        phone TEXT,
        address TEXT,
        city TEXT,
        avatar TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ All tables created successfully');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  }
};

// Get database instance
export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  try {
    if (!database) {
      console.log('🔄 Opening database connection...');
      database = await SQLite.openDatabaseAsync(DB_NAME);
      
      // Ensure foreign keys are enabled
      await database.execAsync('PRAGMA foreign_keys = ON;');
      console.log('✅ Database connection established');
    }
    return database;
  } catch (error) {
    console.error('❌ Error opening database:', error);
    database = null; // Reset database on error
    throw error;
  }
};

// Close database connection
export const closeDatabase = async () => {
  try {
    if (database) {
      await database.closeAsync();
      database = null;
      console.log('✅ Database connection closed');
    }
  } catch (error) {
    console.error('❌ Error closing database:', error);
  }
};