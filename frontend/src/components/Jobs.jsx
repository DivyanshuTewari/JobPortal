import React, { useMemo } from 'react'
import Navbar from './shared/Navbar'
import Footer from './Footer'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'

// Utility function to parse salary range
const parseSalaryRange = (salaryRange) => {
  if (!salaryRange) return null;
  
  // Handle "X+ LPA" format (e.g., "5+ LPA", "30+ LPA")
  const plusMatch = salaryRange.match(/(\d+)\+\s*LPA/);
  if (plusMatch) {
    return { min: parseFloat(plusMatch[1]), max: Infinity };
  }
  
  // Handle "X-Y LPA" format (e.g., "3-6 LPA")
  const rangeMatch = salaryRange.match(/(\d+)-(\d+)\s*LPA/);
  if (rangeMatch) {
    return { min: parseFloat(rangeMatch[1]), max: parseFloat(rangeMatch[2]) };
  }
  
  return null;
};

// Check if job salary matches the selected range
const matchesSalaryRange = (jobSalary, salaryRange) => {
  if (!salaryRange) return true;
  
  const range = parseSalaryRange(salaryRange);
  if (!range) return true;
  
  if (range.max === Infinity) {
    return jobSalary >= range.min;
  }
  
  // Use inclusive ranges for better UX (e.g., "3-6 LPA" includes both 3 and 6)
  return jobSalary >= range.min && jobSalary <= range.max;
};

function Jobs() {
  const { allJobs, searchedQuery, filters } = useSelector(store => store.job);
  
  // Ensure filters object exists with default values
  const safeFilters = filters || {
    location: "",
    industry: "",
    salary: "",
  };
  
  const filterJobs = useMemo(() => {
    let filtered = [...allJobs];
    
    // Filter by text search (searchedQuery)
    if (searchedQuery) {
      filtered = filtered.filter((job) => {
        const query = searchedQuery.toLowerCase();
        return (
          job.title?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.company?.name?.toLowerCase().includes(query)
        );
      });
    }
    
    // Filter by location
    if (safeFilters.location) {
      filtered = filtered.filter((job) => {
        return job.location?.toLowerCase().includes(safeFilters.location.toLowerCase());
      });
    }
    
    // Filter by industry (job title)
    if (safeFilters.industry) {
      filtered = filtered.filter((job) => {
        return job.title?.toLowerCase().includes(safeFilters.industry.toLowerCase());
      });
    }
    
    // Filter by salary range
    if (safeFilters.salary) {
      filtered = filtered.filter((job) => {
        return matchesSalaryRange(job.salary, safeFilters.salary);
      });
    }
    
    return filtered;
  }, [allJobs, searchedQuery, safeFilters]);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center h-[88vh]">
              <span className="text-gray-500 text-lg">No jobs found matching your filters</span>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="mb-4">
                <h2 className="font-semibold text-gray-700">
                  Showing {filterJobs.length} job{filterJobs.length !== 1 ? 's' : ''}
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Jobs