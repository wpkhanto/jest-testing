import React from 'react';

interface TabPanelProps {
  children: React.ReactNode;
  label: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return (
    <div className="tab-panel" role="tabpanel">
      {children}
    </div>
  );
};

export default TabPanel;
