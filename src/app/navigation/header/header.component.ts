import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscribtion: Subscription;
  @Output() sideNavToggle = new EventEmitter<void>();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscribtion = this.authService.authChange.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }

  ngOnDestroy(): void {
    this.authSubscribtion.unsubscribe();
  }
}
