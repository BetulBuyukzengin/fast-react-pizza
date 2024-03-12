import { useSelector } from 'react-redux';

function UserName() {
  //! used useSelector to read data from store
  const username = useSelector((state) => state.user.username);
  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold md:block"> {username}</div>
  );
}

export default UserName;
