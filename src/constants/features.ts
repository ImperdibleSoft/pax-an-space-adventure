import { isPre, isProduction } from '../common/utils/platforms';

export const restoreLastRoute = false;
export const cacheOnDemand = isProduction() || isPre();
