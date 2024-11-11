import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoEventoComponent } from './carrito-evento.component';

describe('CarritoEventoComponent', () => {
  let component: CarritoEventoComponent;
  let fixture: ComponentFixture<CarritoEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
