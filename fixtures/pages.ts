import { test as base } from '@playwright/test'
import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from '../pages/SearchResultPage';
import { ProductCategoryPage } from '../pages/ProductCategoryPage';
import { ProductPage } from '../pages/ProductPage';

type AppFixtures = { homePage : HomePage, searchResultPage : SearchResultPage, 
  productCategoryPage : ProductCategoryPage, productPage : ProductPage
};

export const test = base.extend<AppFixtures>({
  homePage : async({page}, use) => {
    await use(new HomePage(page));
  },
  searchResultPage : async({ page}, use) => {
    await use(new SearchResultPage(page));
  },
  productCategoryPage : async( { page }, use) => {
    await use(new ProductCategoryPage(page))
  }, 
  productPage : async({ page }, use) => {
    await use(new ProductPage(page))
  }
})

export { expect} from '@playwright/test'
