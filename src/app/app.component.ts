import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [FormsModule, JsonPipe],
})
export class AppComponent {
  userName = 'google'
  followers: { avatar_url: string; html_url: string; id: number; login: string }[] = [];

  constructor(private http: HttpClient) {
    this.followers = []
  }
  getFollowers() {
    if (this.userName.trim().length == 0) {
      alert("Поле не должно быть пустым.")
      return;
    }
    this.http.get<any>("http://api.github.com/users/" + this.userName + "/followers").subscribe(data => {
      this.followers = [];
      this.followers = this.followers.concat(data)
    })
  }
}
