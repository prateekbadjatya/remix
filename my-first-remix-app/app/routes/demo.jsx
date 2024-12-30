import React, { useState } from "react";

const DemoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div>DemoPage</div>
      {isLoading && <p>Loading...</p>}
      <button onClick={() => setIsLoading(true)}>Submit</button>
    </>
  );
};

export default DemoPage;
