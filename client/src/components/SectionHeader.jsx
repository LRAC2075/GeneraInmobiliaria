const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-light-text dark:text-white mb-3">{title}</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;
