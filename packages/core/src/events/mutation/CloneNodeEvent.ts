import { ICustomEvent } from 'low-code-shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class CloneNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'clone:node';
}
