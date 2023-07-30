import { TestBed } from '@angular/core/testing';

import { PizzaResolver } from './pizza.resolver';

describe('PizzaResolver', () => {
  let resolver: PizzaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PizzaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
