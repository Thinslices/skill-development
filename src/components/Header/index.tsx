import { Logo, MainMenu, Search, Wrapper } from '..';

export const Header: React.FC = () => {
    return (
      <Wrapper className="border-b border-b-borders">
        <div className="flex justify-between items-center py-4">
          <div><Logo /></div>
          <div><Search /></div>
          <div><MainMenu /></div>
        </div>
      </Wrapper>
    )
  }