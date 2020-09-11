import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CheaterService } from 'src/app/services/cheater.service';

/**
 * @title Warning dialog to display whenever the mouse leaves the browser window
 */
@Component({
  selector: 'app-cheater-warning',
  templateUrl: './cheater-warning.component.html',
  styleUrls: ['./cheater-warning.component.css']
})
export class CheaterWarningComponent implements OnInit {
  open: boolean
  dialogRef
  
  constructor(public dialog: MatDialog, private cheaterService: CheaterService) {
  }

  ngOnInit(): void {
    this.cheaterService.leftTab.subscribe(e => {
      if (e) {
        if (!this.open) {
          this.openDialog()
        }
      }
    })
    this.cheaterService.invalidated.subscribe(e => {
      if (e) {
        this.dialogRef.close()
      }
    })
  }

  

  openDialog() {
    this.dialogRef = this.dialog.open(DialogContent);
    this.open = true
    this.dialogRef.afterClosed().subscribe(() => {
      this.open = false
    });
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.component.html',
})
export class DialogContent {}
