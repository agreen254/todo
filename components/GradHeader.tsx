const GradHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-3xl ml-10 text-primary uppercase font-extrabold">
      {children}
    </h2>
  );
};

export default GradHeader;