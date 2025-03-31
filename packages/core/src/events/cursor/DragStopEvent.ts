import { ICustomEvent } from 'low-code-shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class DragStopEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:stop';
}
