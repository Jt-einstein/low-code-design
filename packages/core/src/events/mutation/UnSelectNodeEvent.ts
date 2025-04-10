import { ICustomEvent } from '@astraflux/low-code-shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class UnSelectNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'unselect:node';
}
