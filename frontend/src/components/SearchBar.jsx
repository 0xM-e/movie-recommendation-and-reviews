import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import movieService from '../services/movieService';
import '../styles/SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const debounceRef = useRef(null);

    const handleChange = useCallback((e) => {
        setQuery(e.target.value);
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(debounceRef.current);
    }, [query]);

    useEffect(() => {
        const fetchData = async () => {
            if (debouncedQuery.length >= 2) {
                setLoading(true);
                setError(null);

                try {
                    const response = await movieService.searchMoviesByName(debouncedQuery);
                    setResults(response);
                } catch (error) {
                    setError('An error occurred while fetching movies.');
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
                setLoading(false);
                setError(null);
            }
        };

        fetchData();
    }, [debouncedQuery]);

    const handleResultClick = (result) => {
        console.log(`Selected: ${result.title} (${result.year})`);
        setResults([]);
        setQuery('');
        navigate(`/movies/${result.id}`, { state: { movie: result.id } });
    };

    return (
        <div className="header-search">
            <input
                type="text"
                className="search-input"
                placeholder="Search for a movie..."
                onChange={handleChange}
                value={query}
                autoComplete="off"
                aria-label="Search for a movie"
            />

            {query.length >= 2 && (
                <div className="search-feedback" role="listbox">
                    {loading ? (
                        <div className="loading-text">Loading...</div>
                    ) : error ? (
                        <div className="error-text">{error}</div>
                    ) : results.length > 0 ? (
                        <ul className="results-list">
                            {results.map((movie) => (
                                <li
                                    key={movie.id}
                                    onClick={() => handleResultClick(movie)}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && handleResultClick(movie)}
                                    role="option"
                                >
                                    <img src={movie.poster} alt={`${movie.title} poster`} />
                                    <span>
                                        <strong>{movie.title}</strong>
                                        <small>{movie.year}</small>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="loading-text" style={{ color: '#999' }}>
                            No results found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
