import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddItemComponent', () => {
	let component: AddItemComponent;
	let fixture: ComponentFixture<AddItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddItemComponent],
			imports: [HttpClientTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// it('should create', () => {
	//   expect(component).toBeTruthy();
	// });


});
