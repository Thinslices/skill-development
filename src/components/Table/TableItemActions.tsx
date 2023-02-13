import Link from "next/link";
import { Button } from "..";

export type TableItemActionsConfig = {
    view?: boolean,
    edit?: boolean,
    onDeleteClick?: ( id: string ) => void
}

export type TableItemActionsProps = {
    id: string,
    actions?: TableItemActionsConfig,
}

export const TableItemActions:React.FC<TableItemActionsProps> = ( props ) => {
    
    const { id, actions } = props;

    if ( ! actions?.view && ! actions?.edit && ! actions?.onDeleteClick ) {
        return null;
    }

    return (
        <div className="flex items-center gap-4 justify-end py-4">
            { actions.view && <Link href={ `/studies/${ id }` }>View</Link> }
            { actions.edit && <Link href={ `/studies/${ id }/edit` }>Edit</Link> }
            { actions.onDeleteClick && <Button onClick={ () => {
                if ( actions.onDeleteClick ) {
                    actions.onDeleteClick( id ) 
                }
            } }>Delete</Button> }
        </div>
    )
}