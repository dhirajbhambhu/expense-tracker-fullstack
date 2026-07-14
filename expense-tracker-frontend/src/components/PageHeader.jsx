function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-10">

      <h1 className="text-4xl font-bold text-slate-800">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-gray-500 text-lg">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default PageHeader;