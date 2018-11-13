export interface TrainModelInterface extends Array<never> {
  secretHBStr: string;
  secretStr: string;
  buttonTextInfo: string;
  queryLeftNewDTO: TrainTicketInterface;
}

export interface TrainTicketInterface extends Array<never> {
  train_no: string;
  station_train_code: string;
  start_station_telecode: string;
  end_station_telecode: string;
  from_station_telecode: string;
  to_station_telecode: string;
  start_time: string;
  arrive_time: string;
  lishi: string;
  canWebBuy: string;
  yp_info: string;
  start_train_date: string;
  train_seat_feature: string;
  location_code: string;
  from_station_no: string;
  to_station_no: string;
  is_support_card: string;
  controlled_train_flag: string;
  gg_num: string;
  gr_num: string;
  qt_num: string;
  rw_num: string;
  rz_num: string;
  tz_num: string;
  wz_num: string;
  yb_num: string;
  yw_num: string;
  yz_num: string;
  ze_num: string;
  zy_num: string;
  swz_num: string;
  srrb_num: string;
  yp_ex: string;
  seat_types: string;
  exchange_train_flag: string;
  from_station_name: string;
  to_station_name: string;
}
