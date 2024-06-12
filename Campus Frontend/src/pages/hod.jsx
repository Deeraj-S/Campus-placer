import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/hod/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title>HOD Details</title>
      </Helmet>

      <UserView />
    </>
  );
}
