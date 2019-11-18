import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";

import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import { SQLite } from "@ionic-native/sqlite";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { LoginPage } from "../pages/login/login";
import { LeaveRequestPage } from "../pages/leave-request/leave-request";
import { InboxDetailPage } from "../pages/inbox-detail/inbox-detail";
import { PayrollListPage } from "../pages/payroll-list/payroll-list";
import { PayrollDetailPage } from "../pages/payroll-detail/payroll-detail";
import { DocumentRequestPage } from "../pages/document-request/document-request";
import { DocumentListPage } from "../pages/document-list/document-list";
import { DocumentInboxDetailPage } from "../pages/document-inbox-detail/document-inbox-detail";
import { NotificationPage } from "../pages/notification/notification";
import { RefundPage } from "../pages/refund/refund";
import { InboxTypePage } from "../pages/inbox-type/inbox-type";
import { LandingPage } from "../pages/landing/landing";
import { NotificationDetailPage } from "../pages/notification-detail/notification-detail";
import { TruncatePipe } from "../components/truncate";
import { SettingPage } from "../pages/setting/setting";
import { ManagerLeaveApprovalListPage } from "../pages/manager-leave-approval-list/manager-leave-approval-list";
import { ManagerLeaveApprovalPage } from "../pages/manager-leave-approval/manager-leave-approval";
import { PersonalDetailPage } from "../pages/personal-detail/personal-detail";
import { ManagerRefundApprovalPage } from "../pages/manager-refund-approval/manager-refund-approval";
import { ApproveTypePage } from "../pages/approve-type/approve-type";
import { ManagerRefundApprovalListPage } from "../pages/manager-refund-approval-list/manager-refund-approval-list";
import { CancelLeavePage } from "../pages/cancel-leave/cancel-leave";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginServiceProvider } from "../providers/login-service/login-service";
import { ProfileServiceProvider } from "../providers/profile-service/profile-service";
import { LeaveServiceProvider } from "../providers/leave-service/leave-service";
import { InboxServiceProvider } from "../providers/inbox-service/inbox-service";
import { PayrollServiceProvider } from "../providers/payroll-service/payroll-service";
import { UserServiceProvider } from "../providers/user-service/user-service";

import { MessageComponent } from "../components/message/message";
import { AccordionComponent } from "../components/accordion/accordion";
import { LandingMenuComponent } from "../components/landing-menu/landing-menu";

import { DocumentServiceProvider } from "../providers/document-service/document-service";
import { RefundServiceProvider } from "../providers/refund-service/refund-service";
import { PagesServiceProvider } from "../providers/pages-service/pages-service";
import { NotificationServiceProvider } from "../providers/notification-service/notification-service";
import { BuzzerServiceProvider } from "../providers/buzzer-service/buzzer-service";
import { FileHelperServiceProvider } from "../providers/file-helper-service/file-helper-service";
import { AppGlobals } from "../providers/config";
import { ManagerApprovalServiceProvider } from "../providers/manager-approval-service/manager-approval-service";
import { SettingServiceProvider } from "../providers/setting-service/setting-service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    LeaveRequestPage,
    InboxDetailPage,
    PayrollListPage,
    PayrollDetailPage,
    MessageComponent,
    DocumentRequestPage,
    DocumentListPage,
    DocumentInboxDetailPage,
    NotificationPage,
    RefundPage,
    InboxTypePage,
    LandingPage,
    NotificationDetailPage,
    TruncatePipe,
    SettingPage,
    ManagerLeaveApprovalListPage,
    ManagerLeaveApprovalPage,
    PersonalDetailPage,
    AccordionComponent,
    ManagerRefundApprovalPage,
    ApproveTypePage,
    ManagerRefundApprovalListPage,
    CancelLeavePage,
    LandingMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    LeaveRequestPage,
    InboxDetailPage,
    PayrollListPage,
    PayrollDetailPage,
    DocumentRequestPage,
    DocumentListPage,
    DocumentInboxDetailPage,
    NotificationPage,
    RefundPage,
    InboxTypePage,
    LandingPage,
    NotificationDetailPage,
    SettingPage,
    ManagerLeaveApprovalListPage,
    ManagerLeaveApprovalPage,
    PersonalDetailPage,
    ManagerRefundApprovalPage,
    ApproveTypePage,
    ManagerRefundApprovalListPage,
    CancelLeavePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginServiceProvider,
    ProfileServiceProvider,
    LeaveServiceProvider,
    InboxServiceProvider,
    PayrollServiceProvider,
    UserServiceProvider,
    MessageComponent,
    DocumentServiceProvider,
    RefundServiceProvider,
    PagesServiceProvider,
    NotificationServiceProvider,
    BuzzerServiceProvider,
    File,
    Transfer,
    Camera,
    FilePath,
    FileHelperServiceProvider,
    AppGlobals,
    SQLite,
    ManagerApprovalServiceProvider,
    SettingServiceProvider
  ]
})
export class AppModule {}
