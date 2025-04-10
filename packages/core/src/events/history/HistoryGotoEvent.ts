import { ICustomEvent } from '@astraflux/low-code-shared';
import { AbstractHistoryEvent } from './AbstractHistoryEvent';

export class HistoryGotoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:goto';
}
