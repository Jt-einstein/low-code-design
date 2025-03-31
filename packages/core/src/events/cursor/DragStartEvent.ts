import { ICustomEvent } from 'low-code-shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class DragStartEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = 'drag:start';
}
