import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/student/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Student Details</title>
      </Helmet>

      <BlogView />
    </>
  );
}
