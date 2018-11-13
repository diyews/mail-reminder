interface Email {
  host: string;
  name: string;
  password: string;
  receiver: string;
}

interface Train {
  from: string;
  to: string;
  date: string;
  seatLevel: string[];
  code: string;
}

export interface ConfigFile {
  transporterName: string;
  email: Email;
  train: Train;
}
