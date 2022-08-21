import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Wrapper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useState, useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setSearchResults([1]);
        }, 0);
    }, []);

    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        inputRef.current.focus();
    };
    const handleHideResults = () => {
        setShowResults(false);
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResults && searchResults.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
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
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    onFocus={(e) => {
                        setShowResults(true);
                    }}
                />
                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        {/* Close */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
                <button className={cx('search-btn')}>
                    {/* Search */}
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
