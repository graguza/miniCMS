import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UrlBuilderService {
  private cleanOptionalsRegEx = /[\/&]?\{:\s*([^}\s]+)\s*\}/g;
  private replaceAmperstand = /&+/g;
  private cleanAmperstand = /^&|&$/g;
  private requiredParametersRegEx = /\{([^:]\s*[^}\s]+)\s*\}/g;
  private optionalParametersRegEx = /\{:\s*([^}\s]+)\s*\}/g;

  public format(template: string, params: any): string {
    if (!template) {
      throw new Error('UrlService: template is required');
    }
    const urlValueProvider = (obj: any, property: string) => obj[property];

    if (template.indexOf('?') === -1) {
      return this.formatUrl(template, params, urlValueProvider);
    }

    const [urlTemplate, queryStringTemplate] = template.split('?');
    const url = this.formatUrl(urlTemplate, params, urlValueProvider);
    let queryString = this.formatUrl(
      queryStringTemplate,
      params,
      (obj: any, property: string) => this.queryStringProvider(obj, property)
    );

    return queryString.length > 0 ? `${url}?${queryString}` : url;
  }

  private formatUrl(
    template: string,
    params: any,
    valueProvider: (obj: any, property: string) => string
  ): string {
    let url = this.replace(
      this.requiredParametersRegEx,
      template,
      params,
      valueProvider
    );
    url = this.replace(
      this.optionalParametersRegEx,
      url,
      params,
      valueProvider
    );
    url = url.replace(this.cleanOptionalsRegEx, '');
    url = url.replace(this.replaceAmperstand, '&');
    url = url.replace(this.cleanAmperstand, '');

    if (this.requiredParametersRegEx.test(url)) {
      const matches = url.match(this.requiredParametersRegEx);
      throw new Error(
        `UrlService: not all required parameters are matched.Following did not matched: ${matches.join(
          ', '
        )}`
      );
    }

    return url;
  }

  private replace(
    regex: RegExp,
    template: string,
    params: any,
    valueProvider: (obj: any, property: string) => string
  ): string {
    if (!params) {
      return template;
    }

    const result = template.replace(regex, (match, group1, offset, s) => {
      if (params.hasOwnProperty(group1)) {
        return valueProvider(params, group1);
      }

      return match;
    });

    return result;
  }

  private queryStringProvider(obj: any, property: string) {
    if (obj[property] == null) {
      return '';
    }

    if (!Array.isArray(obj[property])) {
      return `${property}=${obj[property]}`;
    }

    if (obj[property].length === 0) {
      return '';
    }

    const reducer = (accumulator, currentValue, i, arr) => {
      if (!currentValue) {
        return accumulator;
      }

      const val = `${accumulator}${encodeURIComponent(currentValue)}`;
      return arr.length - 1 > i ? `${val},` : val;
    };

    const s = obj[property].reduce(reducer, '');
    return `${property}=${s}`;
  }
}
