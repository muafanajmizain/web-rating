// src/components/LocationDisplay.js
"use client";

import { useLocationNames } from "@/hooks/useLocations";

export default function LocationDisplay({ school, layout = "list" }) {
  const { provinceName, regencyName, districtName, villageName } =
    useLocationNames(school);

  const hasLocation =
    school?.province_id || school?.regency_id || school?.district_id || school?.village_id;

  if (!hasLocation) return null;

  if (layout === "inline") {
    const parts = [villageName, districtName, regencyName, provinceName].filter(Boolean);
    if (parts.length === 0) return null;

    return (
      <span className="text-sm text-gray-600">{parts.join(", ")}</span>
    );
  }

  // "list" layout — label-value rows matching detail page format
  return (
    <div className="space-y-4">
      {school.province_id && (
        <div className="flex">
          <span className="w-56 text-sm font-medium text-gray-700">Provinsi</span>
          <span className="text-sm text-gray-900">: {provinceName || "Memuat..."}</span>
        </div>
      )}
      {school.regency_id && (
        <div className="flex">
          <span className="w-56 text-sm font-medium text-gray-700">Kabupaten/Kota</span>
          <span className="text-sm text-gray-900">: {regencyName || "Memuat..."}</span>
        </div>
      )}
      {school.district_id && (
        <div className="flex">
          <span className="w-56 text-sm font-medium text-gray-700">Kecamatan</span>
          <span className="text-sm text-gray-900">: {districtName || "Memuat..."}</span>
        </div>
      )}
      {school.village_id && (
        <div className="flex">
          <span className="w-56 text-sm font-medium text-gray-700">Kelurahan/Desa</span>
          <span className="text-sm text-gray-900">: {villageName || "Memuat..."}</span>
        </div>
      )}
    </div>
  );
}
