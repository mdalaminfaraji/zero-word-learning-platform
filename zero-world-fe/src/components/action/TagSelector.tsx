import React, { useRef, useEffect, useState } from 'react';

interface Tag {
  id: number;
  name: string;
}

interface TagSelectorProps {
  tags: Tag[];
  onSelectTag: (tag: Tag) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, onSelectTag }) => {
  const [showTagsPopup, setShowTagsPopup] = useState(false);
  const tagsButtonRef = useRef<HTMLButtonElement | null>(null);

  // Handle opening the tags popup
  const handleTagsClick = () => {
    setShowTagsPopup(true);
  };

  // Handle closing the tags popup
  const handleTagsClose = () => {
    setShowTagsPopup(false);
  };

  // Handle tag selection
  const handleTagSelection = (tag: Tag) => {
    onSelectTag(tag);
    handleTagsClose();
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagsButtonRef.current && 
          !tagsButtonRef.current.contains(event.target as Node) &&
          !(document.getElementById('custom-tags-popup')?.contains(event.target as Node))) {
        setShowTagsPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Create groups of tags (2 columns)
  const leftColumnTags = tags.slice(0, Math.ceil(tags.length / 2));
  const rightColumnTags = tags.slice(Math.ceil(tags.length / 2));

  return (
    <div style={{ position: 'relative' }}>
      <button
        ref={tagsButtonRef}
        onClick={handleTagsClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          padding: '4px 16px',
          borderRadius: '20px',
          border: '1px solid #1976d2',
          backgroundColor: 'transparent',
          color: '#1976d2',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          marginRight: '8px',
          transition: 'background-color 0.2s',
          outline: 'none',
        }}
      >
        <span>Show Tags</span>
        <span style={{ 
          display: 'inline-flex', 
          transform: 'rotate(90deg)',
          fontSize: '16px'
        }}>
          ▶
        </span>
      </button>

      {/* Custom Tags Popup */}
      {showTagsPopup && (
        <div
          id="custom-tags-popup"
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: tagsButtonRef.current ? tagsButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 8 : 0,
            left: tagsButtonRef.current ? tagsButtonRef.current.getBoundingClientRect().left + window.scrollX : 0,
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '12px',
            maxWidth: '250px',
          }}
        >
          <div 
            style={{
              display: 'flex',
            }}
          >
            {/* Left column */}
            <div style={{ marginRight: '8px' }}>
              {leftColumnTags.map(tag => (
                <div
                  key={tag.id}
                  onClick={() => handleTagSelection(tag)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    fontWeight: 500,
                    margin: '4px 0',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eeeeee'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                >
                  {tag.name}
                </div>
              ))}
            </div>
            
            {/* Right column */}
            <div>
              {rightColumnTags.map(tag => (
                <div
                  key={tag.id}
                  onClick={() => handleTagSelection(tag)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    fontWeight: 500,
                    margin: '4px 0',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eeeeee'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;
