import { NgModule } from '@angular/core';
import { MessageComponent } from './message/message';
import { AccordionComponent } from './accordion/accordion';
import { LandingMenuComponent } from './landing-menu/landing-menu';
@NgModule({
	declarations: [MessageComponent,
    AccordionComponent,
    LandingMenuComponent],
	imports: [],
	exports: [MessageComponent,
    AccordionComponent,
    LandingMenuComponent]
})
export class ComponentsModule {}
