import React, { useMemo, useRef, useState } from 'react'
import Tooltip from './Tooltip';

const Tabs = [
  { name: "Home" },
  { name: "About" },
  { name: "Contact" },
];

const TabSwitch = () => {
  const [activeTab, setActiveTab] = useState(Tabs[0].name);
  const tabRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % Tabs.length;
      tabRefs.current[nextIndex].focus();
      setActiveTab(Tabs[nextIndex].name);
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + Tabs.length) % Tabs.length;
      tabRefs.current[prevIndex].focus();
      setActiveTab(Tabs[prevIndex].name);
    }
  };

  const getUiPage = () => {
    switch (activeTab) {
      case "Home":
        return <div>Home Content</div>;
      case "About":
        return <div>About Content</div>;
      case "Contact":
        return <div>Contact Content</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  const pageContent = useMemo(getUiPage, [activeTab]);

  return (
    <div>
      <nav role="tablist" aria-label="Main Tabs" style={{ display: 'flex', gap: '10px' }}>
        {Tabs.map((tab, index) => (
          <div
            key={tab.name}
            role="tab"
            tabIndex={0}
            ref={(el) => (tabRefs.current[index] = el)}
            aria-selected={activeTab === tab.name}
            onClick={() => setActiveTab(tab.name)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              padding: '10px',
              background: activeTab === tab.name ? 'yellow' : '',
              cursor: 'pointer',
              outline: 'none',
              border: '1px solid #ccc',
            }}
          >
            <Tooltip
                position='right'
                content='This is a contact tab'
                delay={100}
            >
            {tab.name}

            </Tooltip>
          </div>
        ))}
      </nav>

      <div role="tabpanel" style={{ padding: '20px' }}>
        {pageContent}
      </div>
    </div>
  );
};

export default TabSwitch;
