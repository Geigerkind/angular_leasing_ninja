import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contract} from "../dtos/contract";
import {FillOutForm} from "../dtos/fill_out_form";

@Injectable({
  providedIn: "root",
})
export class SalesService {
  private static readonly URL_VIEW_CONTRACT: string = '/api/sales/view_contract/:contract_number';
  private static readonly URL_FILL_OUT_CONTRACT: string = '/api/sales/fill_out_contract';
  private static readonly URL_SIGN_CONTRACT: string = '/api/sales/sign_contract';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  view_contract(contract_number: string): Observable<Contract> {
    return this.httpClient.get<Contract>(SalesService.URL_VIEW_CONTRACT.replace(":contract_number", contract_number));
  }

  fill_out_contract(form: FillOutForm): Observable<void> {
    return this.httpClient.post<void>(SalesService.URL_FILL_OUT_CONTRACT, form);
  }

  sign_contract(contract_number: string): Observable<void> {
    return this.httpClient.post<void>(SalesService.URL_SIGN_CONTRACT, JSON.stringify(contract_number));
  }

}
