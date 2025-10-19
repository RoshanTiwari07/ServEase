import { useEffect, useState } from 'react';
import { initDatabase } from '../database/config';
import { checkDatabaseSeeded, seedDatabase } from '../database/seedData';

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('🔄 Initializing database...');
        
        // Initialize database and create tables
        await initDatabase();
        console.log('✅ Database initialized');

        // Check if database needs seeding
        const isSeeded = await checkDatabaseSeeded();
        console.log('🔍 Database seeded:', isSeeded);

        if (!isSeeded) {
          console.log('🌱 Seeding database...');
          await seedDatabase();
          console.log('✅ Database seeded successfully');
        }

        setIsInitialized(true);
      } catch (err) {
        console.error('❌ Database initialization failed:', err);
        setError(err instanceof Error ? err.message : 'Database initialization failed');
      } finally {
        setIsLoading(false);
      }
    };

    initializeDatabase();
  }, []);

  return {
    isInitialized,
    isLoading,
    error,
  };
};