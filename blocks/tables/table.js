export default function decorate(block) {
  /* Convert block structure into an HTML table */
  const table = document.createElement('table');
  
  [...block.children].forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    const rowCells = [...row.children];
    
    /* First row becomes table header */
    const elementType = rowIndex === 0 ? 'th' : 'td';
    
    rowCells.forEach((cell) => {
      const element = document.createElement(elementType);
      element.innerHTML = cell.innerHTML;
      tr.append(element);
    });
    
    table.append(tr);
  });
  
  block.replaceChildren(table);
}
