import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoryAddMoney, Message } from './model/app-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'road100m';
  totalMoney!: number;
  addMoney!: number;
  listHistory!: HistoryAddMoney[];
  isVisible = false;
  addMessage = '';
  listMessage!: Message[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Get al infor about money
    this.getInfor();
  }

  getInfor() {
    // Get total money
    this.http
      .get('https://demo-thao.herokuapp.com/api/getMoney')
      .subscribe((data) => {
        console.log(data, 'Total Money');
        this.totalMoney = Number(data);
      });

    // Get list history
    this.http
      .get('https://demo-thao.herokuapp.com/api/getAll')
      .subscribe((data) => {
        console.log(data);
        this.listHistory = (data as HistoryAddMoney[]).reverse();
      });

    // Get All Messages
    this.http
      .get('https://demo-thao.herokuapp.com/api/getAllMessage')
      .subscribe((data) => {
        this.listMessage = data as Message[];
        console.log(this.listMessage);
      });
  }

  addLove() {
    if (!this.addMoney) {
      console.log('error First');

      return;
    }
    this.http
      .post('https://demo-thao.herokuapp.com/api/post', {
        money: this.addMoney.toString().replace('.', ''),
        time: new Date().toLocaleString(),
      })
      .subscribe(
        () => {
          this.getInfor();
          console.log('ok');
        },
        () => {
          console.log('error');
        }
      );
  }

  sendMessage() {
    if (!this.addMessage) {
      console.log('error First');

      return;
    }
    this.http
      .post('https://demo-thao.herokuapp.com/api/postMessage', {
        message: this.addMessage.toString().replace('.', ''),
        time: new Date().toLocaleString(),
      })
      .subscribe(
        () => {
          this.getInfor();
          this.addMessage = '';
          console.log('ok');
        },
        () => {
          console.log('error');
        }
      );
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
