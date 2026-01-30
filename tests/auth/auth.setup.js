import { chromium } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

export default async () => {
    console.log('🔧 Initializing globalSetup...');

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);

    console.log(' Navigating to login page...');
    await loginPage.acess();

    console.log(' Filling credentials...');
    await loginPage.emailInput.fill(process.env.EMAIL);
    await loginPage.passwordInput.fill(process.env.PASSWORD);

    console.log('Clicking login button...');
    await loginPage.loginButton.click();

    console.log('Waiting for Firebase authentication...');

    try {
        await Promise.race([
            page.waitForURL('**/', { timeout: 30000 }),
            loginPage.scriptsHeader.waitFor({ state: 'visible', timeout: 30000 }),
        ]);
        console.log('✅ Authentication detected!');
    } catch (error) {
        console.log('⚠️  Timeout, but continuing...');
    }

    console.log('⏳ Waiting for Firebase to save in IndexedDB (5s)...');
    await page.waitForTimeout(5000);

    console.log('📍 Current URL:', page.url());

    console.log('💾 Extracting data from IndexedDB...');
    const firebaseData = await page.evaluate(async () => {
        return new Promise((resolve) => {
            const dbName = 'firebaseLocalStorageDb';
            const request = indexedDB.open(dbName);

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['firebaseLocalStorage'], 'readonly');
                const objectStore = transaction.objectStore('firebaseLocalStorage');
                const getAllRequest = objectStore.getAll();

                getAllRequest.onsuccess = () => {
                    const data = {};
                    getAllRequest.result.forEach(item => {
                        if (item.fbase_key && item.value) {
                            data[item.fbase_key] = item.value;
                        }
                    });
                    resolve(data);
                };

                getAllRequest.onerror = () => {
                    resolve({});
                };
            };

            request.onerror = () => {
                resolve({});
            };
        });
    });

    console.log('📦 Extracted data from IndexedDB:', Object.keys(firebaseData));


    if (Object.keys(firebaseData).length > 0) {
        console.log('📝 Copying data from IndexedDB to localStorage...');
        await page.evaluate((data) => {
            Object.keys(data).forEach(key => {
                window.localStorage.setItem(key, JSON.stringify(data[key]));
            });
        }, firebaseData);
        console.log('✅ Data copied to localStorage!');
    } else {
        console.log('⚠️  WARNING: No data found in IndexedDB!');
    }


    const finalLocalStorage = await page.evaluate(() => {
        return JSON.parse(JSON.stringify(window.localStorage));
    });
    console.log('📦 Final localStorage:', Object.keys(finalLocalStorage));

    console.log('💾 Saving storageState...');
    await context.storageState({
        path: 'storage/auth.json',
    });

    console.log('✅ Setup complete!');
    console.log('⏸️  Waiting 2s for you to see the result...');
    await page.waitForTimeout(2000);
    await browser.close();
};
