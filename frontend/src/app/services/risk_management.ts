import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContractRM} from "../dtos/contract_rm";
import {RateForm} from "../dtos/rate_form";
import {VoteForm} from "../dtos/vote_form";

@Injectable({
  providedIn: "root",
})
export class RiskManagementService {
  private static readonly URL_VIEW_CONTRACT: string = '/api/risk_management/contract/:contract_number';
  private static readonly URL_VIEW_CONTRACTS: string = '/api/risk_management/contracts';
  private static readonly URL_RATE: string = '/api/risk_management/rate';
  private static readonly URL_VOTE: string = '/api/risk_management/vote';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  view_contract(contract_number: string): Observable<ContractRM> {
    return this.httpClient.get<ContractRM>(RiskManagementService.URL_VIEW_CONTRACT.replace(":contract_number", contract_number));
  }

  view_contracts(): Observable<ContractRM[]> {
    return this.httpClient.get<ContractRM[]>(RiskManagementService.URL_VIEW_CONTRACTS);
  }

  rate(form: RateForm): Observable<void> {
    return this.httpClient.post<void>(RiskManagementService.URL_RATE, form);
  }

  vote(form: VoteForm): Observable<void> {
    return this.httpClient.post<void>(RiskManagementService.URL_VOTE, form);
  }
}
