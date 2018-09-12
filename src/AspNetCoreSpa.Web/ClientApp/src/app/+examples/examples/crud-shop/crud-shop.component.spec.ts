import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudShopComponent } from './crud-shop.component';

describe('CrudShopComponent', () => {
  let component: CrudShopComponent;
  let fixture: ComponentFixture<CrudShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
