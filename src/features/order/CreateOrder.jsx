/* eslint-disable react/no-unescaped-entities */
// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // For the errors I want to show on the screen
  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>
      {/* <Form method="POST" action="/order/new"> It already finds it automatically, there is no need to write an action.*/}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="md:py w-full rounded-full border border-stone-200 px-4
              py-2 text-sm transition-all
               duration-300 placeholder:text-stone-400 focus:outline-none focus:ring
             focus:ring-yellow-400 md:px-6 md:py-3 "
          />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input
              type="tel"
              name="phone"
              required
              className="md:py w-full rounded-full border border-stone-200 px-4
              py-2 text-sm transition-all
               duration-300 placeholder:text-stone-400 focus:outline-none focus:ring
             focus:ring-yellow-400 md:px-6 md:py-3 "
            />
          </div>
          {/* show error message */}
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>
        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              required
              className="md:py w-full rounded-full border border-stone-200 px-4
              py-2 text-sm transition-all
               duration-300 placeholder:text-stone-400 focus:outline-none focus:ring
             focus:ring-yellow-400 md:px-6 md:py-3 "
            />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 
            focus:outline-none
            focus:ring focus:ring-yellow-400 focus:ring-offset-2
            "
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* Created for the purpose of passing a JSON string containing the user's shopping cart information to the server */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button
            disabled={isSubmitting}
            className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase
          tracking-wide text-stone-800 transition-colors  duration-300 hover:bg-yellow-300
          focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2
          disabled:cursor-not-allowed
          "
          >
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  );
}

//! Receiving data
export async function action({ request }) {
  const formData = await request.formData();
  //! convert to object
  const data = Object.fromEntries(formData);
  console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };
  //! Error Management
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please give us your correct phone number';
  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay,create new order and redirect
  const newOrder = await createOrder(order);
  //! Can not use navigate in the function but can use redirect instead
  // for request and response
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
