import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from '../menu/MenuItem';
function Menu() {
  //! Step 3 in route loader : data fetched
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-800">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//! Step 1 in route loader : A loader function created
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
