import { useEffect, useState, useReducer } from 'react';

export const useSearch = (data, field) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState(data);

    useEffect(() => {
        setSearchResult(data?.filter(item => item[field]?.slice(0, searchValue.length)?.toUpperCase() === searchValue.toUpperCase()));
    }, [searchValue]);
    useEffect(() => {
        setSearchResult(data);
    }, [data]);

    return [searchResult, setSearchValue];
};
