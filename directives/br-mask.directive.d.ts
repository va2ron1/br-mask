import { ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class BrMaskModel {
    form?: AbstractControl;
    mask?: string;
    len?: number;
    person?: boolean;
    phone?: boolean;
    phoneNotDDD?: boolean;
    money?: boolean;
    percent?: boolean;
    type?: 'alfa' | 'num' | 'all';
    decimal?: number;
    decimalCaracter?: string;
    thousand?: string;
    userCaracters?: boolean;
    numberAndTousand?: boolean;
    moneyInitHasInt?: boolean;
}
export declare class BrMaskDirective implements OnInit {
    private controlContainer;
    private elementRef;
    brmasker: any;
    formControlName: string;
    /**
    * Event key up in directive
    * @constant {string} value
    */
    inputKeyup(event: any): void;
    onNgModelChange(e: any): void;
    constructor(controlContainer: FormGroupDirective, elementRef: ElementRef);
    ngOnInit(): void;
    initialValue(): void;
    /**
    * The verification of form
    * @example <caption>this.verifyFormControl()</caption>
    * @returns {boolean} return a boolean value
    */
    verifyFormControl(): boolean;
    /**
    * Set Value em FormControl
    * @example <caption>this.setValueInFormControl(string)</caption>
    */
    setValueInFormControl(value: string, emitViewToModelChange?: boolean): void;
    /**
    * For initial value
    * @example <caption>this.setValueInFormControl(string, model)</caption>
    * @param {string} value
    * @param {BrMaskModel} config
    * @returns {string} mask intial value
    */
    writeCreateValue(value: string, config?: BrMaskModel): string;
    /**
    * For initial value percent
    * @example <caption>this.writeValuePercent(string)</caption>
    * @param {string} value
    * @returns {string} mask intial value
    */
    writeValuePercent(value: string): string;
    /**
    * For initial value person
    * @example <caption>this.writeValuePerson(string)</caption>
    * @param {string} value
    * @returns {string} mask intial value
    */
    writeValuePerson(value: string): string;
    /**
    * For initial value money
    * @example <caption>this.writeValueMoney(string, model)</caption>
    * @param {string} value
    * @param {BrMaskModel} value
    * @returns {string} mask intial value
    */
    writeValueMoney(value: string, config?: BrMaskModel): string;
    /**
    * Here is one of the main functions
    * responsible for identifying the type of mask
    * @example <caption>this.returnValue(string)</caption>
    * @param {string} value
    * @returns {string} mask value
    */
    returnValue(value: string): string;
    applyCpfMask(formValue: string): string;
    applyCnpjMask(formValue: string): string;
    /**
    * Here we have a mask for percentage
    * @example <caption>this.percentMask(string)</caption>
    * @param {string} value
    * @returns {string} string percentage
    */
    private percentMask;
    /**
    * Here we have a mask for phone in 8 digits or 9 digits
    * @example <caption>this.phoneMask(string)</caption>
    * @param {string} value
    * @returns {string} string phone
    */
    private phoneMask;
    /**
    * Here we have a mask for phone in 8 digits or 9 digits not ddd
    * @example <caption>this.phoneMask(string)</caption>
    * @param {string} value
    * @returns {string} string phone
    */
    private phoneNotDDDMask;
    /**
    * Here we have a mask for peapoll ID
    * @example <caption>this.peapollMask(string)</caption>
    * @param {string} value
    * @returns {string} string ID
    */
    private peapollMask;
    /**
    * Here we have a mask for money mask
    * @example <caption>this.moneyMask(string)</caption>
    * @param {string} value
    * @param {BrMaskModel} config
    * @returns {string} string money
    */
    private moneyMask;
    /**
    * Responsible for returning the empty mask
    * @example <caption>this.onInput(string)</caption>
    * @param {string} value
    * @returns {string} value
    */
    private onInput;
    /**
    * Responsible for special characters
    * @example <caption>this.usingSpecialCharacters(string)</caption>
    * @param {string} field
    * @param {string} mask
    * @param {number} size
    * @returns {string} value
    */
    private usingSpecialCharacters;
    /**
    * Responsible formating number
    * @example <caption>this.thousand(string)</caption>
    * @param {string} value
    */
    private thousand;
    /**
    * Responsible for removing special characters
    * @example <caption>this.formatField(string)</caption>
    * @param {string} field
    * @param {string} mask
    * @param {number} size
    * @returns {string} value
    */
    private formatField;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrMaskDirective, [{ optional: true; host: true; skipSelf: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BrMaskDirective, "[brmasker]", never, { "brmasker": { "alias": "brmasker"; "required": false; }; "formControlName": { "alias": "formControlName"; "required": false; }; }, {}, never, never, false, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BrMaskDirective>;
}
