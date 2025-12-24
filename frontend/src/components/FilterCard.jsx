import React, { useMemo, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '@/redux/jobSlice';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

const filterData = [
  {
    filterType: 'Location',
    array: [
      'Delhi NCR',
      'Bangalore',
      'Hyderabad',
      'Chennai',
      'Mumbai',
      'Pune',
      'Kolkata',
      'Jaipur',
    ],
  },
  {
    filterType: 'Industry',
    array: [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Data Scientist',
      'DevOps Engineer',
      'Product Manager',
      'Designer',
      'QA Engineer',
    ],
  },
  {
    filterType: 'Salary',
    array: [
      '0-3 LPA',
      '3-6 LPA',
      '6-10 LPA',
      '10-15 LPA',
      '15-20 LPA',
      '20-30 LPA',
      '30+ LPA',
    ],
  },
];

function FilterCard() {
  const dispatch = useDispatch();
  const { filters } = useSelector(store => store.job);
  
  // Memoize safe filters to prevent unnecessary re-renders
  const safeFilters = useMemo(() => {
    return filters || {
      location: "",
      industry: "",
      salary: "",
    };
  }, [filters]);
  
  // Local state for search inputs (for better UX - immediate feedback)
  const [searchValues, setSearchValues] = useState({
    location: '',
    industry: '',
    salary: '',
  });
  
  // Local state for salary slider - initialize from current filter
  const [salaryRange, setSalaryRange] = useState(() => {
    // Parse current salary filter to get min value, default to 0
    const currentSalary = (filters?.salary || '');
    if (currentSalary) {
      const match = currentSalary.match(/(\d+)/);
      return match ? parseFloat(match[1]) : 0;
    }
    return 0;
  });

  // Sync search inputs with Redux filters
  React.useEffect(() => {
    setSearchValues({
      location: safeFilters.location || '',
      industry: safeFilters.industry || '',
      salary: safeFilters.salary || '',
    });
    
    // Sync salary slider with filter
    const currentSalary = safeFilters.salary || '';
    if (currentSalary) {
      const match = currentSalary.match(/(\d+)/);
      if (match) {
        setSalaryRange(parseFloat(match[1]));
      }
    } else {
      setSalaryRange(0);
    }
  }, [safeFilters.location, safeFilters.industry, safeFilters.salary]);

  // Debounce timers ref
  const debounceTimers = React.useRef({});

  const handleFilterChange = (filterType, value) => {
    // Toggle: if already selected, clear it; otherwise set it
    const currentValue = safeFilters[filterType] || '';
    const newValue = currentValue === value ? '' : value;
    dispatch(setFilters({ [filterType]: newValue }));
    // Update search input when radio is selected
    setSearchValues(prev => ({ ...prev, [filterType]: newValue }));
  };

  const handleSearchChange = (filterType, value) => {
    // Update local state immediately for responsive UI
    setSearchValues(prev => ({ ...prev, [filterType]: value }));
    
    // Clear existing debounce timer for this filter
    if (debounceTimers.current[filterType]) {
      clearTimeout(debounceTimers.current[filterType]);
    }
    
    // Debounce the Redux update
    debounceTimers.current[filterType] = setTimeout(() => {
      const trimmedValue = value.trim();
      dispatch(setFilters({ [filterType]: trimmedValue }));
    }, 500);
  };

  const handleSalarySliderChange = (value) => {
    setSalaryRange(value);
    // Format as "X+ LPA" for minimum salary filter, or empty string if 0
    if (value > 0) {
      const salaryFilter = `${value}+ LPA`;
      dispatch(setFilters({ salary: salaryFilter }));
      setSearchValues(prev => ({ ...prev, salary: salaryFilter }));
    } else {
      // Clear salary filter when slider is at 0
      dispatch(setFilters({ salary: '' }));
      setSearchValues(prev => ({ ...prev, salary: '' }));
    }
  };

  const handleClearFilters = () => {
    setSearchValues({
      location: '',
      industry: '',
      salary: '',
    });
    setSalaryRange(0);
    dispatch(clearFilters());
  };

  const hasActiveFilters = safeFilters.location || safeFilters.industry || safeFilters.salary;

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </Button>
        )}
      </div>
      <hr className="mb-3" />

      <div className="space-y-6">
        {filterData.map((data, index) => {
          const filterKey = data.filterType.toLowerCase();
          const currentValue = safeFilters[filterKey] || '';
          const searchValue = searchValues[filterKey] || '';
          
          // Special handling for Salary filter - use slider
          if (filterKey === 'salary') {
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-800">
                    {data.filterType}
                  </h2>
                  <span className="text-sm font-medium text-pink-600">
                    {salaryRange > 0 ? `${salaryRange}+ LPA` : 'Any Salary'}
                  </span>
                </div>
                
                {/* Salary Slider */}
                <div className="px-2">
                  <Slider
                    min={0}
                    max={50}
                    step={1}
                    value={salaryRange}
                    onValueChange={handleSalarySliderChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 LPA</span>
                    <span>50+ LPA</span>
                  </div>
                </div>
                
                <hr className="my-3" />
              </div>
            );
          }
          
          // Filter the array based on search input
          const filteredArray = data.array.filter(item =>
            item.toLowerCase().includes(searchValue.toLowerCase())
          );
          
          // Check if search value exactly matches any predefined option (case-insensitive)
          const exactMatch = data.array.some(item => 
            item.toLowerCase() === searchValue.toLowerCase()
          );
          
          // Only show "no matches" message if there's a search value, no filtered results, and no exact match
          const showNoMatchesMessage = searchValue.trim() && 
                                       filteredArray.length === 0 && 
                                       !exactMatch;
          
          return (
            <div key={index}>
              <h2 className="font-semibold text-gray-800 mb-2">
                {data.filterType}
              </h2>
              
              {/* Search Input */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search or type ${data.filterType.toLowerCase()}...`}
                  value={searchValue}
                  onChange={(e) => {
                    handleSearchChange(filterKey, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    // Apply filter immediately on Enter
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = e.target.value.trim();
                      if (debounceTimers.current[filterKey]) {
                        clearTimeout(debounceTimers.current[filterKey]);
                      }
                      dispatch(setFilters({ [filterKey]: value }));
                    }
                  }}
                  className="pl-9 w-full"
                />
              </div>
              
              {/* Radio Group with filtered options */}
              {filteredArray.length > 0 && (
                <RadioGroup
                  value={currentValue}
                  onValueChange={(value) => handleFilterChange(filterKey, value)}
                  className="space-y-1"
                >
                  {filteredArray.map((item, idx) => {
                    const itemId = `${filterKey}-${idx}`;
                    return (
                      <div
                        key={itemId}
                        className="flex items-center space-x-2 my-1 hover:bg-gray-50 p-1 rounded-md transition"
                      >
                        <RadioGroupItem value={item} id={itemId} />
                        <Label
                          htmlFor={itemId}
                          className="cursor-pointer text-gray-700"
                        >
                          {item}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              )}
              
              {/* Show message only if truly no matches found */}
              {showNoMatchesMessage && (
                <p className="text-sm text-gray-500 italic mt-2">
                  No matches found. "{searchValue}" will be used as a custom filter.
                </p>
              )}
              
              <hr className="my-3" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterCard;
