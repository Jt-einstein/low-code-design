import { ICustomEvent } from '@astraflux/low-code-shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class DragMoveEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:move';
}
