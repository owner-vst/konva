const OptionsDialog = ({ shapes }) => {
  return (
    <div className="p-2 h-full overflow-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Width</th>
            <th className="py-2">Height</th>
            <th className="py-2">[X, Y]</th>
          </tr>
        </thead>
        <tbody>
          {shapes.map((shape) => (
            <tr key={shape.id}>
              <td className="py-2">{shape.id}</td>
              <td className="py-2">{shape.width}</td>
              <td className="py-2">{shape.height}</td>
              <td className="py-2">{`[${shape.x}, ${shape.y}]`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptionsDialog;
