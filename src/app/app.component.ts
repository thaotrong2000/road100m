import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoryAddMoney } from './model/app-model';

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
}
