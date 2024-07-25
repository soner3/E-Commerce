export default function ProductTableData({
  label = "Null",
  information = "Null",
}) {
  return (
    <tr>
      <td className="bg-sky-500 text-white uppercase font-bold border-t border-b border-sky-600">
        {label}
      </td>
      <td className="border-t border-b">{information}</td>
    </tr>
  );
}
