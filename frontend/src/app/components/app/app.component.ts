import {Component} from '@angular/core';
import {Contract} from "../../dtos/contract";
import {SalesService} from "../../services/sales";
import {ContractRM} from "../../dtos/contract_rm";
import {RiskManagementService} from "../../services/risk_management";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LeasingNinja';

  displayedColumns: string[] = ["Contract number", "Customer", "Car", "Price", "Sign date"];
  displayedColumns_rm: string[] = ["Contract number", "Credit rating", "Vote result"];
  dataSource: Contract[] = [];
  dataSource_rm: ContractRM[] = [];
  dataSource_rm2: ContractRM[] = [];

  i_current_mode: boolean = false;

  input_contract_number: string = "";
  input_customer_forename: string = "";
  input_customer_surname: string = "";
  input_selected_car_brand: string = "";
  input_selected_vote_result: string = "";
  input_price: number = 0;
  input_credit_rating: number = 0;

  constructor(
    private salesService: SalesService,
    private riskManagementService: RiskManagementService
  ) {
  }

  input_cn_change(evt: any): void {
    this.input_contract_number = evt.target.value;
  }

  input_cfn_change(evt: any): void {
    this.input_customer_forename = evt.target.value;
  }

  input_csn_change(evt: any): void {
    this.input_customer_surname = evt.target.value;
  }

  input_car_brand_change(evt: any): void {
    this.input_selected_car_brand = evt.value;
  }

  input_vote_result_change(evt: any): void {
    this.input_selected_vote_result = evt.value;
  }

  input_p_change(evt: any): void {
    this.input_price = Number(evt.target.value);
  }

  input_credit_rating_change(evt: any): void {
    this.input_credit_rating = Number(evt.target.value);
  }

  load_contract(): void {
    this.salesService.view_contract(this.input_contract_number)
      .subscribe(result => {
        this.dataSource = [result];
        console.log("RESULT", result);
      });
  }

  submit_contract(): void {
    this.salesService.fill_out_contract({
      contract_number: this.input_contract_number,
      customer_forename: this.input_customer_forename,
      customer_surname: this.input_customer_surname,
      car_brand: this.input_selected_car_brand,
      price: this.input_price
    }).subscribe(() => {
      console.log("Contract filled out!");
    });
  }

  sign_contract(): void {
    this.salesService.sign_contract(this.input_contract_number)
      .subscribe(() => {
        console.log("Contract signed!");
      });
  }

  submit_credit_rating(): void {
    this.riskManagementService.rate({
      contract_number: this.input_contract_number,
      credit_rating: this.input_credit_rating
    }).subscribe(() => {
      console.log("RM credit rating submitted!");
    });
  }

  submit_vote_result(): void {
    this.riskManagementService.vote({
      contract_number: this.input_contract_number,
      vote_result: this.input_selected_vote_result
    }).subscribe(() => {
      console.log("RM vote result submitted!");
    });
  }

  load_rm_contract(): void {
    this.riskManagementService.view_contract(this.input_contract_number)
      .subscribe(contract => {
        this.dataSource_rm = [contract];
        console.log("RM contract loaded!");
      });
  }

  load_rm_contracts(): void {
    this.riskManagementService.view_contracts()
      .subscribe(contracts => {
        this.dataSource_rm2 = contracts;
        console.log("RM contracts loaded!");
      });
  }

  get current_mode(): string {
    if (this.i_current_mode)
      return "Risk management";
    return "Sales";
  }
}
