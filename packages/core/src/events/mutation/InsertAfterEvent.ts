import { ICustomEvent } from '@astraflux/low-code-shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class InsertAfterEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'insert:after';
}
