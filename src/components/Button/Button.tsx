import classnames from 'classnames';

type ButtonStyle = 'primary' | 'secondary' | 'tertiary' | 'text';

type ButtonProps = {
  children?: React.ReactNode,
  style?: ButtonStyle,
  href?: string,
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ( props ) => {
  const { children, href } = props;
  const style = props.style ?? 'primary';
  const styleClass = classnames({
    'bg-red border-red text-white': style === 'primary',
    'bg-black border-black text-white': style === 'secondary',
    'px-0 border-transparent': style === 'text',
  } );

  const className = `inline-flex gap-2 items-center py-1.5 px-4 border-2 cursor-pointer rounded whitespace-nowrap ${ styleClass }`;
  const onClick = props.onClick ?? (() => { return });

  if ( href ) {
    return (
      <a className={ className } href={ href } onClick={ onClick }>
        { children }
      </a>
    )
  }

  return (
    <div className={ className } onClick={ onClick }>
      { children }
    </div>
  )
}

type ButtonsProps = {
  children?: React.ReactNode
}

export const Buttons:React.FC<ButtonsProps> = ( { children } ) => {

  return (
    <div className="flex gap-4">
      { children }
    </div>
  )
}