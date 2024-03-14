/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

//* prioritization after completing the order (order update)
function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    //! This time it's not fetcher.load, wraped it in the form component instead
    //! PATCH was used to update the order
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>;
    </fetcher.Form>
  );
}

export default UpdateOrder;
//! Need action to update
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
