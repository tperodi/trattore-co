import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FilterBarProps {
  filters: {
    startDate: string;
    endDate: string;
    location: string;
    category: string;
  };
  locations: string[];
  categories: string[];
  onFilterChange: (type: string, value: string) => void;
  onResetFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  locations,
  categories,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filtra Eventi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro Data Inizio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Inizio
          </label>
          <DatePicker
            selected={filters.startDate ? new Date(filters.startDate) : null}
            onChange={(date: Date | null) =>
              onFilterChange("startDate", date ? date.toISOString().slice(0, 10) : "")
            }
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleziona data inizio"
            className="mt-1 block w-full rounded-md border-gray-300"
          />
        </div>

        {/* Filtro Data Fine */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Fine
          </label>
          <DatePicker
            selected={filters.endDate ? new Date(filters.endDate) : null}
            onChange={(date: Date | null) =>
              onFilterChange("endDate", date ? date.toISOString().slice(0, 10) : "")
            }
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleziona data fine"
            className="mt-1 block w-full rounded-md border-gray-300"
          />
        </div>

        {/* Filtro Luogo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Luogo
          </label>
          <Select
            options={[{ value: "", label: "Tutti i luoghi" }, ...locations.map((loc) => ({ value: loc, label: loc }))]}
            value={
              filters.location
                ? { value: filters.location, label: filters.location }
                : { value: "", label: "Tutti i luoghi" }
            }
            onChange={(selectedOption) => onFilterChange("location", selectedOption?.value || "")}
            placeholder="Seleziona un luogo"
          />
        </div>

        {/* Filtro Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <Select
            options={[{ value: "", label: "Tutte le categorie" }, ...categories.map((cat) => ({ value: cat, label: cat }))]}
            value={
              filters.category
                ? { value: filters.category, label: filters.category }
                : { value: "", label: "Tutte le categorie" }
            }
            onChange={(selectedOption) => onFilterChange("category", selectedOption?.value || "")}
            placeholder="Seleziona una categoria"
          />
        </div>
      </div>

      {/* Pulsanti */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Resetta Filtri
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
