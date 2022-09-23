export interface PriceModel {
  id?: string;
  northeast: { middle_atlantic: { bc_sum: number, rc_sum: number }, new_england: { bc_sum: number, rc_sum: number } };
  west: { mountain: { bc_sum: number, rc_sum: number }, pacific: { bc_sum: number, rc_sum: number } }
}
