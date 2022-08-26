import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
// import {
//     CoinsIcon,
//     InboxIcon,
//     KeyboardIcon,
//     LanguageIcon,
//     MessageIcon,
//     QuestionIcon,
//     SearchIcon,
//     SettingIcon,
//     UploadIcon,
//     UserIcon,
// } from '~/components/icons';

const cx = classNames.bind(styles);

function Sidebar() {
    // const icons = [
    //     CoinsIcon,
    //     InboxIcon,
    //     KeyboardIcon,
    //     LanguageIcon,
    //     MessageIcon,
    //     QuestionIcon,
    //     SearchIcon,
    //     UploadIcon,
    //     UserIcon,
    //     SettingIcon,
    // ];
    return (
        <aside className={cx('wrapper')}>
            <h2>Sidebar</h2>
            {/* <CoinsIcon />
            <ul>
                {icons.map((icon, index) => {
                    let Layout = icon;
                    return (
                        <li key={index}>
                            <Layout />
                        </li>
                    );
                })}
            </ul> */}
        </aside>
    );
}

export default Sidebar;
