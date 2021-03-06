import { TrainModelInterface } from '../interface/TrainModelInterface';

export const extractTrainInfo = (ct, cv): TrainModelInterface[] => {
  let cs = [];
  for (let cr = 0; cr < ct.length; cr++) {
    let cw: any = [];
    let cq = ct[cr].split('|');
    cw.secretHBStr = cq[36];
    cw.secretStr = cq[0];
    cw.buttonTextInfo = cq[1];
    let cu: any = [];
    cu.train_no = cq[2];
    cu.station_train_code = cq[3];
    cu.start_station_telecode = cq[4];
    cu.end_station_telecode = cq[5];
    cu.from_station_telecode = cq[6];
    cu.to_station_telecode = cq[7];
    cu.start_time = cq[8];
    cu.arrive_time = cq[9];
    cu.lishi = cq[10];
    cu.canWebBuy = cq[11];
    cu.yp_info = cq[12];
    cu.start_train_date = cq[13];
    cu.train_seat_feature = cq[14];
    cu.location_code = cq[15];
    cu.from_station_no = cq[16];
    cu.to_station_no = cq[17];
    cu.is_support_card = cq[18];
    cu.controlled_train_flag = cq[19];
    cu.gg_num = cq[20] ? cq[20] : '\u65e0';
    cu.gr_num = cq[21] ? cq[21] : '\u65e0';
    cu.qt_num = cq[22] ? cq[22] : '\u65e0';
    cu.rw_num = cq[23] ? cq[23] : '\u65e0';
    cu.rz_num = cq[24] ? cq[24] : '\u65e0';
    cu.tz_num = cq[25] ? cq[25] : '\u65e0';
    cu.wz_num = cq[26] ? cq[26] : '\u65e0';
    cu.yb_num = cq[27] ? cq[27] : '\u65e0';
    cu.yw_num = cq[28] ? cq[28] : '\u65e0';
    cu.yz_num = cq[29] ? cq[29] : '\u65e0';
    cu.ze_num = cq[30] ? cq[30] : '\u65e0';
    cu.zy_num = cq[31] ? cq[31] : '\u65e0';
    cu.swz_num = cq[32] ? cq[32] : '\u65e0';
    cu.srrb_num = cq[33] ? cq[33] : '\u65e0';
    cu.yp_ex = cq[34];
    cu.seat_types = cq[35];
    cu.exchange_train_flag = cq[36];
    cu.from_station_name = cv[cq[6]];
    cu.to_station_name = cv[cq[7]];
    cw.queryLeftNewDTO = cu;
    cs.push(cw);
  }
  return cs;
};
