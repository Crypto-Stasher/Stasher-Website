import type { SiteContent } from '../../domain/models/Content';
import { SITE_CONTENT } from '../../domain/constants';

export class ContentRepository {
  public static getContent(): SiteContent {
    // In a real app, this might fetch from an API or local JSON.
    // For now, it returns the static domain constants.
    return SITE_CONTENT;
  }
}
