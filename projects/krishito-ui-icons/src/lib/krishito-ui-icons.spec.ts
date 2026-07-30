import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrishitoUiIcons } from './krishito-ui-icons';

describe('KrishitoUiIcons', () => {
  let component: KrishitoUiIcons;
  let fixture: ComponentFixture<KrishitoUiIcons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrishitoUiIcons],
    }).compileComponents();

    fixture = TestBed.createComponent(KrishitoUiIcons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
