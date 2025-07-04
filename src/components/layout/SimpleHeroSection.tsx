
const SimpleHeroSection = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        Developer Tools Collection
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        A comprehensive collection of essential online tools for developers. This project is{" "}
        <a 
          href="https://github.com/rangeva/online-dev-tools" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          open source
        </a>
        . No sign-up required, completely free, and works entirely in your browser.
      </p>
    </div>
  );
};

export default SimpleHeroSection;
