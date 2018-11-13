import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { readFileSync } from 'fs';
import { ConfigFile } from './interface/ConfigFile.interface';

export class EmailSender {
  static config: ConfigFile;
  private static transporter: Mail;

  constructor() {
  }

  static send() {
    this.transporter.sendMail({
      from: this.config.email.name,
      to: this.config.email.receiver,
      subject: 'Test email',
      text: 'text',
      html: '<span style="color: red">red text</span>'
    }).then(data => {
      console.log('success');
    }).catch(error => {
      console.log(error);
    });
  }

  static verify() {
    this.transporter.verify()
      .then(data => {
        console.log('success');
        console.log(data);
      }).catch(error => {
      console.log(error);
    });
  }

  static reloadConfigFile(): ConfigFile {
    this.config = JSON.parse(readFileSync(`../config.json`, 'utf8'))
    const configObj = this.config;

    this.transporter = createTransport({
      host: configObj.email.host,
      secure: true,
      auth: {
        user: configObj.email.name,
        pass: configObj.email.password
      }
    });

    return configObj
  }
}

EmailSender.reloadConfigFile();
