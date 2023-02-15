import { Button } from "..";

type TableItemActionButtonProps = {
    label: string,
    onClick: () => void,
    style?: 'primary' | 'secondary' | 'tertiary' | 'text';
}

export const TableItemActionButton = ( props: TableItemActionButtonProps ) => {
    const { label, onClick } = props;

    return (
        <Button onClick={ onClick } style={ props.style ?? 'text' } >{ label }</Button>
    )
}