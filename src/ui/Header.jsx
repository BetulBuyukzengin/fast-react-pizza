import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';
function Header() {
  return (
    //* add 4 to the x axis (padding / px-4)
    <header className=" border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase	">
      {/* tracking-[4px] */}
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
