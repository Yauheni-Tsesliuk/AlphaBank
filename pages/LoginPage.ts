import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly noticeErrors: Locator;
    
    constructor(page: Page) {
        super(page);
        this.noticeErrors = page.locator('div[class="notice errors"]');
        
    }

    async checkNoticeErrors(errorValue:string){
       const t = 'Wrong password or the account is disabled, or does not exist';
       this.noticeErrors.waitFor({ state: 'visible', timeout: 10000 }); 
       await expect(this.noticeErrors).toContainText(errorValue);
    }
}




