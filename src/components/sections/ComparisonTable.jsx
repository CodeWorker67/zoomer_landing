export default function ComparisonTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-zoomer-border">
            {columns.map((col) => (
              <th key={col} className="text-left py-3 px-4 text-gray-400 font-medium">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-zoomer-border/50">
              {row.map((cell, i) => (
                <td key={i} className={`py-3 px-4 ${i === 0 ? 'text-gray-300' : 'text-gray-400'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
