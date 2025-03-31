import { ICustomEvent } from 'low-code-shared';
import { AbstractHistoryEvent } from './AbstractHistoryEvent';

export class HistoryRedoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:redo';
}
