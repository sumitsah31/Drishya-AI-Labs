//import "./styles.css";
import { useImmer } from "use-immer";
import React from "react";

export default function App() {
  const initialTable = () => {
    return [new Array(3).fill(0), new Array(3).fill(0), new Array(3).fill(0)];
  };
  const [table, updateTable] = useImmer(initialTable);

  const nColumns = table[0]?.length ?? 0;
  const computeSums = (table) => {
    const rowSums = [];
    const colSums = new Array(nColumns).fill(0);
    for (let rowIdx = 0; rowIdx < table.length; rowIdx++) {
      const row = table[rowIdx];
      rowSums.push(sum(row));
      for (let colIdx = 0; colIdx < nColumns; colIdx++) {
        colSums[colIdx] += row[colIdx];
      }
    }
    return { rowSums, colSums };
  };
  const [sums, updateSums] = useImmer({ rowSums: [], colSums: [] });

  const sum = (rowItems = []) => {
    return rowItems.reduce((a, c) => a + c, 0);
  };

  const handleOnChange = (rowIndex, colIndex) => (e) => {
    const value = Number(e.target.value);
    updateTable((s) => {
      s[rowIndex][colIndex] = value;
    });
  };

  return (
    <>
    <div className="App" style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <table>
          <thead>
            <tr>
              {new Array(nColumns).fill().map((_, columnHeaderIndex) => {
                return (
                  <th key={columnHeaderIndex} style={{ width: "50px" }}>
                    C{columnHeaderIndex}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {table.map((row, index) => {
              return (
                <tr key={index} style={{border:"solid black",backgroundColor:"blue"}}>
                  {row.map((column, columnIndex) => {
                    return (
                      <td key={columnIndex} style={{border:"solid black",backgroundColor:"blue"}}>
                        <input
                          value={column}
                          onChange={handleOnChange(index, columnIndex)}
                          style={{ width: "50px",border:"solid black",backgroundColor:"blue"}}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              {sums.colSums.map((colSum, index) => {
                return <td key={index}>{colSum}</td>;
              })}
            </tr>
          </tbody>
        </table>

        <table style={{ marginLeft: "10px" }}>
          <tbody>
            {sums.rowSums.map((rowSum, index) => {
              return (
                <tr key={index}>
                  <td>{rowSum}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </div>
    <div>
      <button
        onClick={() => {
          updateSums(computeSums(table));
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          updateTable(() => {
            const newTable = initialTable();
            updateSums(computeSums(newTable));
            return newTable;
          });
        }}
      >
        Delete
      </button>
    </div>
    </>
  );
}
