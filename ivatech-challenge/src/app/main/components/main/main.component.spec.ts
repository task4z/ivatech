import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/login/services/login.service';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  let fakeLoginService = { logout: jasmine.createSpy('logout') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [
        { provide: LoginService, useValue: fakeLoginService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should logout', () => {
    component.logout();
    expect(fakeLoginService.logout).toHaveBeenCalled();
  });
});
