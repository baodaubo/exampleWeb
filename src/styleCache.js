// styleCache.js
import { createCache, extractStyle } from '@ant-design/cssinjs';

export const cssinjsCache = createCache();

export function getCssinjsStyle() {
    return extractStyle(cssinjsCache);
}
