import { useDialog } from "../../hooks";
import { Button, Buttons } from "../Button/Button";

export const Dialog: React.FC = () => {
    const { title, message, confirm, cancel, visible } = useDialog();
    const wrapperClassName = visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';
    const containerClassName = visible ? '' : 'opacity-0 translate-y-5'

    return (
      <div className={ `fixed inset-0 flex justify-center items-center transition-opacity ease-out duration-300 ${ wrapperClassName }` }>
        <div className={ `absolute inset-0 bg-black opacity-25` }></div>
        <div className={ `relative bg-white rounded transition-all duration-300 ${ containerClassName }` }>
            <div className="p-8 space-y-4 text-center">
                <h2 className="h2">{ title }</h2>
                <p>{ message }</p>
            </div>
            <div className="p-4 border-t border-t-borders flex justify-end">
                <Buttons>
                    <Button style="secondary" onClick={ () => { cancel() } }>Cancel</Button>
                    <Button onClick={ () => { confirm() }}>Confirm</Button>
                </Buttons>
            </div>
        </div>
      </div>
    );
  }