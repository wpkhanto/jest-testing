// 6. ทดสอบ URL Query Parameters
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SearchResults from './SearchResults';

// Component ที่ใช้ URL Query Parameters
// function SearchResults() {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('q') || '';
//   return <div>Search results for: {query}</div>;
// }

describe('SearchResults Component', () => {
  test('renders search results with the correct query parameter', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=react+testing']}>
        <Routes>
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Search results for: react testing')).toBeInTheDocument();
  });
  
  test('handles missing query parameter', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Search results for:')).toBeInTheDocument();
  });
});
