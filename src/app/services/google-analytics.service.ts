import { Injectable } from '@angular/core';
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }
  trackEvent(eventName: string, parameters?: any) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'engagement',
        event_label: parameters?.label,
        value: parameters?.value,
        ...parameters
      });
    }
  }

  trackButtonClick(buttonName: string, additionalData?: any) {
    this.trackEvent('button_click', {
      button_name: buttonName,
      event_category: 'button',
      ...additionalData
    });
  }

  trackFormSubmission(formName: string) {
    this.trackEvent('form_submit', {
      event_category: 'form',
      form_name: formName,
      value: 1
    });
  }
}
