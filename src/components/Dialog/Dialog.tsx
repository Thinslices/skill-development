import { useDialog } from '../../hooks';
import { Button, Buttons } from '../Button/Button';

export const Dialog: React.FC = () => {
  const { title, message, confirm, cancel, visible } = useDialog();
  const wrapperClassName = visible
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';
  const containerClassName = visible ? '' : 'opacity-0 translate-y-5';

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-out ${wrapperClassName}`}>
      <div className={`absolute inset-0 bg-black opacity-25`}></div>
      <div
        className={`relative rounded bg-white transition-all duration-300 ${containerClassName}`}>
        <div className="space-y-4 p-8 text-center">
          <h2 className="h2">{title}</h2>
          <p>{message}</p>
        </div>
        <div className="flex justify-end border-t border-t-borders p-4">
          <Buttons>
            <Button
              style="secondary"
              onClick={() => {
                cancel();
              }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                confirm();
              }}>
              Confirm
            </Button>
          </Buttons>
        </div>
      </div>
    </div>
  );
};
