import * as React from 'react';
import classNames from 'classnames';

type Props = {
    children: React.ReactNode;
    className?: string;
    isFocused?: boolean;
    isInteractive?: boolean;
};

function ActivityItem(
    { children, className, isFocused, isInteractive, ...rest }: Props,
    ref: React.Ref<HTMLLIElement>,
) {
    return (
        <li
            className={classNames('bcs-ActivityItem', className, {
                'bcs-is-focused': isFocused,
                'bcs-is-interactive': isInteractive,
            })}
            ref={ref}
            {...rest}
        >
            {children}
        </li>
    );
}

export default React.forwardRef(ActivityItem);
