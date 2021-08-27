import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TinyColor } from '@ctrl/tinycolor';

export interface Color {
  name: string;
  hexCode: string;
  darkContrast: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'css-theme-app';
  checked = true;

  primaryColor = '#3f51b5';

  primaryColorPalette: Color[] = [];

  secondaryColor = '#c2185b';

  secondaryColorPalette: Color[] = [];
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'Input',
      type: 'input',
      templateOptions: {
        label: 'Input',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
      },
    },
    {
      key: 'Radio',
      type: 'radio',
      templateOptions: {
        label: 'Radio',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
        options: [
          { value: 1, label: 'Opt 1', checked: true },
          { value: 2, label: 'Opt 2' },
          { value: 3, label: 'Opt 3' },
          { value: 4, label: 'Opt 4', disabled: true },
        ],
      },
    },
    {
      key: 'fontSize',
      type: 'select',
      defaultValue: 14,
      templateOptions: {
        label: 'Font Size',
        placeholder: 'Font Size',
        description: 'Select Font Size',
        required: true,
        options: [
          { value: 8, label: '8px' },
          { value: 10, label: '10px' },
          { value: 12, label: '12px' },
          { value: 14, label: '14px' },
          { value: 16, label: '16px' },
          { value: 18, label: '18px' },
          { value: 24, label: '24px' },
          { value: 30, label: '30px' },
          { value: 36, label: '36px' },
          { value: 48, label: '48px' },
        ],
      },
    },
    {
      key: 'fontFamily',
      type: 'select',
      defaultValue: 'Verdana',
      templateOptions: {
        label: 'Font Family',
        placeholder: 'Font Family',
        description: 'Select Font Family',
        required: true,
        options: [
          { value: 'Arial', label: 'Arial (sans-serif)' },
          {
            value: 'Arial Black',
            label: 'Arial Black (sans-serif)',
          },
          { value: 'Verdana', label: 'Verdana (sans-serif)' },
          { value: 'Tahoma (sans-serif)', label: 'Tahoma (sans-serif)' },
          {
            value: 'Trebuchet MS',
            label: 'Trebuchet MS (sans-serif)',
          },
          { value: 'Impact', label: 'Impact (sans-serif)' },
          {
            value: 'Times New Roman',
            label: 'Times New Roman (serif)',
          },
          { value: 'Didot', label: 'Didot (serif)' },
          { value: 'Georgia', label: 'Georgia (serif)' },

          { value: 'Courier', label: 'Courier (monospace)' },
          {
            value: 'Lucida Console',
            label: 'Lucida Console (monospace)',
          },
          { value: 'Monaco', label: 'Monaco (monospace)' },
          { value: 'Luminari', label: 'Luminari (fantasy)' },
          {
            value: 'Comic Sans MS',
            label: 'Comic Sans MS (cursive)',
          },
        ],
      },
    },
  ];
  constructor() {
    this.savePrimaryColor();
    this.saveSecondaryColor();
  }

  onSubmit() {
    console.log(this.model);
  }

  updateFontFamilyAndSize() {
    document.documentElement.style.setProperty(
      '--theme-font-family',
      this.model.fontFamily
    );
    document.documentElement.style.setProperty(
      '--theme-font-size',
      this.model.fontSize + 'px'
    );
  }
  savePrimaryColor() {
    this.primaryColorPalette = computeColors(this.primaryColor);

    for (const color of this.primaryColorPalette) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hexCode;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  saveSecondaryColor() {
    this.secondaryColorPalette = computeColors(this.secondaryColor);

    for (const color of this.secondaryColorPalette) {
      const key1 = `--theme-secondary-${color.name}`;
      const value1 = color.hexCode;
      const key2 = `--theme-secondary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }
}

function computeColors(hex: string): Color[] {
  return [
    getColorObject(new TinyColor(hex).lighten(52), '50'),
    getColorObject(new TinyColor(hex).lighten(37), '100'),
    getColorObject(new TinyColor(hex).lighten(26), '200'),
    getColorObject(new TinyColor(hex).lighten(12), '300'),
    getColorObject(new TinyColor(hex).lighten(6), '400'),
    getColorObject(new TinyColor(hex), '500'),
    getColorObject(new TinyColor(hex).darken(6), '600'),
    getColorObject(new TinyColor(hex).darken(12), '700'),
    getColorObject(new TinyColor(hex).darken(18), '800'),
    getColorObject(new TinyColor(hex).darken(24), '900'),
    getColorObject(new TinyColor(hex).lighten(50).saturate(30), 'A100'),
    getColorObject(new TinyColor(hex).lighten(30).saturate(30), 'A200'),
    getColorObject(new TinyColor(hex).lighten(10).saturate(15), 'A400'),
    getColorObject(new TinyColor(hex).lighten(5).saturate(5), 'A700'),
  ];
}

function getColorObject(value, name): Color {
  const c = new TinyColor(value);
  return {
    name: name,
    hexCode: c.toHexString(),
    darkContrast: c.isLight(),
  };
}
