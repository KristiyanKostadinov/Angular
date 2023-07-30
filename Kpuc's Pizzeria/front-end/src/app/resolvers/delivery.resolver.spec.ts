import { TestBed } from '@angular/core/testing';

import { DeliveryResolver } from './cart.resolver';

describe('DeliveryResolver', () => {
  let resolver: DeliveryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DeliveryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
