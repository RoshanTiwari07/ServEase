import { useEffect, useState } from 'react';
import { bookingService } from '../services/sqliteService';

console.log('useBookings hook loaded successfully');

export interface Booking {
  id: string;
  user_id: string;
  provider_name: string;
  service: string;
  date: string;
  time: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  price: string;
  address: string;
  provider_image?: string;
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

export const useUserBookings = (userId: string = 'user_123') => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingService.getUserBookings(userId);
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setError(null);
      const bookingId = await bookingService.create(bookingData);
      await fetchBookings();
      return bookingId;
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err instanceof Error ? err.message : 'Failed to create booking');
      throw err;
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      setError(null);
      await bookingService.updateStatus(bookingId, status);
      await fetchBookings();
    } catch (err) {
      console.error('Error updating booking status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update booking');
      throw err;
    }
  };

  const refreshBookings = () => {
    fetchBookings();
  };

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBookingStatus,
    refreshBookings,
  };
};