// src/hooks/useLocations.js
import useSWR from 'swr';
import { publicFetcher } from '@/lib/swr-config';

// Fetch all provinces
export function useProvinces() {
  const { data, error, isLoading } = useSWR(
    '/api/data/provinces',
    publicFetcher
  );

  return {
    provinces: data?.data || [],
    isLoading,
    isError: error,
  };
}

// Fetch regencies by province ID
export function useRegencies(provinceId) {
  const { data, error, isLoading } = useSWR(
    provinceId ? `/api/data/regencies/${provinceId}` : null,
    publicFetcher
  );

  return {
    regencies: data?.data || [],
    isLoading,
    isError: error,
  };
}

// Fetch districts by regency ID
export function useDistricts(regencyId) {
  const { data, error, isLoading } = useSWR(
    regencyId ? `/api/data/districts/${regencyId}` : null,
    publicFetcher
  );

  return {
    districts: data?.data || [],
    isLoading,
    isError: error,
  };
}

// Fetch villages by district ID
export function useVillages(districtId) {
  const { data, error, isLoading } = useSWR(
    districtId ? `/api/data/villages/${districtId}` : null,
    publicFetcher
  );

  return {
    villages: data?.data || [],
    isLoading,
    isError: error,
  };
}

// Resolve location IDs to names from a school object
export function useLocationNames(school) {
  const { data: provinceData } = useSWR(
    school?.province_id ? `/api/data/province/${school.province_id}` : null,
    publicFetcher
  );
  const { data: regencyData } = useSWR(
    school?.regency_id ? `/api/data/regency/${school.regency_id}` : null,
    publicFetcher
  );
  const { data: districtData } = useSWR(
    school?.district_id ? `/api/data/district/${school.district_id}` : null,
    publicFetcher
  );
  const { data: villageData } = useSWR(
    school?.village_id ? `/api/data/village/${school.village_id}` : null,
    publicFetcher
  );

  return {
    provinceName: provinceData?.data?.name || '',
    regencyName: regencyData?.data?.name || '',
    districtName: districtData?.data?.name || '',
    villageName: villageData?.data?.name || '',
  };
}
