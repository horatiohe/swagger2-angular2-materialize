import {Component,ElementRef,Input,Output,EventEmitter} from 'angular2/core';
import {MaterializeSelect} from './materialize-select';
import {Control} from 'angular2/common';

/// <reference path="..\..\..\..\..\typings\main\ambient\jquery\index.d.ts" />

@Component({
    selector:'materialize-select-multiple',
    template:require('./materialize-select.html')
})
export class MultipleMaterializeSelect extends MaterializeSelect {
    @Input() name:string;
    @Input() label:string;
    @Input() model:any;
    @Input() options:[{label:string,value:string,selected:boolean,disabled:boolean}];
    @Output('on-change') selectValueChange: EventEmitter<any> =  new EventEmitter();
    constructor(el: ElementRef) {
        super(el,true);
    }
    ngAfterViewInit():void {
        super.ngAfterViewInit();
        this.refresh();
    }
    setValue():void {
        let ul = this.selectInput.prev();
        ul.children('li').toArray().forEach((li, i) => {
            $(li).removeClass('active');
        });
    }
    isSelected(option:any):boolean {
        if(option.selected) {
            return true;
        }
    }
    isDisabled(option:any):boolean {
        if(option.disabled) {
            return true;
        }
    }
    onChangeValue():void {
        let newValuesArr = [], ul = this.selectInput.prev();
        ul.children('li').toArray().forEach((li, i) => {
            if ($(li).hasClass('active')) {
                newValuesArr.push(this.selectInput.children('option').toArray()[i].value);
            }
        });
        if(newValuesArr.hasOwnProperty('selected')) {
            this.selectValueChange.emit(newValuesArr);
        }
        this.selectInput.val(newValuesArr);
    }
}
