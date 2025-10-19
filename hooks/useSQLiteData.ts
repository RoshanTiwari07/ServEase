import { useEffect, useState } from 'react';
import { Provider, ServiceCategory } from '../data/servicesData';
import { providerService, serviceCategoryService } from '../services/sqliteService';

// Hook for fetching top providers
export const useTopProviders = (limit: number = 10) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add retry logic for database initialization
        let retries = 3;
        let data: Provider[] = [];
        
        while (retries > 0) {
          try {
            data = await providerService.getTopRated(limit);
            break;
          } catch (err) {
            retries--;
            if (retries === 0) throw err;
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        setProviders(data);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch providers');
        setProviders([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    // Add delay before first fetch to ensure database is initialized
    const timer = setTimeout(fetchProviders, 1000);
    return () => clearTimeout(timer);
  }, [limit]);

  return { providers, loading, error };
};

// Hook for fetching all providers
export const useProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await providerService.getAll();
        setProviders(data);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return { providers, loading, error };
};

// Hook for searching providers
export const useProviderSearch = (searchTerm: string) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProviders([]);
      return;
    }

    const searchProviders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await providerService.search(searchTerm);
        setProviders(data);
      } catch (err) {
        console.error('Error searching providers:', err);
        setError(err instanceof Error ? err.message : 'Failed to search providers');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchProviders, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return { providers, loading, error };
};

// Hook for fetching service categories
export const useServiceCategories = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add retry logic for database initialization
        let retries = 3;
        let data: ServiceCategory[] = [];
        
        while (retries > 0) {
          try {
            data = await serviceCategoryService.getAll();
            break;
          } catch (err) {
            retries--;
            if (retries === 0) throw err;
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        setCategories([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    // Add delay before first fetch to ensure database is initialized
    const timer = setTimeout(fetchCategories, 1000);
    return () => clearTimeout(timer);
  }, []);

  return { categories, loading, error };
};

// Hook for fetching providers by service
export const useProvidersByService = (serviceType: string) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceType) {
      setProviders([]);
      return;
    }

    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await providerService.getByService(serviceType);
        setProviders(data);
      } catch (err) {
        console.error('Error fetching providers by service:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [serviceType]);

  return { providers, loading, error };
};