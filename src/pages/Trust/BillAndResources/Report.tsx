import React from 'react';

export default function Report() {
  return (
    <table className="table-auto w-full text-[16px] text-left">
      <thead className="text-[#99AC9B]">
        <tr>
          <th className="py-2">Name of legal document</th>
          <th className="text-right">Operation</th>
        </tr>
      </thead>
      <tbody className="text-[#C2D7C7F6]">
        {
          new Array(5).fill(null).map((it, idx) => (
            <tr>
              <td className="py-4">Trust Agreement</td>
              <td className="text-right">
                <div className="flex flex-row items-center justify-end gap-4 font-title font-bold">
                  <div className="gradient-text1">Check</div>
                  <div className="gradient-text1">Download</div>
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
