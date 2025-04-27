import React from 'react';

const OrientationPrompt: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center bg-black bg-opacity-75 p-8 text-white landscape:hidden sm:hidden">
      <div>
        <p className="mt-4 text-4xl font-semibold">
          Psst! <br />
          Turn your device sideways for a better view!
        </p>
      </div>
    </div>
  );
};

export default OrientationPrompt;
