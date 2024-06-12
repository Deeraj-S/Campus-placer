import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/Placement/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Placement Officer</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
