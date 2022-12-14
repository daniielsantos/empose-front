import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InventoryService } from './inventory.service';

describe('InventoryComponent', () => {
  let service: InventoryService
  let http: HttpClient

  const httpStub = {
    get: (_params: any) => of([
      {
          "id": 1,
          "quantity": 0,
          "created_at": "2022-12-14T06:32:50.957Z",
          "updated_at": "2022-12-14T03:33:55.247Z",
          "sku": {
              "id": 1,
              "name": "a",
              "description": "a"
          }
      }
    ])
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [
      //   {
      //     provide: HttpClient,
      //     useValue: httpStub
      //   }
      // ]
      imports: [
        HttpClientTestingModule
      ]
    })
    service = TestBed.inject(InventoryService)
    http = TestBed.inject(HttpClient)
  })

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call all inventories', () => {
    const spy = spyOn(http, 'get').and.callThrough()

    service.findAll()
    expect(spy).toHaveBeenCalledWith('http://localhost:3000/api/v1/sku-inventory')

    expect(service).toBeTruthy();
  });
});