const RegisterAccountInfo = () => {
  return (
    <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-[#003B95] lg:px-8 px-4 py-4">
      <div>
        <h4 className="text-white text-lg font-semibold">
          Create Your Account
        </h4>
        <p className="text-[13px] text-white mt-3 leading-relaxed">
          Welcome to our registration page! Get started by creating your
          account.
        </p>
      </div>
      <div>
        <h4 className="text-white text-lg font-semibold">
          Simple & Secure Registration
        </h4>
        <p className="text-[13px] text-white mt-3 leading-relaxed">
          Our registration process is designed to be straightforward and secure.
          We prioritize your privacy and data security.
        </p>
      </div>
    </div>
  );
};

export default RegisterAccountInfo;
