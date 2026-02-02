import React from 'react';
import { Folder } from 'lucide-react';

interface DynamicFolderViewProps {
  folderId: string;
  onClose: () => void;
}

const DynamicFolderView: React.FC<DynamicFolderViewProps> = ({ folderId, onClose }) => {
  return (
          <div className="bg-black/50 backdrop-blur-xl rounded-lg border border-ed-green-500/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
                      <Folder className="w-6 h-6 text-ed-green-400" />
            <h2 className="text-xl font-semibold text-ed-green-400">{folderId}</h2>
        </div>
        <button
          onClick={onClose}
                      className="text-ed-green-400/70 hover:text-ed-green-300 transition-colors"
        >
          ×
        </button>
      </div>
              <div className="text-ed-green-400/70">
        Dynamic folder view content will be implemented here.
      </div>
    </div>
  );
};

export default DynamicFolderView; 