import { Link } from 'react-router';

const Header = () => {
  return (
    <header className=" [grid-area:header]">
      <Link to="/" className="text-[32px] font-bold p-1">
        Sevtify
      </Link>
    </header>
  );
};

export default Header;
