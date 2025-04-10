import { ICustomEvent } from '@astraflux/low-code-shared';
import { AbstractHistoryEvent } from './AbstractHistoryEvent';

export class HistoryUndoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:undo';
}
