import { ICustomEvent } from 'low-code-shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class SelectNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'select:node';
}
