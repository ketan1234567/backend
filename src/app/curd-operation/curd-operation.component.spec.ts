import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurdOperationComponent } from './curd-operation.component';

describe('CurdOperationComponent', () => {
  let component: CurdOperationComponent;
  let fixture: ComponentFixture<CurdOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurdOperationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurdOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
