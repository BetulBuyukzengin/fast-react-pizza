import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  //! used to get the error
  const error = useRouteError();
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      {/* History de gerçekleşiyor  */}
      <LinkButton to="-1">&larr; Go back </LinkButton>
    </div>
  );
}

export default Error;
