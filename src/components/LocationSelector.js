// src/components/LocationSelector.js
"use client";

import { useProvinces, useRegencies, useDistricts, useVillages } from "@/hooks/useLocations";

export default function LocationSelector({ value, onChange, disabled = false }) {
  const { provinces, isLoading: loadingProvinces } = useProvinces();
  const { regencies, isLoading: loadingRegencies } = useRegencies(value?.province_id);
  const { districts, isLoading: loadingDistricts } = useDistricts(value?.regency_id);
  const { villages, isLoading: loadingVillages } = useVillages(value?.district_id);

  const handleChange = (field, val) => {
    const newValue = { ...value };
    newValue[field] = val || "";

    // Reset child selections when parent changes
    if (field === "province_id") {
      newValue.regency_id = "";
      newValue.district_id = "";
      newValue.village_id = "";
    } else if (field === "regency_id") {
      newValue.district_id = "";
      newValue.village_id = "";
    } else if (field === "district_id") {
      newValue.village_id = "";
    }

    onChange(newValue);
  };

  const selectClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Provinsi */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Provinsi
        </label>
        <select
          value={value?.province_id || ""}
          onChange={(e) => handleChange("province_id", e.target.value)}
          disabled={disabled || loadingProvinces}
          className={selectClass}
        >
          <option value="">
            {loadingProvinces ? "Memuat..." : "Pilih Provinsi"}
          </option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Kabupaten/Kota */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Kabupaten/Kota
        </label>
        <select
          value={value?.regency_id || ""}
          onChange={(e) => handleChange("regency_id", e.target.value)}
          disabled={disabled || !value?.province_id || loadingRegencies}
          className={selectClass}
        >
          <option value="">
            {loadingRegencies
              ? "Memuat..."
              : !value?.province_id
                ? "Pilih provinsi terlebih dahulu"
                : "Pilih Kabupaten/Kota"}
          </option>
          {regencies.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* Kecamatan */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Kecamatan
        </label>
        <select
          value={value?.district_id || ""}
          onChange={(e) => handleChange("district_id", e.target.value)}
          disabled={disabled || !value?.regency_id || loadingDistricts}
          className={selectClass}
        >
          <option value="">
            {loadingDistricts
              ? "Memuat..."
              : !value?.regency_id
                ? "Pilih kabupaten/kota terlebih dahulu"
                : "Pilih Kecamatan"}
          </option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Kelurahan/Desa */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Kelurahan/Desa
        </label>
        <select
          value={value?.village_id || ""}
          onChange={(e) => handleChange("village_id", e.target.value)}
          disabled={disabled || !value?.district_id || loadingVillages}
          className={selectClass}
        >
          <option value="">
            {loadingVillages
              ? "Memuat..."
              : !value?.district_id
                ? "Pilih kecamatan terlebih dahulu"
                : "Pilih Kelurahan/Desa"}
          </option>
          {villages.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
