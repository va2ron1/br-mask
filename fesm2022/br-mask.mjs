import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Injectable, Optional, Host, SkipSelf, Input, HostListener, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as i1 from '@angular/forms';
import { FormControl } from '@angular/forms';

class BrMaskModel {
    form;
    mask;
    len;
    person;
    phone;
    phoneNotDDD;
    money;
    percent;
    type = 'alfa';
    decimal = 2;
    decimalCaracter = `,`;
    thousand;
    userCaracters = false;
    numberAndTousand = false;
    moneyInitHasInt = true;
}
class BrMaskDirective {
    controlContainer;
    elementRef;
    /* TODO */
    brmasker = new BrMaskModel();
    formControlName;
    /**
    * Event key up in directive
    * @constant {string} value
    */
    inputKeyup(event) {
        const value = this.returnValue(event.target.value);
        this.setValueInFormControl(value);
    }
    onNgModelChange(e) {
        const value = this.returnValue(e);
        if (value) {
            this.setValueInFormControl(value, false);
        }
    }
    constructor(controlContainer, elementRef) {
        this.controlContainer = controlContainer;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (!this.brmasker.type) {
            this.brmasker.type = 'all';
        }
        if (!this.brmasker.decimal) {
            this.brmasker.decimal = 2;
        }
        if (this.brmasker.moneyInitHasInt === undefined) {
            this.brmasker.moneyInitHasInt = true;
        }
        if (!this.brmasker.decimalCaracter) {
            this.brmasker.decimalCaracter = ',';
        }
        if (this.controlContainer) {
            if (this.formControlName) {
                this.brmasker.form = this.controlContainer.control.get(this.formControlName);
            }
            else {
                console.warn('Missing FormControlName directive from host element of the component');
            }
        }
        else {
            console.warn('Can\'t find parent FormGroup directive');
        }
        this.initialValue();
    }
    initialValue() {
        const value = this.returnValue(this.elementRef.nativeElement.value);
        this.setValueInFormControl(value);
    }
    /**
    * The verification of form
    * @example <caption>this.verifyFormControl()</caption>
    * @returns {boolean} return a boolean value
    */
    verifyFormControl() {
        if (this.brmasker.form instanceof FormControl) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
    * Set Value em FormControl
    * @example <caption>this.setValueInFormControl(string)</caption>
    */
    setValueInFormControl(value, emitViewToModelChange) {
        if (!this.verifyFormControl()) {
            this.elementRef.nativeElement.value = value;
            return;
        }
        this.brmasker.form.setValue(value, { emitViewToModelChange });
        this.brmasker.form.updateValueAndValidity();
    }
    /**
    * For initial value
    * @example <caption>this.setValueInFormControl(string, model)</caption>
    * @param {string} value
    * @param {BrMaskModel} config
    * @returns {string} mask intial value
    */
    writeCreateValue(value, config = new BrMaskModel()) {
        if (value && config.phone) {
            return value.replace(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/gi, '$1 ($2) $3-$4');
        }
        if (value && config.phoneNotDDD) {
            return this.phoneNotDDDMask(value);
        }
        if (value && config.money) {
            return this.writeValueMoney(value, config);
        }
        if (value && config.person) {
            return this.writeValuePerson(value);
        }
        if (value && config.percent) {
            return this.writeValuePercent(value);
        }
        if (this.brmasker.userCaracters) {
            return this.usingSpecialCharacters(value, this.brmasker.mask, this.brmasker.len);
        }
        if (value && config.mask) {
            this.brmasker.mask = config.mask;
            if (config.len) {
                this.brmasker.len = config.len;
            }
            return this.onInput(value);
        }
        return value;
    }
    /**
    * For initial value percent
    * @example <caption>this.writeValuePercent(string)</caption>
    * @param {string} value
    * @returns {string} mask intial value
    */
    writeValuePercent(value) {
        value.replace(/\D/gi, '');
        value.replace(/%/gi, '');
        return value.replace(/([0-9]{0})$/gi, '%$1');
    }
    /**
    * For initial value person
    * @example <caption>this.writeValuePerson(string)</caption>
    * @param {string} value
    * @returns {string} mask intial value
    */
    writeValuePerson(value) {
        if (value.length <= 11) {
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/gi, '\$1.\$2.\$3\-\$4');
        }
        else {
            return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gi, '\$1.\$2.\$3\/\$4\-\$5');
        }
    }
    /**
    * For initial value money
    * @example <caption>this.writeValueMoney(string, model)</caption>
    * @param {string} value
    * @param {BrMaskModel} value
    * @returns {string} mask intial value
    */
    writeValueMoney(value, config = new BrMaskModel()) {
        return this.moneyMask(value, config);
    }
    /**
    * Here is one of the main functions
    * responsible for identifying the type of mask
    * @example <caption>this.returnValue(string)</caption>
    * @param {string} value
    * @returns {string} mask value
    */
    returnValue(value) {
        if (!this.brmasker.mask) {
            this.brmasker.mask = '';
        }
        if (value) {
            let formValue = value;
            if (this.brmasker.type === 'alfa') {
                formValue = formValue.replace(/\d/gi, '');
            }
            if (this.brmasker.type === 'num') {
                formValue = formValue.replace(/\D/gi, '');
            }
            if (this.brmasker.money) {
                return this.moneyMask(this.onInput(formValue), this.brmasker);
            }
            if (this.brmasker.phone) {
                return this.phoneMask(formValue);
            }
            if (this.brmasker.phoneNotDDD) {
                return this.phoneNotDDDMask(formValue);
            }
            if (this.brmasker.person) {
                return this.peapollMask(formValue);
            }
            if (this.brmasker.percent) {
                return this.percentMask(formValue);
            }
            if (this.brmasker.numberAndTousand) {
                return this.thousand(formValue);
            }
            if (this.brmasker.userCaracters) {
                return this.usingSpecialCharacters(formValue, this.brmasker.mask, this.brmasker.len);
            }
            return this.onInput(formValue);
        }
        else {
            return '';
        }
    }
    applyCpfMask(formValue) {
        formValue = formValue.replace(/\D/gi, '');
        formValue = formValue.replace(/(\d{3})(\d)/gi, '$1.$2');
        formValue = formValue.replace(/(\d{3})(\d)/gi, '$1.$2');
        formValue = formValue.replace(/(\d{3})(\d{1,2})$/gi, '$1-$2');
        return formValue;
    }
    applyCnpjMask(formValue) {
        formValue = formValue.replace(/\D/gi, '');
        formValue = formValue.replace(/(\d{2})(\d)/gi, '$1.$2');
        formValue = formValue.replace(/(\d{3})(\d)/gi, '$1.$2');
        formValue = formValue.replace(/(\d{3})(\d)/gi, '$1/$2');
        formValue = formValue.replace(/(\d{4})(\d{1,4})$/gi, '$1-$2');
        formValue = formValue.replace(/(\d{2})(\d{1,2})$/gi, '$1$2');
        return formValue;
    }
    /**
    * Here we have a mask for percentage
    * @example <caption>this.percentMask(string)</caption>
    * @param {string} value
    * @returns {string} string percentage
    */
    percentMask(value) {
        let tmp = value;
        tmp = tmp.replace(/\D/gi, '');
        tmp = tmp.replace(/%/gi, '');
        tmp = tmp.replace(/([0-9]{0})$/gi, '%$1');
        return tmp;
    }
    /**
    * Here we have a mask for phone in 8 digits or 9 digits
    * @example <caption>this.phoneMask(string)</caption>
    * @param {string} value
    * @returns {string} string phone
    */
    phoneMask(value) {
        let formValue = value;
        if (formValue.length > 14 || formValue.length === 11) {
            this.brmasker.len = 15;
            this.brmasker.mask = '(99) 99999-9999';
            formValue = formValue.replace(/\D/gi, '');
            formValue = formValue.replace(/(\d{2})(\d)/gi, '$1 $2');
            formValue = formValue.replace(/(\d{5})(\d)/gi, '$1-$2');
            formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
        }
        else {
            this.brmasker.len = 14;
            this.brmasker.mask = '(99) 9999-9999';
            formValue = formValue.replace(/\D/gi, '');
            formValue = formValue.replace(/(\d{2})(\d)/gi, '$1 $2');
            formValue = formValue.replace(/(\d{4})(\d)/gi, '$1-$2');
            formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
        }
        return this.onInput(formValue);
    }
    /**
    * Here we have a mask for phone in 8 digits or 9 digits not ddd
    * @example <caption>this.phoneMask(string)</caption>
    * @param {string} value
    * @returns {string} string phone
    */
    phoneNotDDDMask(value) {
        let formValue = value;
        if (formValue.length > 9) {
            this.brmasker.len = 10;
            this.brmasker.mask = '99999-9999';
            formValue = formValue.replace(/\D/gi, '');
            formValue = formValue.replace(/(\d{5})(\d)/gi, '$1-$2');
            formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
        }
        else {
            this.brmasker.len = 9;
            this.brmasker.mask = '9999-9999';
            formValue = formValue.replace(/\D/gi, '');
            formValue = formValue.replace(/(\d{4})(\d)/gi, '$1-$2');
            formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
        }
        return this.onInput(formValue);
    }
    /**
    * Here we have a mask for peapoll ID
    * @example <caption>this.peapollMask(string)</caption>
    * @param {string} value
    * @returns {string} string ID
    */
    peapollMask(value) {
        let formValue = value;
        if (formValue.length >= 14) {
            if (formValue.length === 14 && formValue.indexOf('-') > 0) {
                this.brmasker.len = 14;
                this.brmasker.mask = '999.999.999-99';
                formValue = this.applyCpfMask(formValue);
            }
            else {
                this.brmasker.len = 18;
                this.brmasker.mask = '99.999.999/9999-99';
                formValue = this.applyCnpjMask(formValue);
            }
        }
        else {
            this.brmasker.len = 14;
            this.brmasker.mask = '999.999.999-99';
            formValue = this.applyCpfMask(formValue);
        }
        return this.onInput(formValue);
    }
    /**
    * Here we have a mask for money mask
    * @example <caption>this.moneyMask(string)</caption>
    * @param {string} value
    * @param {BrMaskModel} config
    * @returns {string} string money
    */
    moneyMask(value, config) {
        const decimal = config.decimal || this.brmasker.decimal;
        value = value
            .replace(/\D/gi, '')
            .replace(new RegExp('([0-9]{' + decimal + '})$', 'g'), config.decimalCaracter + '$1');
        if (value.length === 1 && !this.brmasker.moneyInitHasInt) {
            const dec = Array(decimal - 1).fill(0);
            return `0${config.decimalCaracter}${dec.join('')}${value}`;
        }
        if (value.length === decimal + 1) {
            return '0' + value;
        }
        else if (value.length > decimal + 2 && value.charAt(0) === '0') {
            return value.substr(1);
        }
        if (config.thousand && value.length > (Number(4) + Number(config.decimal))) {
            const valueOne = `([0-9]{3})${config.decimalCaracter}([0-9]{${config.decimal}}$)`;
            value = value.replace(new RegExp(`${valueOne}`, `g`), `${config.thousand}$1${config.decimalCaracter}$2`);
        }
        if (config.thousand && value.length > (Number(8) + Number(config.decimal))) {
            const valueTwo = `([0-9]{3})${config.thousand}([0-9]{3})${config.decimalCaracter}([0-9]{${config.decimal}}$)`;
            value = value.replace(new RegExp(`${valueTwo}`, `g`), `${config.thousand}$1${config.thousand}$2${config.decimalCaracter}$3`);
        }
        return value;
    }
    /**
    * Responsible for returning the empty mask
    * @example <caption>this.onInput(string)</caption>
    * @param {string} value
    * @returns {string} value
    */
    onInput(value) {
        return this.formatField(value, this.brmasker.mask, this.brmasker.len);
    }
    /**
    * Responsible for special characters
    * @example <caption>this.usingSpecialCharacters(string)</caption>
    * @param {string} field
    * @param {string} mask
    * @param {number} size
    * @returns {string} value
    */
    usingSpecialCharacters(field, mask, size) {
        if (!size) {
            size = 99999999999;
        }
        let boleanoMascara;
        const exp = /\-|\.|\,| /gi;
        const campoSoNumeros = field.toString().replace(exp, '');
        let posicaoCampo = 0;
        let NovoValorCampo = '';
        let sizeMascara = campoSoNumeros.length;
        for (let i = 0; i < sizeMascara; i++) {
            if (i < size) {
                boleanoMascara = ((mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === ','));
                if (boleanoMascara) {
                    NovoValorCampo += mask.charAt(i);
                    sizeMascara++;
                }
                else {
                    NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                    posicaoCampo++;
                }
            }
        }
        return NovoValorCampo;
    }
    /**
    * Responsible formating number
    * @example <caption>this.thousand(string)</caption>
    * @param {string} value
    */
    thousand(value) {
        let val = value.replace(/\D/gi, '');
        const reverse = val.toString().split('').reverse().join('');
        const thousands = reverse.match(/\d{1,3}/g);
        if (thousands) {
            return thousands.join(`${this.brmasker.thousand || '.'}`).split('').reverse().join('');
        }
        else {
            return '';
        }
    }
    /**
    * Responsible for removing special characters
    * @example <caption>this.formatField(string)</caption>
    * @param {string} field
    * @param {string} mask
    * @param {number} size
    * @returns {string} value
    */
    formatField(field, mask, size) {
        if (!size) {
            size = 99999999999;
        }
        let boleanoMascara;
        const exp = /\_|\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%|\:| /gi;
        const campoSoNumeros = field.toString().replace(exp, '');
        let posicaoCampo = 0;
        let NovoValorCampo = '';
        let TamanhoMascara = campoSoNumeros.length;
        for (let i = 0; i < TamanhoMascara; i++) {
            if (i < size) {
                boleanoMascara = (mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === '/');
                boleanoMascara = boleanoMascara || mask.charAt(i) === '_';
                boleanoMascara = boleanoMascara || ((mask.charAt(i) === '(') || (mask.charAt(i) === ')') || (mask.charAt(i) === ' '));
                boleanoMascara = boleanoMascara || ((mask.charAt(i) === ',') || (mask.charAt(i) === '*') || (mask.charAt(i) === '+'));
                boleanoMascara = boleanoMascara || ((mask.charAt(i) === '@') || (mask.charAt(i) === '#') || (mask.charAt(i) === ':'));
                boleanoMascara = boleanoMascara || ((mask.charAt(i) === '$') || (mask.charAt(i) === '&') || (mask.charAt(i) === '%'));
                if (boleanoMascara) {
                    NovoValorCampo += mask.charAt(i);
                    TamanhoMascara++;
                }
                else {
                    NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                    posicaoCampo++;
                }
            }
        }
        return NovoValorCampo;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.6", ngImport: i0, type: BrMaskDirective, deps: [{ token: i1.FormGroupDirective, host: true, optional: true, skipSelf: true }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.6", type: BrMaskDirective, isStandalone: false, selector: "[brmasker]", inputs: { brmasker: "brmasker", formControlName: "formControlName" }, host: { listeners: { "keyup": "inputKeyup($event)", "ngModelChange": "onNgModelChange($event)" } }, ngImport: i0 });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.6", ngImport: i0, type: BrMaskDirective });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.6", ngImport: i0, type: BrMaskDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brmasker]',
                    standalone: false,
                }]
        }, {
            type: Injectable
        }], ctorParameters: () => [{ type: i1.FormGroupDirective, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }, {
                    type: SkipSelf
                }] }, { type: i0.ElementRef }], propDecorators: { brmasker: [{
                type: Input
            }], formControlName: [{
                type: Input
            }], inputKeyup: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }], onNgModelChange: [{
                type: HostListener,
                args: ['ngModelChange', ['$event']]
            }] } });

class BrMaskerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.6", ngImport: i0, type: BrMaskerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.6", ngImport: i0, type: BrMaskerModule, declarations: [BrMaskDirective], imports: [CommonModule], exports: [BrMaskDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.6", ngImport: i0, type: BrMaskerModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.6", ngImport: i0, type: BrMaskerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        BrMaskDirective
                    ],
                    exports: [
                        BrMaskDirective
                    ],
                    imports: [
                        CommonModule
                    ],
                    schemas: [
                        CUSTOM_ELEMENTS_SCHEMA
                    ],
                }]
        }] });

/*
 * Public API Surface of br-packs-mask
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BrMaskDirective, BrMaskModel, BrMaskerModule };
//# sourceMappingURL=br-mask.mjs.map
