import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Blog } from './blog';

describe('Blog', () => {
  let fixture: ComponentFixture<Blog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Blog] }).compileComponents();
    fixture = TestBed.createComponent(Blog);
    await fixture.whenStable();
  });

  it('debe crearse', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
