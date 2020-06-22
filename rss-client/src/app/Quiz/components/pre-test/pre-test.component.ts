import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.css'],
})
export class PreTestComponent implements OnInit {
  @Input() config;
  @Output() pushProgress = new EventEmitter();
  subjectPicture;
  instructions = [];

  onEvent() {
    this.pushProgress.emit('in-progress');
  }

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    //Set the subject image
    this.subjectPicture = this.imageService.setImage(
      this.config.subjectPicture
    );
    //Adds instructions about quiz
    // this.config.instructions.forEach((item) => {
    //   this.instructions.push(item);
    // });
  }
}
