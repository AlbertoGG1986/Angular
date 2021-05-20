import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TabsComponent } from './tabs/tabs.component';
import { RandomComponent } from './random/random.component';
import { FindComponent } from './find/find.component';
import { FormsModule } from '@angular/forms';
import { FindsbComponent } from './findsb/findsb.component';
import { ListComponent } from './list/list.component';
import { MatSelectModule } from '@angular/material/select';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TabsComponent,
    RandomComponent,
    FindComponent,
    FindsbComponent,
    ListComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
