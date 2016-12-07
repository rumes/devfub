/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LayoutComponent } from './layout.component';
import {InputTextModule} from 'primeng/primeng';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      imports : [InputTextModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
