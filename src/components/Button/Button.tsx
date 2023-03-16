import classnames from 'classnames';

export type ButtonStyle = 'primary' | 'secondary' | 'tertiary' | 'text';

type ButtonProps = {
  children?: React.ReactNode,
  style?: ButtonStyle,
  href?: string,
  className?: string,
  onClick?: () => void
  isDisabled?: boolean
}

export const Button: React.FC<ButtonProps> = ( props ) => {
  const { children, href, isDisabled } = props;
  const style = props.style ?? 'primary';
  const styleClass = classnames( 
    props.className,
    {
      'bg-red border-red text-white px-4': style === 'primary',
      'bg-black border-black text-white px-4': style === 'secondary',
      'px-4': style === 'tertiary',
      'border-transparent': style === 'text',
    } 
  );

  const className = `transition-opacity duration-200 hover:opacity-50 ease-out inline-flex gap-2 items-center py-1.5 border-2 cursor-pointer rounded whitespace-nowrap ${ styleClass }`;
  const Tag = props.onClick ? 'button' : 'div';
  const onClick = props.onClick ?? (() => { return });

  if ( href ) {
    return (
      <a className={ className } href={ href } onClick={ onClick }>
        { children }
      </a>
    )
  }

  return (
    <Tag disabled = {isDisabled} className={ className } onClick={ onClick }>
      { children }
    </Tag>
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
