import { Routes, RouterModule } from '@angular/router';

import { ExamplesComponent } from './examples.component';

const routes: Routes = [
    {
        path: '', component: ExamplesComponent, children: [
            { path: 'animationexamples', loadChildren: './animations/animations.module#AnimationsModule' },
            { path: 'reactiveforms', loadChildren: './reactive-forms/product.module#ReactiveFormsExampleModules' },
            { path: 'components', loadChildren: './component/component-home.module#ComponentModule' },
            { path: 'directives', loadChildren: './directives/directives.module#DirectivesModule' },
            { path: 'uibootstrap', loadChildren: './uibootstrap/uibootstrap.module#UiBootstrapModule' },
            { path: 'weather', loadChildren: './weather-search/weather.module#WeatherModule' },
            { path: 'jquery', loadChildren: './jquery/jquery.module#JqueryModule' },
            { path: 'googlemaps', loadChildren: './google-maps/google-maps.module#GoogleMapsModule' },
            { path: 'texteditor', loadChildren: './text-editor/text-editor.module#TextEditorModule' },
            { path: 'markdowneditor', loadChildren: './markdown-editor/markdown-editor.module#MarkdownEditorModule' },
            { path: 'stripepayment', loadChildren: './stripe-payment/stripe-payment.module#StripePaymentModule'  }
        ]
    },
];

export const routing = RouterModule.forChild(routes);
