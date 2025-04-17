import React, { useState, Children, isValidElement } from 'react';
import TabPanel from './TabPanel';

interface TabsProps {
  children: React.ReactNode;
  defaultTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, defaultTab }) => {
  // Extract tab labels from children
  const tabs = Children.toArray(children)
    .filter(child => isValidElement(child) && child.type === TabPanel)
    .map(child => ({
      key: isValidElement(child) ? child.key?.toString() || '' : '',
      label: isValidElement(child) ? child.props.label : ''
    }));
  
  // Set default active tab
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs[0]?.key || ''));
  
  const handleTabClick = (key: string) => {
    setActiveTab(key);
  };
  
  return (
    <div className="tabs-container">
      <div className="tabs-header" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {Children.map(children, child => {
          if (isValidElement(child) && child.key?.toString() === activeTab) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
