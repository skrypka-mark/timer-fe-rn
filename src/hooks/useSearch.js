import { useEffect, useState, useRef } from 'react';
import _ from 'lodash';

export const useSearch = (data, field) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const prevSearchResult = useRef([]);

    const resetSearchResult = () => {
        setSearchResult([]);
    };

    useEffect(() => {
        const result = data?.filter(item => item[field]?.slice(0, searchValue.length)?.toUpperCase() === searchValue.toUpperCase());
        setSearchResult(_.isEqual(result, data) ? prevSearchResult.current : result);
        prevSearchResult.current = result;
    }, [searchValue]);

    return [searchResult, setSearchValue, { searchValue, resetSearchResult }];
};
