import "@/app/styles/pattern.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-4 bg-white overflow-hidden text-left">{children}</div>
  );
};

export default AuthLayout;
