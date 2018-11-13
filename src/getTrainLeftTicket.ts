import { get } from 'https';
import * as http from 'http';
import { extractTrainInfo } from './utils/extractTrainInfo';
import { EmailSender } from './email-sender';
import { TrainTicketInterface } from './interface/TrainModelInterface';

interface LeftTicketList extends Array<string> {
  code?: string;
  hasTicket?: boolean;
}

let lastTicketList: string[][] = [];

export const getTrainLeftTicket = () => {
  // todo use rxjs to sync the config object
  const trainConfig = EmailSender.config.train;

  const req = get('https://kyfw.12306.cn/otn/leftTicket/query', {
    host: 'kyfw.12306.cn',
    path: `/otn/leftTicket/query?leftTicketDTO.train_date=${trainConfig.date}&leftTicketDTO.from_station=${trainConfig.from}&leftTicketDTO.to_station=${trainConfig.to}&purpose_codes=ADULT`,
  }, (res: http.IncomingMessage) => {
    if (res.statusCode !== 200) {
      console.log(`Train HTTP get status code: ${res.statusCode}`);
      setTimer(1e3);
      return;
    }

    let dataBuffer: Uint8Array = Buffer.from([]);

    res.on('data', data => {
      dataBuffer = Buffer.concat([dataBuffer, data]);
    });

    res.on('error', error => {
      console.log(error);
    });

    res.on('end', () => {
      const data = JSON.parse(Buffer.from(dataBuffer).toString());
      let trainList: TrainTicketInterface[] = extractTrainInfo(data.data.result, data.data.map).map(t => t.queryLeftNewDTO);

      if (trainConfig.code) {
        trainList = [trainList.find(t => t.station_train_code === trainConfig.code)];
      }

      newLeftTicketFactory(trainList, trainConfig);
      setTimer();
    });

  });

  req.end();
};

/**
 * Timer function
 * @param {number} duration
 */
const setTimer = (duration: number = 3e3) => {
  setTimeout(getTrainLeftTicket, duration);
};

/**
 * Make list then check
 * @param {any[]} trainList
 * @param {} trainConfig
 */
const newLeftTicketFactory = (trainList: TrainTicketInterface[], trainConfig: { seatLevel: string[] }) => {
  let hasTicket: boolean = false;
  const leftTicketList: LeftTicketList[] = trainList.map(train => {
    const oneList: LeftTicketList = [];
    oneList.code = train.station_train_code;
    for (const key of trainConfig.seatLevel) {
      oneList.push(train[key]);
      if (train[key] !== '\u65e0') {
        hasTicket = oneList.hasTicket = true;
      }
    }
    return oneList;
  });
  checkAndSend({ newTicketList: leftTicketList, hasTicket });
};

/**
 * Check if need to send email
 * @param {string[][]} newTicketList
 * @param {boolean} hasTicket
 */
const checkAndSend = ({ newTicketList, hasTicket }: { newTicketList: string[][], hasTicket: boolean }) => {
  if (lastTicketList.length && hasTicket) {
    if (!isArrayEqual(lastTicketList, newTicketList)) {
      EmailSender.send();
    }
  }
  lastTicketList = newTicketList;
  console.log(formatTicketOutput(newTicketList));
};

/**
 * Is arrays are equal, dose not support object
 * @param {any[]} a
 * @param {any[]} b
 * @returns {boolean}
 */
const isArrayEqual = (a: any[], b: any[]): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0, iLength = a.length; i < iLength; ++i) {
    if (Object.prototype.toString.call(a[i]) === '[object Array]') {
      if (!isArrayEqual(a[i], b[i])) {
        return false;
      }
    } else {
      if (a[i] !== b[i]) return false;
    }
  }
  return true;
};

const formatTicketOutput =
  (list: LeftTicketList[]): string =>
    list.map(o => `${o.code}: ${o.join(', ')}`)
      .join('\n');

