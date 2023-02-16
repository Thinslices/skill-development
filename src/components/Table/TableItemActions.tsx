import type { Study, User } from "@prisma/client";
import { TableItemActionButton } from "./TableItemActionButton";
import type { ButtonStyle } from "../Button/Button";

type TableItemEntity = Study | User;

export type TableItemAction<T extends TableItemEntity> = {
    label: string,
    style?: ButtonStyle,
    onClick: ( item: T ) => void
};

export type TableItemActionsProps<T extends TableItemEntity> = {
    item: T,
    actions?: Array<TableItemAction<T>>,
}

export const TableItemActions = <T extends TableItemEntity>( props: TableItemActionsProps<T> ) => {
    
    const { item, actions } = props;

    if ( ! Array.isArray( actions ) || ! actions.length ) {
        return null;
    }

    return (
        <div className="flex items-center gap-4 justify-end py-4">
            { actions.map( ( action, index ) => {
                return (
                    <TableItemActionButton 
                        key={ index } 
                        label={ action.label } 
                        style={ action.style }
                        onClick={ () => { action.onClick( item ) } } 
                    /> 
                ) 
            } ) }
        </div>
    )
}