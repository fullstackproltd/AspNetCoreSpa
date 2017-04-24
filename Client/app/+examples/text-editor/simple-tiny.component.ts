import { Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';

import { UtilityService } from '../../core/services/utility.service';

declare const tinymce: any;

@Component({
    selector: 'appc-simple-tiny',
    template: `<textarea id="{{elementId}}"></textarea>`
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
    // Things worth noting are
    // 1 - All plugins that you want to use has to be added to your angular-cli.json configuration file.
    // 2 - TinyMCE needs a unique id to be able to show more than one editor at a time, so we send in an id string through
    // an input from the parent component.
    // 3 - To clean up and remove the editor when the SimpleTinyComponent is destroyed we first save a reference to the editor
    // in the setup method when we initialize the editor and then, in the ngOnDestroy lifecycle hook, we run the tinymce.remove()
    // function passing in this reference.
    @Input()
    public elementId: String;
    @Output()
    public onEditorKeyup = new EventEmitter<any>();
    public editor: any;
    constructor(private us: UtilityService) { }
    public ngAfterViewInit() {
        this.us.loadScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.5/tinymce.min.js')
            .subscribe(tm => {
                this.us.loadScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.5/themes/modern/theme.min.js')
                    .subscribe(mt => {
                        this.us.loadScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.5/plugins/link/plugin.min.js')
                            .subscribe(lp => {
                                this.us.loadScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.5/plugins/paste/plugin.min.js')
                                    .subscribe(pp => {
                                        this.us.loadScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.5/plugins/noneditable/plugin.min.js')
                                            .subscribe(nep => {
                                                tinymce.init({
                                                    selector: '#' + this.elementId,
                                                    plugins: ['link', 'paste', 'table'],
                                                    skin_url: '/assets/skins/lightgray',
                                                    setup: (editor: any) => {
                                                        this.editor = editor;
                                                        editor.on('keyup', () => {
                                                            const content = editor.getContent();
                                                            this.onEditorKeyup.emit(content);
                                                        });
                                                    },
                                                });
                                            });
                                    });
                            });
                    });

            });
    }

    public ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}
