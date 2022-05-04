export default function FormCard({ children, currentStep, goToStep }) {
  return (
    <div className="max-w-4xl m-auto">
      {currentStep < 4 && (
        <>
          <div className="relative w-full flex justify-around p-8 mb-8">
            <div className="absolute bg-cyan-400 h-1 top-1/2 w-3/4 z-0"></div>
            {Array(4)
              .fill()
              .map((_, i) => {
                return (
                  <div
                    disabled={true}
                    onClick={() => {
                      if (currentStep >= i) goToStep(i);
                    }}
                    key={i}
                    className={`border-4 border-cyan-400 rounded-full h-12 w-12 flex justify-center items-center z-10
                      ${currentStep >= i ? 'bg-cyan-400 cursor-pointer' : 'bg-white'}`}
                  >
                    {i + 1}
                  </div>
                );
              })}
          </div>
        </>
      )}
      {children}
    </div>
  );
}
