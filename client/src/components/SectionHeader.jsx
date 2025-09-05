const SectionHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-4xl font-bold text-primary-900 dark:text-neutral-100 mb-3">{title}</h2>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;