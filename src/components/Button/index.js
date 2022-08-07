import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    children,
    small = false,
    medium = true,
    large = false,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    className,
    ...passProps
}) {
    let Comp = 'button';
    const _props = {
        ...passProps,
    };
    //Remove event listeners when button is disabled
    if (disabled) {
        Object.keys(_props).forEach((key) => {
            if (key.startsWith('on') && typeof _props[key] === 'function') {
                delete _props[key];
            }
        });
    }

    if (to) {
        _props.to = to;
        Comp = Link;
    } else if (href) {
        _props.href = href;
        Comp = 'a';
    }
    if ((primary && text) || (primary && outline) || (outline && text)) {
        throw new Error('Do not use many types');
    }
    const classes = cx('wrapper', {
        primary,
        outline,
        text,
        rounded,
        small,
        medium,
        large,
        disabled,
        [className]: className,
    });
    return (
        <Comp className={classes} {..._props}>
            <span>{children}</span>
        </Comp>
    );
}

export default Button;
