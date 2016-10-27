import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from "./store.service";
import { DataActions } from "./actions/data.actions";


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    StoreService,
    DataActions,
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`Core has already been loaded. Import Core modules in the AppModule only.`);
    }
  }

}