import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    //* sm: min-width: 640px, md: min-width: 768px
    <div className=" flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      {/* space-x-4:add 4 spaces to the x axis */}
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
