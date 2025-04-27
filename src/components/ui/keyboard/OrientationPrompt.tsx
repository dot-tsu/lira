import React from 'react';

const withOrientationPrompt = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center bg-black bg-opacity-75 p-8 text-white landscape:hidden md:hidden">
          <div>
            <p className="mt-4 text-4xl font-semibold">
              Psst! <br />
              Turn your device sideways for a better view!
            </p>
          </div>
        </div>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withOrientationPrompt;
