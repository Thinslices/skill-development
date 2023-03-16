type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
    level: HeadingLevel;
    style?: HeadingLevel;
    children?: React.ReactNode;
};

export const Heading: React.FC<HeadingProps> = props => {
    const { level, children } = props;
    const style = props.style ?? level;
    const Tag = `h${level}` as const;

    return <Tag className={`h${style}`}>{children}</Tag>;
};
