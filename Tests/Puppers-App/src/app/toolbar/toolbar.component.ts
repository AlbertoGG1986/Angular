import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  title = 'Puppers App!';

  constructor() {}

  ngOnInit(): void {}

  // like() {
  //   const dialogRef = this.dialog.open(DialogContentExampleDialog);

  //   // dialogRef.afterClosed().subscribe((result) => {
  //   //   console.log(`Dialog result: ${result}`);
  //   // });
  // }
}

// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: './dialog.html',
// })
// export class DialogContentExampleDialog {}
