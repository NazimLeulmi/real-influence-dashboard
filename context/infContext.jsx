import React, { createContext, useState } from "react";

const InfluencersContext = createContext(null);

function InfluencersProvider({ children }) {
  const [influencers, setInfluencers] = useState(null);
  const influencersValue = React.useMemo(
    () => ({ influencers, setInfluencers }),
    [influencers, setInfluencers]
  );
  return (
    <InfluencersContext.Provider value={influencersValue}>
      {children}
    </InfluencersContext.Provider>
  );
}

export { InfluencersContext, InfluencersProvider };
