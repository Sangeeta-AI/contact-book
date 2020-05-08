import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  api_Url = "https://reqres.in/api/users?page=1";
  contacts = [];
  contactSelected: string;

  constructor(private _http:HttpClient) { 
    this._http.get(this.api_Url).toPromise().then(res => {
      //console.log(res.data);
      for (let key in res.data)
        if (res.data.hasOwnProperty(key))
          this.contacts.push(res.data[key]);
          console.log(this.contacts);
    });
  }

  ngOnInit() {}

  search() {
    this.contacts = this.contacts.filter(res => {
      const fullName = res.first_name + " " + res.last_name;
      if (fullName.toLocaleLowerCase().match(this.contactSelected.toLocaleLowerCase())) {
        return fullName.toLocaleLowerCase().match(this.contactSelected.toLocaleLowerCase());  
      }else if(res.email.toLocaleLowerCase().match(this.contactSelected.toLocaleLowerCase())) {
        return res.email.toLocaleLowerCase().match(this.contactSelected.toLocaleLowerCase());  
      }
    });
  }
}
