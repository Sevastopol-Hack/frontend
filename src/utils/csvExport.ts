export const csvExport = (cells: string[][]) => {
  const data = cells.map((row) => row.join(";")).join("\n");
  const blob = new Blob([data], { type: "text/csv" });

  const elem = window.document.createElement("a");
  elem.href = window.URL.createObjectURL(blob);
  elem.download = "test.csv";
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
};
