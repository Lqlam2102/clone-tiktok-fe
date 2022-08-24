import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Wrapper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/icons';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

import * as searchServices from '~/apiServices/searchServices';
const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debounce = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounce);

            setSearchResults(result);
            setLoading(false);
        };
        fetchApi();

        //TODO: Way axios
        // request
        //     .get('users/search', {
        //         params: {
        //             q: debounce,
        //             type: 'less',
        //         },
        //     })
        //     .then((results) => {
        //         setSearchResults(results.data);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });

        // TODO: way fetch
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounce)}&type=less`)
        //     .then((results) => {
        //         return results.json();
        //     })
        //     .then((results) => {
        //         setSearchResults(results.data);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
    }, [debounce]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        inputRef.current.focus();
    };
    const handleHideResults = () => {
        setShowResults(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleChangeSearchValue = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResults && searchResults.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResults &&
                            searchResults.map((account) => {
                                return <AccountItem data={account} key={account.id} />;
                            })}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResults}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder="Search accounts and videos "
                    spellCheck={false}
                    value={searchValue}
                    onChange={handleChangeSearchValue}
                    onFocus={(e) => {
                        setShowResults(true);
                    }}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        {/* Close */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')} onMouseDown={handleSubmit}>
                    {/* Search */}
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
