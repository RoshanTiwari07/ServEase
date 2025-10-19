import { Provider, ServiceCategory } from '../data/servicesData';
import { getDatabase } from '../database/config';

// Helper function to transform database row to Provider
const transformProviderRow = (row: any): Provider => ({
  id: row.id,
  name: row.name,
  rating: row.rating,
  price: row.price,
  distance: row.distance,
  trustScore: row.trust_score,
  trustLevel: row.trust_level,
  service: row.service,
  category: row.category,
  phone: row.phone,
  experience: row.experience,
  completedJobs: row.completed_jobs,
  languages: JSON.parse(row.languages || '[]'),
  isVerified: Boolean(row.is_verified),
  specialties: JSON.parse(row.specialties || '[]'),
  avatar: row.avatar
});

// Helper function to transform database row to ServiceCategory
const transformCategoryRow = (row: any): ServiceCategory => ({
  id: row.id,
  name: row.name,
  description: row.description,
  icon: row.icon,
  providerCount: row.provider_count,
  averagePrice: row.average_price,
  image: row.image,
  services: JSON.parse(row.services || '[]')
});

// Provider Services
export const providerService = {
  // Get all providers
  async getAll(): Promise<Provider[]> {
    try {
      const db = await getDatabase();
      
      // Add a small delay to ensure database is ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const result = await db.getAllAsync(`
        SELECT * FROM providers 
        ORDER BY trust_score DESC, rating DESC
      `);
      
      return result.map(transformProviderRow);
    } catch (error) {
      console.error('Error fetching providers:', error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }
  },

  // Get top-rated providers
  async getTopRated(limit: number = 10): Promise<Provider[]> {
    try {
      const db = await getDatabase();
      
      // Add a small delay to ensure database is ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const result = await db.getAllAsync(`
        SELECT * FROM providers 
        ORDER BY trust_score DESC, rating DESC 
        LIMIT ?
      `, [limit]);
      
      return result.map(transformProviderRow);
    } catch (error) {
      console.error('Error fetching top providers:', error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }
  },

  // Search providers
  async search(searchTerm: string): Promise<Provider[]> {
    try {
      const db = await getDatabase();
      const searchPattern = `%${searchTerm.toLowerCase()}%`;
      
      const result = await db.getAllAsync(`
        SELECT * FROM providers 
        WHERE LOWER(name) LIKE ? 
           OR LOWER(service) LIKE ? 
           OR LOWER(category) LIKE ?
        ORDER BY trust_score DESC, rating DESC
      `, [searchPattern, searchPattern, searchPattern]);
      
      return result.map(transformProviderRow);
    } catch (error) {
      console.error('Error searching providers:', error);
      throw error;
    }
  },

  // Get providers by service
  async getByService(serviceType: string): Promise<Provider[]> {
    try {
      const db = await getDatabase();
      const result = await db.getAllAsync(`
        SELECT * FROM providers 
        WHERE LOWER(service) = LOWER(?)
        ORDER BY trust_score DESC, rating DESC
      `, [serviceType]);
      
      return result.map(transformProviderRow);
    } catch (error) {
      console.error('Error fetching providers by service:', error);
      throw error;
    }
  },

  // Add new provider
  async add(provider: Omit<Provider, 'id'>): Promise<string> {
    try {
      const db = await getDatabase();
      const id = `provider_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      
      await db.runAsync(`
        INSERT INTO providers (
          id, name, rating, price, distance, trust_score, trust_level,
          service, category, phone, experience, completed_jobs,
          languages, is_verified, specialties, avatar
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        id, provider.name, provider.rating, provider.price, provider.distance,
        provider.trustScore, provider.trustLevel, provider.service, provider.category,
        provider.phone, provider.experience, provider.completedJobs,
        JSON.stringify(provider.languages), provider.isVerified ? 1 : 0,
        JSON.stringify(provider.specialties), provider.avatar || null
      ]);
      
      return id;
    } catch (error) {
      console.error('Error adding provider:', error);
      throw error;
    }
  }
};

// Service Category Services
export const serviceCategoryService = {
  // Get all service categories
  async getAll(): Promise<ServiceCategory[]> {
    try {
      const db = await getDatabase();
      
      // Add a small delay to ensure database is ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const result = await db.getAllAsync(`
        SELECT * FROM service_categories 
        ORDER BY name ASC
      `);
      
      return result.map(transformCategoryRow);
    } catch (error) {
      console.error('Error fetching service categories:', error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }
  },

  // Get category by ID
  async getById(id: string): Promise<ServiceCategory | null> {
    try {
      const db = await getDatabase();
      const result = await db.getFirstAsync(`
        SELECT * FROM service_categories WHERE id = ?
      `, [id]);
      
      if (!result) return null;
      
      return transformCategoryRow(result);
    } catch (error) {
      console.error('Error fetching service category:', error);
      throw error;
    }
  }
};

// Booking Services
export const bookingService = {
  // Get user bookings
  async getUserBookings(userId: string) {
    try {
      const db = await getDatabase();
      const result = await db.getAllAsync(`
        SELECT * FROM bookings 
        WHERE user_id = ? 
        ORDER BY created_at DESC
      `, [userId]);
      
      return result;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },

  // Create new booking
  async create(booking: any): Promise<string> {
    try {
      const db = await getDatabase();
      const id = `booking_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      
      await db.runAsync(`
        INSERT INTO bookings (
          id, user_id, provider_name, service, date, time,
          status, price, address, provider_image, rating
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        id, booking.userId, booking.providerName, booking.service,
        booking.date, booking.time, booking.status, booking.price,
        booking.address, booking.providerImage || null, booking.rating || null
      ]);
      
      return id;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Update booking status
  async updateStatus(bookingId: string, status: string): Promise<void> {
    try {
      const db = await getDatabase();
      await db.runAsync(`
        UPDATE bookings 
        SET status = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `, [status, bookingId]);
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }
};