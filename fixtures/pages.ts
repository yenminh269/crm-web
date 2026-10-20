import { test as base } from '@playwright/test'
import { HomePage } from "../pages/HomePage";
import { ProductPage } from '../pages/ProductPage';

type AppFixtures = { homePage : HomePage, productPage : ProductPage};

export const test = base.extend<AppFixtures>({
  homePage : async({page}, use) => {
    await use(new HomePage(page));
  },
  productPage : async({ page}, use) => {
    await use(new ProductPage(page));
  }
})

export { expect} from '@playwright/test'