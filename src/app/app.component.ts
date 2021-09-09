import { Component } from '@angular/core';
import { FlexGrid, CellRangeEventArgs } from '@grapecity/wijmo.grid';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = [
    {
      code: 'code1',
      description: 'description obj 1',
      value1: 1,
      value2: 2,
      value3: 3
    },
    {
      code: 'code2',
      description: 'description obj 2',
      value1: 21,
      value2: 22,
      value3: 23
    },
    {
      code: 'code3',
      description: 'description obj 3',
      value1: 31,
      value2: 32,
      value3: 33
    },
    {
      code: 'code4',
      description: 'description obj 4',
      value1: 41,
      value2: 42,
      value3: 43
    }
  ];
  constructor() {}

  onSelectionChanging(s: FlexGrid, e: CellRangeEventArgs) {
    if(s.columns[e.col]) { 
      e.cancel = s.columns[e.col].isReadOnly;
      return;
    }

    for (let c = e.range.leftCol; c <= e.range.rightCol; c++) {
      for (let r = e.range.topRow; r <= e.range.bottomRow; r++) {               
        e.cancel = s.columns[c]?.isReadOnly;         
      }
    }
  }
  
  onCellEditEnded(s: FlexGrid, e: CellRangeEventArgs) {
    var data = s.getCellData(e.row, e.col, false);
    const ranges = s.selectedRanges;

    for (let r = 0; r < ranges.length; r++) {
      for (var i = ranges[r].topRow; i <= ranges[r].bottomRow; i++) {
        for (var j = ranges[r].leftCol; j <= ranges[r].rightCol; j++) {
          s.setCellData(i, j, data);
        }
      }
    }
  }
}
