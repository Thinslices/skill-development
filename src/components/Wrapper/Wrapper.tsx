import React from 'react';

type WrapperProps = {
    children?: JSX.Element | JSX.Element[];
    className?: string;
};

export const Wrapper: React.FC<WrapperProps> = props => {
    const { children } = props;

    return <div className={`px-24 ${props.className ?? ''}`}>{children}</div>;
};
