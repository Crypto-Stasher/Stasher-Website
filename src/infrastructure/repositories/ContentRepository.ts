import type { SiteContent } from '@models/SiteContent.type';
import { SITE_CONTENT } from '@constants';

export class ContentRepository {
  public static getContent(): SiteContent {
    // In a real app, this might fetch from an API or local JSON.
    // For now, it returns the static domain constants.
    return SITE_CONTENT;
  }
}
